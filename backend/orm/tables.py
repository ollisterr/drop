from piccolo.table import Table
from piccolo.columns.column_types import (
    ForeignKey,
    Varchar,
    Boolean,
    Timestamp,
    Text,
    Integer,
    Decimal,
)


class Group(Table):
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
    group = ForeignKey(references="Group")
    appliance = ForeignKey(references="Appliance")


class Appliance(Table):
    """
    Group table
    """

    name = Varchar()
    measurements = ForeignKey(references="Measurements")


class Measurements(Table):
    """
    Group table
    """

    timestamp = Timestamp()
    water_consumption = Decimal()
    power_consumption = Decimal()


class Resident(Table):

    apartment = ForeignKey(references="Apartment")
