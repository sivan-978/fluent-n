from pydantic import BaseModel


class CardCreate(BaseModel):
    term: str
    definition: str


class CardUpdate(BaseModel):
    term: str
    definition: str