from typing import List

from fastapi import APIRouter
from fastapi.param_functions import Path
from fastapi.requests import Request

from orm.tables import ApartmentGroups, User

from .models import BaseUserPydantic

router = APIRouter()


@router.get("/users/me", tags=["users"])
async def get_current_user(request: Request):
    piccolo_user = request.user.user
    groups = []
    me = await User.raw(
        """
            select
                pu.id,
                pu.username,
                pu.first_name,
                pu.last_name,
                pu.last_login,
                a.id as apartment_id,
                a.address,
                a.people
            from
                piccolo_user pu
            join
                drop_user u
            on
                pu.id = u.user
            join
                apartment a
            on
                a.id = u.apartment
            where
                pu.id = {}
            """,
        piccolo_user.id,
    ).run()
    if me:
        me = me[0]
        groups = await ApartmentGroups.raw(
            """
            select
                group_id,
                dg.name
            from
                apartment_groups ag
            join
                drop_group dg
            on
                dg.id = ag.group_id
            where
                ag.apartment = {}
            """,
            me["apartment_id"],
        ).run()
    return {"user": me, "groups": groups}


@router.get("/users/", tags=["users"])
async def get_all_users():
    users = await User.raw(
        """
            select
                *
            from
                piccolo_users
            """
    ).run()
    return users


@router.get("/users/{username}", response_model=List[BaseUserPydantic], tags=["users"])
async def get_users(username: str = Path("", title="The username to search for")):
    users = (
        await User.select(
            User.user.username,
            User.user.first_name,
            User.user.last_name,
            User.user.last_login,
            User.apartment.id,
        )
        .where(User.user.username.like(f"%{username}%"))
        .run()
    )
    return users
