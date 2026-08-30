from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import HTTPException

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


@router.get("")
def get_my_sets(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    sets = (
        db.query(FlashcardSet)
        .filter(FlashcardSet.owner_id == current_user.id)
        .all()
    )

    return sets


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
