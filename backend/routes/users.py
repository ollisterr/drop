from fastapi import APIRouter
from piccolo.apps.user.tables import BaseUser

router = APIRouter()


@router.get("/users/", tags=["users"])
async def read_users():
    users = BaseUser.select(*BaseUser.all_columns(exclude=[BaseUser.password])).run_sync()
    return users
