from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.auth import UserRegister, UserLogin, TokenResponse
from app.services.auth_service import register_user, authenticate_user

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register")
def register(data: UserRegister, db: Session = Depends(get_db)):
    try:
        user = register_user(
            db=db,
            email=data.email,
            username=data.username,
            password=data.password
        )
        return {"message": "User created successfully"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login", response_model=TokenResponse)
def login(data: UserLogin, db: Session = Depends(get_db)):
    token = authenticate_user(
        db=db,
        email=data.email,
        password=data.password
    )

    if not token:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"access_token": token}