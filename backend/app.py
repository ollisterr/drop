from typing import List
from piccolo_admin.endpoints import create_admin
from piccolo_api.crud.endpoints import PiccoloCRUD
from piccolo_api.fastapi.endpoints import FastAPIWrapper
from piccolo.engine import engine_finder
from starlette.routing import BaseRoute, Mount
from fastapi import FastAPI

from orm.piccolo_app import APP_CONFIG
from orm.tables import Test

admin = create_admin(tables=APP_CONFIG.table_classes, site_name="Drop Admin")
routes: List[BaseRoute] = [Mount("/admin/", admin)]
app = FastAPI(
    routes=routes,
    site_name="Drop API",
)

FastAPIWrapper(
    root_url="/test/",
    fastapi_app=app,
    piccolo_crud=PiccoloCRUD(
        table=Test,
        read_only=True,
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
