from fastapi import APIRouter
from app.core.languages import get_all_languages

router = APIRouter()

@router.get("/languages")
def get_languages():
    return get_all_languages()