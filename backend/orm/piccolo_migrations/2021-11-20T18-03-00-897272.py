from piccolo.apps.migrations.auto import MigrationManager
from piccolo.columns.base import OnDelete, OnUpdate
from piccolo.columns.column_types import (
    Boolean,
    ForeignKey,
    Secret,
    Serial,
    Timestamp,
    Varchar,
)
from piccolo.columns.indexes import IndexMethod
from piccolo.table import Table


class Apartment(Table, tablename="apartment"):
    id = Serial(
        null=False,
        primary_key=True,
        unique=False,
        index=False,
        index_method=IndexMethod.btree,
        choices=None,
        db_column_name="id",
        secret=False,
    )


class BaseUser(Table, tablename="piccolo_user"):
    id = Serial(
        null=False,
        primary_key=True,
        unique=False,
        index=False,
        index_method=IndexMethod.btree,
        choices=None,
        db_column_name="id",
        secret=False,
    )


ID = "2021-11-20T18:03:00:897272"
VERSION = "0.60.0"
DESCRIPTION = ""


async def forwards():
    manager = MigrationManager(migration_id=ID, app_name="drop_api", description=DESCRIPTION)

    manager.add_table("User", tablename="drop_user")

    manager.add_column(
        table_class_name="User",
        tablename="drop_user",
        column_name="user",
        db_column_name="user",
        column_class_name="ForeignKey",
        column_class=ForeignKey,
        params={
            "references": BaseUser,
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
        table_class_name="User",
        tablename="drop_user",
        column_name="apartment",
        db_column_name="apartment",
        column_class_name="ForeignKey",
        column_class=ForeignKey,
        params={
            "references": Apartment,
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
