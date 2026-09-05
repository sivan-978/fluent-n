from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.flashcards import Flashcard
from app.models.flashcard_sets import FlashcardSet
from app.schemas.card import CardUpdate
from app.core.security import get_current_user
from app.models.user import User


router = APIRouter(prefix="/cards", tags=["cards"])


# update a flashcard
@router.put("/{card_id}")
def update_card(
    card_id: int,
    data: CardUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # find the card
    card = (
        db.query(Flashcard)
        .filter(Flashcard.id == card_id)
        .first()
    )

    if not card:
        raise HTTPException(
            status_code=404,
            detail="Flashcard not found"
        )

    # find the set that belongs to this card
    flashcard_set = (
        db.query(FlashcardSet)
        .filter(FlashcardSet.id == card.set_id)
        .first()
    )

    # check if the user owns the flashcard set
    if not flashcard_set or flashcard_set.owner_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not allowed"
        )

    # update the card
    card.front_text = data.front_text
    card.back_text = data.back_text

    db.commit()
    db.refresh(card)

    return card


@router.delete("/{card_id}")
def delete_card(
    card_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    
    # find the card
    card = (
        db.query(Flashcard)
        .filter(Flashcard.id == card_id)
        .first()
    )

    if not card:
        raise HTTPException(
            status_code=404,
            detail="Flashcard not found"
        )

    # check if the card belongs to one of the user's sets
    flashcard_set = (
        db.query(FlashcardSet)
        .filter(
            FlashcardSet.id == card.set_id,
            FlashcardSet.owner_id == current_user.id
        )
        .first()
    )

    if not flashcard_set:
        raise HTTPException(
            status_code=403,
            detail="Not allowed"
        )

    db.delete(card)
    db.commit()

    return {
        "message": "Flashcard deleted successfully"
    }