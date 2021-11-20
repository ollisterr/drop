from typing import List

from fastapi import APIRouter
from piccolo_admin.endpoints import create_admin

from orm.piccolo_app import APP_CONFIG

router = APIRouter()

admin = create_admin(tables=APP_CONFIG.table_classes, site_name="Drop Admin")
router.mount("/admin/", admin)
