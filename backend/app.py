import os
from typing import Any, List

from asyncpg.exceptions import UniqueViolationError
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from piccolo.apps.user.tables import BaseUser
from piccolo.engine import engine_finder
from piccolo.utils.pydantic import create_pydantic_model
from piccolo_admin.endpoints import create_admin
from piccolo_api.crud.endpoints import PiccoloCRUD
from piccolo_api.fastapi.endpoints import FastAPIWrapper
from piccolo_api.session_auth.endpoints import session_login, session_logout
from piccolo_api.session_auth.tables import SessionsBase
from starlette.responses import Response
from starlette.routing import BaseRoute, Mount

from orm.piccolo_app import APP_CONFIG
from orm.tables import Apartment, Appliance, Group, Measurement, Resident

load_dotenv()

ENV = os.getenv("ENV", "development")
DOMAIN = os.getenv("DOMAIN", "localhost")

admin = create_admin(tables=APP_CONFIG.table_classes, site_name="Drop Admin")
routes: List[BaseRoute] = [Mount("/admin/", admin)]

app = FastAPI(
    routes=routes,
    site_name="Drop API",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*" if ENV == "development" else DOMAIN
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/login/", session_login())
app.mount("/logout/", session_logout())

BaseUserPydantic: Any = create_pydantic_model(table=BaseUser, model_name="BaseUserPydantic")


@app.post("/register")
async def create_user(user: BaseUserPydantic):
    try:
        # Can't create admin or superuser via this endpoint. No email validation
        # to make user active for now.
        user = BaseUser(**user.__dict__, admin=False, superuser=False, active=True)
        await user.save().run()

        session = await SessionsBase.create_session(user_id=user.id)
        response = Response(status_code=200)

        response.set_cookie(
            key="id",
            value=session.token,
            httponly=True,
            secure=True if ENV == "production" else False,
            samesite="lax",
        )
        return response

    except UniqueViolationError:
        return Response(status_code=403, content="User with this email or username already exists")
    except Exception:
        return Response(status_code=500)


FastAPIWrapper(
    root_url="/apartment/",
    fastapi_app=app,
    piccolo_crud=PiccoloCRUD(
        table=Apartment,
        read_only=False,
    ),
)

FastAPIWrapper(
    root_url="/resident/",
    fastapi_app=app,
    piccolo_crud=PiccoloCRUD(
        table=Resident,
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
    root_url="/appliance/",
    fastapi_app=app,
    piccolo_crud=PiccoloCRUD(
        table=Appliance,
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
