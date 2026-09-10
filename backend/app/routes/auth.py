from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from jose import JWTError, jwt

from app.core.security import ( SECRET_KEY, ALGORITHM, create_access_token)
from app.database import get_db
from app.schemas.auth import UserRegister, UserLogin, TokenResponse, RefreshTokenRequest
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
    tokens = authenticate_user(
        db=db,
        email=data.email,
        password=data.password
    )

    if not tokens:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return tokens


@router.post("/refresh")
def refresh_access_token(data: RefreshTokenRequest):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not refresh access token"
    )

    try:
        payload = jwt.decode(
            data.refresh_token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        # Make sure this is actually a refresh token
        if payload.get("type") != "refresh":
            raise credentials_exception

        user_id = payload.get("sub")

        if user_id is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    new_access_token = create_access_token({
        "sub": user_id
    })

    return {
        "access_token": new_access_token,
        "token_type": "bearer"
    }
