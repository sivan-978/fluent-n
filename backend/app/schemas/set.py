from pydantic import BaseModel


class SetCreate(BaseModel):
    title: str
    description: str | None = None
    level: str | None = None
    source_language: str
    target_language: str


class SetUpdate(BaseModel):
    title: str
    description: str | None = None
    level: str | None = None
    source_language: str
    target_language: str
