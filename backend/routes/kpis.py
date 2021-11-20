from fastapi import APIRouter

from orm.tables import Apartment, User

router = APIRouter()


@router.get("/daily-consumption/{username}", tags=["kpi"])
async def get_user_daily_consumption(username):
    user = User.select().where(User.user.username == username).run_sync()
    print(user)
    apartment = Apartment.select()
    print(user)
    return user
