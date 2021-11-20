from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from piccolo.engine import engine_finder
from piccolo_admin.endpoints import create_admin
from piccolo_api.crud.endpoints import PiccoloCRUD
from piccolo_api.fastapi.endpoints import FastAPIWrapper
from piccolo_api.session_auth.endpoints import session_login, session_logout

from orm.piccolo_app import APP_CONFIG
from orm.tables import Apartment, ApartmentGroups, Group, Measurement
from routes import index, kpis, register, users

app = FastAPI(site_name="Drop API")


app.mount("/static", StaticFiles(directory="static"), name="static")
app.include_router(index.router)
app.include_router(register.router)
app.include_router(users.router)
app.include_router(kpis.router)

admin = create_admin(tables=APP_CONFIG.table_classes, site_name="Drop Admin")

app.mount("/admin/", admin)
app.mount("/login/", session_login())
app.mount("/logout/", session_logout())

app.mount("/static", StaticFiles(directory="static"), name="static")


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Drop API",
        version="0.1.0",
        description="The OpenAPI schema for drop.energy",
        routes=app.routes,
    )
    openapi_schema["info"]["x-logo"] = {"url": "https://api.drop.energy/static/drop-logo.png"}
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


FastAPIWrapper(
    root_url="/apartment/",
    fastapi_app=app,
    piccolo_crud=PiccoloCRUD(
        table=Apartment,
        read_only=False,
    ),
)

FastAPIWrapper(
    root_url="/apartment-groups/",
    fastapi_app=app,
    piccolo_crud=PiccoloCRUD(
        table=ApartmentGroups,
        read_only=False,
    ),
)

FastAPIWrapper(
    root_url="/group/",
    fastapi_app=app,
    piccolo_crud=PiccoloCRUD(
        table=Group,
        read_only=False,
    ),
)

FastAPIWrapper(
    root_url="/measurement/",
    fastapi_app=app,
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
