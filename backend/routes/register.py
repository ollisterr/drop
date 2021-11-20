import os
from typing import Any

from asyncpg.exceptions import UniqueViolationError
from dotenv import load_dotenv
from fastapi import APIRouter
from piccolo.apps.user.tables import BaseUser
from piccolo.utils.pydantic import create_pydantic_model
from piccolo_api.session_auth.tables import SessionsBase
from pydantic import BaseModel
from starlette.responses import Response

from orm.tables import Apartment, User

load_dotenv()

ENV = os.getenv("ENV", "development")

router = APIRouter()
BaseUserPydantic: Any = create_pydantic_model(table=BaseUser, model_name="BaseUserPydantic")
ApartmentPydantic: Any = create_pydantic_model(table=Apartment, model_name="ApartmentPydantic")


class Register_User(BaseModel):
    user: BaseUserPydantic
    apartment: ApartmentPydantic


@router.post("/register")
async def create_user(data: Register_User):
    try:
        # Start a transaction
        async with BaseUser._meta.db.transaction():
            print(data.apartment)
            # Don't allow creating admins or superusers via the register endpoint
            # Make the users active, no email validation for now
            piccolo_user_data = {
                **data.user.__dict__,
                "admin": False,
                "superuser": False,
                "active": True,
            }

            # Create the piccolo user, used for authentication
            piccolo_user = await BaseUser.insert(BaseUser(**piccolo_user_data)).run()

            # Create an apartment for the user
            apartment = await Apartment.insert(
                Apartment(address=data.apartment.address, people=data.apartment.people)
            ).run()

            # Create a Drop user - used to connect PIccolo users to our data model
            drop_user_data = {"apartment": apartment[0]["id"], "user": piccolo_user[0]["id"]}
            await User.insert(User(**drop_user_data)).run()

            # Create a session
            session = await SessionsBase.create_session(user_id=piccolo_user[0]["id"])
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
        return Response(status_code=403, content="User with this username or email already exists")
    except Exception as e:
        print(e)
        return Response(status_code=500)
