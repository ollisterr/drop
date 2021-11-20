from typing import Any

from fastapi import APIRouter
from piccolo.apps.user.tables import BaseUser
from piccolo.utils.pydantic import create_pydantic_model
from piccolo_api.session_auth.endpoints import session_login, session_logout
from piccolo_api.session_auth.tables import SessionsBase
from starlette import responses

router = APIRouter()

router.mount("/login/", session_login())
router.mount("/logout/", session_logout())

BaseUserPydantic: Any = create_pydantic_model(table=BaseUser, model_name="BaseUserPydantic")


@router.post("/register")
async def create_user(user: BaseUserPydantic):
    try:
        user = BaseUser(**user.__dict__)
        await user.save().run()

        session = await SessionsBase.create_session(user_id=user.id)

        response = responses(status_code=200)

        response.set_cookie(
            key="id",
            value=session.token,
            httponly=True,
            secure=True,  # if in production, otherwise False
            samesite="lax",
        )
        return response

    except Exception as e:
        print(type(e))
        return responses.Response(status_code=500)
