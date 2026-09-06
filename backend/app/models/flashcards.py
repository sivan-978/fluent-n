from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.database import Base
from sqlalchemy.orm import relationship


class Flashcard(Base):

    __tablename__ = "flashcards"

    id = Column(Integer, primary_key=True, index=True)

    term = Column(String, nullable=False)
    definition = Column(String, nullable=False)

    set_id = Column(Integer, ForeignKey("flashcard_sets.id"), nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    set = relationship("FlashcardSet", back_populates="flashcards")
