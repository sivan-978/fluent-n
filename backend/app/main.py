from fastapi import FastAPI
from app.database import engine, Base
from app.models import User
from app.routes import auth
from app.routes import users

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(users.router)

@app.get("/health")
def health_check():
    return {"status": "ok"}
