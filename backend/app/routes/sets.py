from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import HTTPException
from sqlalchemy import func

from app.database import get_db
from app.models.flashcard_sets import FlashcardSet
from app.models.flashcards import Flashcard
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
        source_language=data.source_language,
        target_language=data.target_language,
        level=data.level,
        owner_id=current_user.id
    )

    db.add(new_set)
    db.commit()
    db.refresh(new_set)

    return new_set


@router.get("")
def get_my_sets(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    results = (
        db.query(
            FlashcardSet,
            func.count(Flashcard.id).label("cards_count")
        )
        .outerjoin(
            Flashcard,
            Flashcard.set_id == FlashcardSet.id
        )
        .filter(
            FlashcardSet.owner_id == current_user.id
        )
        .group_by(
            FlashcardSet.id
        )
        .all()
    )

    return [
        {
            "id": flashcard_set.id,
            "title": flashcard_set.title,
            "description": flashcard_set.description,
            "source_language": flashcard_set.source_language,
            "target_language": flashcard_set.target_language,
            "level": flashcard_set.level,
            "created_at": flashcard_set.created_at,
            "cards_count": cards_count,
        }
        for flashcard_set, cards_count in results
    ]


# to delete a flashcard set
@router.delete("/{set_id}")
def delete_set(
    set_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    flashcard_set = (
        db.query(FlashcardSet)
        .filter(FlashcardSet.id == set_id)
        .first()
    )

    if not flashcard_set:
        raise HTTPException(
            status_code=404,
            detail="Set not found"
        )

    # Make sure the user owns this set
    if flashcard_set.owner_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not allowed"
        )

    db.delete(flashcard_set)
    db.commit()

    return {"message": "Set deleted successfully"}
