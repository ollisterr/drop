from piccolo.table import Table
from piccolo.columns.column_types import (
    ForeignKey,
    Varchar,
    Timestamp,
    Text,
    Integer,
    Decimal,
)


class Group(Table, tablename="drop_group"):
    """
    Group table
    """

    name = Varchar()
    resident = ForeignKey(references="Resident")
    apartment = ForeignKey(references="Apartment")


class Apartment(Table):
    """
    Apartment table
    """

    address = Varchar()
    owner = Text()
    people = Integer()
    created_on = Timestamp()
    appliance = ForeignKey(references="Appliance")


class Appliance(Table):
    """
    Group table
    """

    name = Varchar()
    measurement = ForeignKey(references="Measurement")


class Measurement(Table):
    """
    Group table
    """

    timestamp = Timestamp()
    water_consumption = Decimal()
    power_consumption = Decimal()


class Resident(Table):

    apartment = ForeignKey(references="Apartment")
