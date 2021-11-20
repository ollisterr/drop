from fastapi import APIRouter

from orm.tables import Apartment, User, Measurement

router = APIRouter()


@router.get("/daily-consumption/{username}", tags=["kpi"])
async def get_user_daily_consumption(username):
    user = User.select().where(User.user.username == username).run_sync()
    print(user)
    apartment = Apartment.select()
    print(user)
    return user


@router.get("/weekly-change/{apartment}", tags=["kpi"])
async def get_user_weekly_trend(apartment: int):
    two_week = Measurement.raw(
        "SELECT DATE(timestamp), SUM(water_consumption) FROM Measurement WHERE Apartment = {} GROUP BY DATE(timestamp) LIMIT(14)",
        apartment,
    ).run_sync()
    first_sum = 0
    second_sum = 0
    for i in range(0, 7):
        first_sum += two_week[i]["sum"]
    for i in range(7, 14):
        second_sum += two_week[i]["sum"]
    return round(1 - first_sum / second_sum, 2) * 100
