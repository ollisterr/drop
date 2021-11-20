from piccolo.columns.column_types import (
    Decimal,
    ForeignKey,
    Integer,
    Timestamp,
    Varchar,
)
from piccolo.table import Table


class Group(Table, tablename="drop_group"):
    """
    Group table
    """

    name = Varchar()


class Apartment(Table):
    """
    Apartment table
    """

    address = Varchar()
    people = Integer()


class ApartmentGroups(Table):
    """
    Junction table for many-to-many with Apartments and Groups
    """

    apartment = ForeignKey(Apartment)
    group_id = ForeignKey(Group)


class Measurement(Table):
    """
    Group table
    """

    timestamp = Timestamp()
    appliance = Varchar()
    apartment = ForeignKey("Apartment")

    power_consumption = Decimal()
    water_consumption = Decimal()
    temp = Decimal()
    flow_time = Decimal()
