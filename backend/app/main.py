from fastapi import FastAPI
from app.database import engine, Base
from app.models import *
from fastapi.middleware.cors import CORSMiddleware
from app.routes import sets, cards, languages , flashcards, users, auth


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(sets.router)
app.include_router(cards.router)
app.include_router(languages.router)
app.include_router(flashcards.router)

@app.get("/health")
def health_check():
    return {"status": "ok"}
