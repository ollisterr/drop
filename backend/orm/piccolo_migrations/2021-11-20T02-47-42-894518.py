from piccolo.apps.migrations.auto import MigrationManager
from piccolo.columns.base import OnDelete
from piccolo.columns.base import OnUpdate
from piccolo.columns.column_types import Decimal
from piccolo.columns.column_types import ForeignKey
from piccolo.columns.column_types import Integer
from piccolo.columns.column_types import Text
from piccolo.columns.column_types import Timestamp
from piccolo.columns.column_types import Varchar
from piccolo.columns.defaults.timestamp import TimestampNow
from piccolo.columns.indexes import IndexMethod
import decimal


ID = "2021-11-20T02:47:42:894518"
VERSION = "0.60.0"
DESCRIPTION = ""


async def forwards():
    manager = MigrationManager(
        migration_id=ID, app_name="drop_api", description=DESCRIPTION
    )

    manager.add_table("Appliance", tablename="appliance")

    manager.add_table("Apartment", tablename="apartment")

    manager.add_table("Resident", tablename="resident")

    manager.add_table("Group", tablename="drop_group")

    manager.add_table("Measurement", tablename="measurement")

    manager.add_column(
        table_class_name="Apartment",
        tablename="apartment",
        column_name="address",
        db_column_name="address",
        column_class_name="Varchar",
        column_class=Varchar,
        params={
            "length": 255,
            "default": "",
            "null": False,
            "primary_key": False,
            "unique": False,
            "index": False,
            "index_method": IndexMethod.btree,
            "choices": None,
            "db_column_name": None,
            "secret": False,
        },
    )

    manager.add_column(
        table_class_name="Apartment",
        tablename="apartment",
        column_name="owner",
        db_column_name="owner",
        column_class_name="Text",
        column_class=Text,
        params={
            "default": "",
            "null": False,
            "primary_key": False,
            "unique": False,
            "index": False,
            "index_method": IndexMethod.btree,
            "choices": None,
            "db_column_name": None,
            "secret": False,
        },
    )

    manager.add_column(
        table_class_name="Apartment",
        tablename="apartment",
        column_name="people",
        db_column_name="people",
        column_class_name="Integer",
        column_class=Integer,
        params={
            "default": 0,
            "null": False,
            "primary_key": False,
            "unique": False,
            "index": False,
            "index_method": IndexMethod.btree,
            "choices": None,
            "db_column_name": None,
            "secret": False,
        },
    )

    manager.add_column(
        table_class_name="Apartment",
        tablename="apartment",
        column_name="created_on",
        db_column_name="created_on",
        column_class_name="Timestamp",
        column_class=Timestamp,
        params={
            "default": TimestampNow(),
            "null": False,
            "primary_key": False,
            "unique": False,
            "index": False,
            "index_method": IndexMethod.btree,
            "choices": None,
            "db_column_name": None,
            "secret": False,
        },
    )

    manager.add_column(
        table_class_name="Apartment",
        tablename="apartment",
        column_name="appliance",
        db_column_name="appliance",
        column_class_name="ForeignKey",
        column_class=ForeignKey,
        params={
            "references": "Appliance",
            "on_delete": OnDelete.cascade,
            "on_update": OnUpdate.cascade,
            "null": True,
            "primary_key": False,
            "unique": False,
            "index": False,
            "index_method": IndexMethod.btree,
            "choices": None,
            "db_column_name": None,
            "secret": False,
        },
    )

    manager.add_column(
        table_class_name="Resident",
        tablename="resident",
        column_name="apartment",
        db_column_name="apartment",
        column_class_name="ForeignKey",
        column_class=ForeignKey,
        params={
            "references": "Apartment",
            "on_delete": OnDelete.cascade,
            "on_update": OnUpdate.cascade,
            "null": True,
            "primary_key": False,
            "unique": False,
            "index": False,
            "index_method": IndexMethod.btree,
            "choices": None,
            "db_column_name": None,
            "secret": False,
        },
    )

    manager.add_column(
        table_class_name="Group",
        tablename="drop_group",
        column_name="name",
        db_column_name="name",
        column_class_name="Varchar",
        column_class=Varchar,
        params={
            "length": 255,
            "default": "",
            "null": False,
            "primary_key": False,
            "unique": False,
            "index": False,
            "index_method": IndexMethod.btree,
            "choices": None,
            "db_column_name": None,
            "secret": False,
        },
    )

    manager.add_column(
        table_class_name="Group",
        tablename="drop_group",
        column_name="resident",
        db_column_name="resident",
        column_class_name="ForeignKey",
        column_class=ForeignKey,
        params={
            "references": "Resident",
            "on_delete": OnDelete.cascade,
            "on_update": OnUpdate.cascade,
            "null": True,
            "primary_key": False,
            "unique": False,
            "index": False,
            "index_method": IndexMethod.btree,
            "choices": None,
            "db_column_name": None,
            "secret": False,
        },
    )

    manager.add_column(
        table_class_name="Group",
        tablename="drop_group",
        column_name="apartment",
        db_column_name="apartment",
        column_class_name="ForeignKey",
        column_class=ForeignKey,
        params={
            "references": "Apartment",
            "on_delete": OnDelete.cascade,
            "on_update": OnUpdate.cascade,
            "null": True,
            "primary_key": False,
            "unique": False,
            "index": False,
            "index_method": IndexMethod.btree,
            "choices": None,
            "db_column_name": None,
            "secret": False,
        },
    )

    manager.add_column(
        table_class_name="Measurement",
        tablename="measurement",
        column_name="timestamp",
        db_column_name="timestamp",
        column_class_name="Timestamp",
        column_class=Timestamp,
        params={
            "default": TimestampNow(),
            "null": False,
            "primary_key": False,
            "unique": False,
            "index": False,
            "index_method": IndexMethod.btree,
            "choices": None,
            "db_column_name": None,
            "secret": False,
        },
    )

    manager.add_column(
        table_class_name="Measurement",
        tablename="measurement",
        column_name="water_consumption",
        db_column_name="water_consumption",
        column_class_name="Decimal",
        column_class=Decimal,
        params={
            "default": decimal.Decimal("0"),
            "digits": None,
            "null": False,
            "primary_key": False,
            "unique": False,
            "index": False,
            "index_method": IndexMethod.btree,
            "choices": None,
            "db_column_name": None,
            "secret": False,
        },
    )

    manager.add_column(
        table_class_name="Measurement",
        tablename="measurement",
        column_name="power_consumption",
        db_column_name="power_consumption",
        column_class_name="Decimal",
        column_class=Decimal,
        params={
            "default": decimal.Decimal("0"),
            "digits": None,
            "null": False,
            "primary_key": False,
            "unique": False,
            "index": False,
            "index_method": IndexMethod.btree,
            "choices": None,
            "db_column_name": None,
            "secret": False,
        },
    )

    manager.add_column(
        table_class_name="Appliance",
        tablename="appliance",
        column_name="name",
        db_column_name="name",
        column_class_name="Varchar",
        column_class=Varchar,
        params={
            "length": 255,
            "default": "",
            "null": False,
            "primary_key": False,
            "unique": False,
            "index": False,
            "index_method": IndexMethod.btree,
            "choices": None,
            "db_column_name": None,
            "secret": False,
        },
    )

    manager.add_column(
        table_class_name="Appliance",
        tablename="appliance",
        column_name="measurement",
        db_column_name="measurement",
        column_class_name="ForeignKey",
        column_class=ForeignKey,
        params={
            "references": "Measurement",
            "on_delete": OnDelete.cascade,
            "on_update": OnUpdate.cascade,
            "null": True,
            "primary_key": False,
            "unique": False,
            "index": False,
            "index_method": IndexMethod.btree,
            "choices": None,
            "db_column_name": None,
            "secret": False,
        },
    )

    return manager
