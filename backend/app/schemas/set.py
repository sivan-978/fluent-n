from pydantic import BaseModel


class SetCreate(BaseModel):
    title: str
    description: str | None = None
    level: str | None = None