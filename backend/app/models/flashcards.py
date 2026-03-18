from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.database import Base


class Flashcards(Base):

    __tablename__ = "flashcards"

    id = Column(Integer, primary_key=True, index=True)

    front_text = Column(String, nullable=False)
    back_text = Column(String, nullable=False)

    set_id = Column(Integer, ForeignKey("flashcard_sets.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())