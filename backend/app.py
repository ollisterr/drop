from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi
from piccolo.engine import engine_finder
from piccolo_api.crud.endpoints import PiccoloCRUD
from piccolo_api.fastapi.endpoints import FastAPIWrapper

from orm.tables import Apartment, ApartmentGroups, Group, Measurement
from routes import admin, auth, index, static

app = FastAPI(site_name="Drop API")

app.include_router(index.router)
app.include_router(admin.router)
app.include_router(auth.router)
app.include_router(static.router)


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
