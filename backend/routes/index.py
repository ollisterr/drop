from fastapi import APIRouter

router = APIRouter()


@router.get("/", tags=["index"])
async def index():
    return {"hello": "world"}
