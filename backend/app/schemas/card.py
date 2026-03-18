from pydantic import BaseModel


class CardCreate(BaseModel):
    front_text: str
    back_text: str
