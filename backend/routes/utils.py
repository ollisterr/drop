from fastapi import Query


class SearchArgs:
    def __init__(
        self,
        limit: int = Query(10),
        offset: int = Query(0),
    ):
        self.limit = limit
        self.offset = offset
