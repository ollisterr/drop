import datetime
import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from fastapi.staticfiles import StaticFiles
from piccolo.engine import engine_finder
from piccolo_admin.endpoints import create_admin
from piccolo_api.crud.endpoints import PiccoloCRUD
from piccolo_api.fastapi.endpoints import FastAPIWrapper
from piccolo_api.openapi.endpoints import swagger_ui
from piccolo_api.session_auth.endpoints import session_login, session_logout
from piccolo_api.session_auth.middleware import SessionsAuthBackend
from starlette.middleware.authentication import AuthenticationMiddleware

from orm.piccolo_app import APP_CONFIG
from orm.tables import Apartment, ApartmentGroups, Group, Measurement
from routes import index, kpis, register, users

load_dotenv()

ENV = os.getenv("ENV", "development")

app = FastAPI(
    site_name="Drop API",
    docs_url=None,
    redoc_url=None,
)

private_app = FastAPI()

admin = create_admin(tables=APP_CONFIG.table_classes, site_name="Drop Admin")
app.mount("/api", private_app)
app.mount("/admin/", admin)
app.mount("/login/", session_login(production=True if ENV == "production" else False))
app.mount("/static", StaticFiles(directory="static"), name="static")
app.include_router(index.router)
app.include_router(register.router)

private_app.include_router(users.router)
private_app.include_router(kpis.router)
private_app.mount("/logout/", session_logout(redirect_to="/"))

private_app.add_middleware(
    AuthenticationMiddleware,
    backend=SessionsAuthBackend(
        admin_only=False, active_only=False, increase_expiry=datetime.timedelta(minutes=30)
    ),
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def custom_openapi():
    if private_app.openapi_schema:
        return private_app.openapi_schema
    openapi_schema = get_openapi(
        title="Drop API",
        version="0.1.0",
        description="The OpenAPI schema for drop.energy",
        routes=private_app.routes,
    )
    openapi_schema["info"]["x-logo"] = {"url": "https://api.drop.energy/static/drop-logo.png"}
    private_app.openapi_schema = openapi_schema
    return private_app.openapi_schema


app.openapi = custom_openapi


FastAPIWrapper(
    root_url="/api/apartment/",
    fastapi_app=private_app,
    piccolo_crud=PiccoloCRUD(
        table=Apartment,
        read_only=False,
    ),
)

FastAPIWrapper(
    root_url="/api/apartment-groups/",
    fastapi_app=private_app,
    piccolo_crud=PiccoloCRUD(
        table=ApartmentGroups,
        read_only=False,
    ),
)

FastAPIWrapper(
    root_url="/api/group/",
    fastapi_app=private_app,
    piccolo_crud=PiccoloCRUD(
        table=Group,
        read_only=False,
    ),
)

FastAPIWrapper(
    root_url="/api/measurement/",
    fastapi_app=private_app,
    piccolo_crud=PiccoloCRUD(
        table=Measurement,
        read_only=False,
    ),
)


@app.on_event("startup")
async def open_database_connection_pool():
    try:
        engine = engine_finder()
        await engine.start_connection_pool()
    except Exception:
        print("Unable to connect to the database")


@app.on_event("shutdown")
async def close_database_connection_pool():
    try:
        engine = engine_finder()
        await engine.close_connection_pool()
    except Exception:
        print("Unable to connect to the database")

