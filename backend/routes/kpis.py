from fastapi import APIRouter
import pandas as pd
from sklearn import preprocessing
from dateutil import parser
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


@router.get("/hygiene-scores/{group}/{date}", tags=["kpi"])
async def hygiene_scores(group: str, date: str):
    measurements = Measurement.raw(
        "SELECT flow_time, apartment FROM Measurement WHERE appliance = 'Optima_faucet' AND DATE(timestamp) = {}",
        parser.parse(date),
    ).run_sync()
    df = pd.DataFrame(measurements)
    df["flow_dist"] = abs(df["flow_time"] - 20)
    x_scaled = preprocessing.minmax_scale(X=df["flow_dist"]) * 100
    df["hygiene_score"] = x_scaled.round(decimals=0)
    df = df[["apartment", "hygiene_score"]]
    apartments = df["apartment"].unique()
    apm_dict = {}
    for apartment in apartments:
        ap_df = df[df["apartment"] == apartment]
        mean_val = ap_df.aggregate("mean")
        mean_val = mean_val["hygiene_score"]
        apm_dict[int(apartment)] = round((int(mean_val)), 0)
    return dict(apm_dict)
