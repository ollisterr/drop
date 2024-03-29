import pandas as pd
from dateutil import parser
from fastapi import APIRouter
from sklearn import preprocessing

from orm.tables import Measurement

router = APIRouter()
from datetime import date
from typing import List

from dateutil import parser
from dateutil.parser._parser import ParserError
from fastapi import APIRouter, HTTPException
from fastapi.params import Path
from pydantic import BaseModel

from orm.tables import Apartment, Measurement

router = APIRouter()


@router.get("/kpis/weekly-change/{apartment_id}", response_model=float, tags=["kpi"])
async def get_user_weekly_trend(
    apartment_id: int = Path(..., title="The ID of the apartment to get data for", ge=0)
):
    try:
        two_week = Measurement.raw(
            """
            select
                date(timestamp),
                sum(water_consumption)
            from measurement
            where
                apartment = {}
            group by date(timestamp) limit(14)
            """,
            apartment_id,
        ).run_sync()
        first_sum = 0
        second_sum = 0
        for i in range(0, 7):
            first_sum += two_week[i]["sum"]
        for i in range(7, 14):
            second_sum += two_week[i]["sum"]
        return round((1 - first_sum / second_sum) * 100, 1)
    except Exception as e:
        print(e)


@router.get("/kpis/hygiene-scores/{group_id}/{date}", tags=["kpi"])
async def hygiene_scores(group_id: int, date: str):
    measurements = Measurement.raw(
        """
        select
            flow_time,
            apartment
        from measurement
        where
            appliance = 'Optima_faucet' and date(timestamp) = {}
            and apartment in (
                select apartment from apartment_groups where group_id = {}
            )
        """,
        parser.parse(date),
        group_id,
    ).run_sync()
    df = pd.DataFrame(measurements)
    df["flow_dist"] = abs(df["flow_time"] - 20)
    flow_df = df[["apartment", "flow_dist"]]
    grouped_df = flow_df.groupby(["apartment"]).mean()
    x_scaled = preprocessing.minmax_scale(X=grouped_df["flow_dist"]) * 100
    grouped_df["hygiene_score"] = x_scaled.round(decimals=0)
    grouped_df.drop(columns=["flow_dist"], inplace=True)
    apm_dict = grouped_df.to_dict(orient="index")
    return apm_dict


class DailyConsumption_Response(BaseModel):
    consumption: float
    apartment_id: int
    date: date


@router.get(
    "/kpis/consumption-daily/{apartment_id}/{date}",
    response_model=DailyConsumption_Response,
    tags=["consumption"],
)
async def get_consumption(
    apartment_id: int = Path(..., title="The ID of the apartment to get data for", ge=0),
    date: str = Path(..., title="The date to get data for"),
):
    try:
        data = Measurement.raw(
            """
            select
                sum(water_consumption) as consumption,
                a.id as apartment_id,
                date(m.timestamp)
            from measurement m
            join apartment a
                on m.apartment = a.id
            where
                a.id = {} and
                date(m.timestamp) = {}
            group by a.id, date(m.timestamp)
            limit 1
        """,
            apartment_id,
            parser.parse(date),
        ).run_sync()
        return data[0] if len(data) != 0 else {}
    except ParserError:
        return HTTPException(422, detail="Invalid string format, please use YYYY-MM-DD")
    except Exception as e:
        print(e)
        return HTTPException(500)


class ConsumptionLastTwoWeeks_Response(BaseModel):
    week_start: date
    weekday: str
    apartment_id: int
    consumption: float


@router.get(
    "/kpis/consumption-weekly/{apartment_id}/{num_weeks}",
    response_model=List[ConsumptionLastTwoWeeks_Response],
    tags=["consumption"],
)
async def get_consumption_last_two_week(
    apartment_id: int = Path(..., title="The ID of the apartment to get data for", ge=0),
    num_weeks: int = Path(..., title="The number of weeks to get data for"),
):
    try:
        data = Measurement.raw(
            """
            select
                date(date_trunc('week', m.timestamp)) as week_start,
                trim(to_char(date(m.timestamp), 'Day')) as weekday,
                date(m.timestamp),
                a.id as apartment_id,
                sum(water_consumption) as consumption
            from measurement m
            join apartment a
                on m.apartment = a.id
            where a.id = {}
            group by
                a.id, date(m.timestamp),
                week_start
            order by
                a.id, date(m.timestamp) desc,
                week_start desc
            limit {};
        """,
            int(apartment_id),
            int(num_weeks) * 7,
        ).run_sync()
        return data
    except ParserError:
        return HTTPException(422, detail="Invalid string format, please use YYYY-MM-DD")
    except Exception as e:
        print(e)
        return HTTPException(500)


@router.get("/kpis/sustainability-scores/{group_id}/{date}", tags=["kpi"])
async def sustainability_scores(group_id: int, date: str):
    measurements = Measurement.raw(
        """
        select sum(x.sus_score) as sustainability_score, x.apartment
        from
            (select
                water_consumption * temp as sus_score,
                apartment
            from measurement
            where
                date(timestamp) = {} and
                apartment in (
                    select apartment
                    from apartment_groups where group_id = {}
                )
            ) as x
        group by x.apartment""",
        parser.parse(date),
        group_id,
    ).run_sync()
    df = pd.DataFrame(measurements)
    apartment_data = Apartment.raw("SELECT id as apartment, people FROM apartment").run_sync()
    apartment_df = pd.DataFrame(apartment_data)
    df = df.merge(apartment_df, on="apartment")
    df["sustainability_score"] = df["sustainability_score"] / df["people"]
    x_scaled = preprocessing.minmax_scale(X=df["sustainability_score"]) * 100
    df["sustainability_score"] = x_scaled.round(decimals=0)
    df.set_index("apartment", inplace=True)
    df.drop(columns=["people"], inplace=True)
    sus_score_dict = df.to_dict("index")
    return sus_score_dict
