from piccolo.columns.column_types import (
    Decimal,
    ForeignKey,
    Integer,
    Text,
    Timestamp,
    Varchar,
)
from piccolo.table import Table


class Group(Table, tablename="drop_group"):
    """
    Group table
    """

    name = Varchar()
    resident = ForeignKey("Resident")
    apartment = ForeignKey("Apartment")


class Apartment(Table):
    """
    Apartment table
    """

    address = Varchar()
    owner = Text()
    people = Integer()
    created_on = Timestamp()
    appliance = ForeignKey("Appliance")


class Appliance(Table):
    """
    Group table
    """

    name = Varchar()
    measurement = ForeignKey("Measurement")


class Measurement(Table):
    """
    Group table
    """

    timestamp = Timestamp()
    water_consumption = Decimal()
    power_consumption = Decimal()


class Resident(Table):
    """
    Resident table
    """

    apartment = ForeignKey("Apartment")
