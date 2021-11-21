from typing import List, Optional

from fastapi import APIRouter
from fastapi.param_functions import Depends, Path
from piccolo.apps.user.tables import BaseUser

from orm.tables import ApartmentGroups

from .models import BaseUserPydantic, GroupPydantic
from .utils import SearchArgs

router = APIRouter()


@router.get("/users/me", response_model=List[BaseUserPydantic], tags=["users"])
async def get_current_user(username: Optional[str] = ""):
    users = (
        await BaseUser.select(
            BaseUser.username, BaseUser.first_name, BaseUser.last_name, BaseUser.last_login
        )
        .where(BaseUser.username.like(f"%{username}%"))
        .run()
    )
    return users


@router.get("/users/{username}", response_model=List[BaseUserPydantic], tags=["users"])
async def get_users(username: str = Path("", title="The username to search for")):
    users = (
        await BaseUser.select(
            BaseUser.username, BaseUser.first_name, BaseUser.last_name, BaseUser.last_login
        )
        .where(BaseUser.username.like(f"%{username}%"))
        .run()
    )
    print(users)
    return users


@router.get("/user/groups/{apartment_id}", response_model=List[GroupPydantic], tags=["groups"])
async def read_users(
    args: SearchArgs = Depends(),
    apartment_id: int = Path(..., title="The ID of the apartment to get data for", ge=0),
):
    groups = (
        await ApartmentGroups.select(ApartmentGroups.all_columns())
        .where(ApartmentGroups.apartment == apartment_id)
        .run()
    )
    return groups
