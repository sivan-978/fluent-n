from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.flashcard_sets import FlashcardSet
from app.schemas.set import SetCreate
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter(prefix="/sets", tags=["sets"])


@router.post("")
def create_set(
    data: SetCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    new_set = FlashcardSet(
        title=data.title,
        description=data.description,
        owner_id=current_user.id
    )

    db.add(new_set)
    db.commit()
    db.refresh(new_set)

    return new_set