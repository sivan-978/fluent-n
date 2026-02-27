from fastapi import FastAPI
from app.database import engine
from app.database import Base

app = FastAPI()


@app.get("/health")
def health_check():
    return {"status": "ok"}
