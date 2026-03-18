from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.flashcards import Flashcard
from app.models.flashcard_sets import FlashcardSet
from app.schemas.card import CardCreate
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter(prefix="/sets", tags=["cards"])

@router.post("/{set_id}/cards")
def create_card(
    set_id: int,
    data: CardCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # fetch set
    flashcard_set = db.query(FlashcardSet).filter(
        FlashcardSet.id == set_id
    ).first()

    if not flashcard_set:
        raise HTTPException(status_code=404, detail="Set not found")

    # ownership validation (VERY IMPORTANT)
    if flashcard_set.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not allowed")

    # create card
    new_card = Flashcard(
        front_text=data.front_text,
        back_text=data.back_text,
        set_id=set_id
    )

    db.add(new_card)
    db.commit()
    db.refresh(new_card)

    return new_card