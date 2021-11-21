from typing import Any

from piccolo.apps.user.tables import BaseUser
from piccolo.utils.pydantic import create_pydantic_model

from orm.tables import Apartment, Group

BaseUserPydantic: Any = create_pydantic_model(
    table=BaseUser,
    model_name="BaseUserPydantic",
    include_columns=(BaseUser.username, BaseUser.password),
)
GroupPydantic: Any = create_pydantic_model(table=Group, model_name="GroupPydantic")
ApartmentPydantic: Any = create_pydantic_model(table=Apartment, model_name="ApartmentPydantic")
