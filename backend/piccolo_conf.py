from piccolo.conf.apps import AppRegistry
from piccolo.engine.postgres import PostgresEngine


DB = PostgresEngine(
    config={
        "database": "drop_db",
        "user": "drop_db",
        "password": "test",
        "host": "localhost",
        "port": 6432,
    }
)

APP_REGISTRY = AppRegistry(
    apps=[
        "orm.piccolo_app",
        "piccolo_admin.piccolo_app",
        "piccolo.apps.user.piccolo_app",
    ]
)
