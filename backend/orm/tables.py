from piccolo.table import Table
from piccolo.columns.column_types import Varchar, Boolean, Timestamp, Text


class Test(Table, tablename="test"):
    """
    Test table
    """

    title = Varchar()
    content = Text()
    published = Boolean(default=False)
    created_on = Timestamp()
