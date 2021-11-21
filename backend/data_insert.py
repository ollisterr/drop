import json
import random
import string
from datetime import datetime

from piccolo.apps.user.tables import BaseUser

from orm.tables import Apartment, ApartmentGroups, Group, Measurement, User

with open("data/apartments.json") as af, open("data/groups.json") as gf:
    apt_data = json.load(af)
    grp_data = json.load(gf)

    for apt in apt_data["apartments"]:
        print(apt)
        Apartment.insert(Apartment(people=int(apt["people"]), address=apt["name"])).run_sync()

    for grp in grp_data["groups"]:
        g = Group(name=grp["name"])

        print(g)
        Group.insert(g).run_sync()

        apts = [
            Apartment.select().where(Apartment.address == apt).first().run_sync()
            for apt in grp["apartments"]
        ]
        print(apts)
        ApartmentGroups.insert(
            *[ApartmentGroups(apartment=apt["id"], group_id=g) for apt in apts]
        ).run_sync()


with open("data/measurements.json") as f, open("data/apartments.json") as af:
    data = json.load(f)
    apt_data = json.load(af)

    ids = {}
    for i, apt in enumerate(apt_data["apartments"]):
        ids[apt["name"]] = i + 1

    msms = [
        Measurement(
            timestamp=datetime.fromisoformat(msm["TimeStamp"]),
            appliance=msm["Appliance"],
            apartment=ids[msm["Apartment"]],
            power_consumption=float(msm["Power_Consumption"]),
            water_consumption=float(msm["Consumption"]),
            temp=float(msm["Temp"]),
            flow_time=float(msm["FlowTime"]),
        )
        for msm in data["measurements"]
    ]

    batch_size = 500
    print(len(msms))

    for i in range(0, len(msms), batch_size):
        batch = msms[i : i + batch_size]
        print(i)
        Measurement.insert(*batch).run_sync()


random.seed(1234)
fake_users = ["Taku", "Jones", "Timppa", "Olperi"]

users = [
    BaseUser(
        username=user,
        password="1234",
        email="".join(random.choices(string.ascii_uppercase + string.digits, k=5)),
    )
    for user in fake_users
]

for user in users:
    BaseUser.insert(user).run_sync()
    apts = Apartment.select().run_sync()
    apt = random.choice(apts)
    User.insert(User(user=user, apartment=apt["id"])).run_sync()
