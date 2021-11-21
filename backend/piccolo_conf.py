import os

from dotenv import load_dotenv
from piccolo.conf.apps import AppRegistry
from piccolo.engine.postgres import PostgresEngine

load_dotenv()

ENV = os.getenv("ENV")

DB = os.getenv("POSTGRES_DB")
USER = os.getenv("POSTGRES_USER")
PASSWORD = os.getenv("POSTGRES_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")


DB = PostgresEngine(
    config={
        "database": DB,
        "user": USER,
        "password": PASSWORD,
        "host": DB_HOST,
        "port": DB_PORT,
    },
    log_queries=False if ENV == "development" else False,
)

APP_REGISTRY = AppRegistry(
    apps=[
        "orm.piccolo_app",
        "piccolo_admin.piccolo_app",
        "piccolo.apps.user.piccolo_app",
    ]
)
