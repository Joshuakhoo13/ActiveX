from datetime import datetime

from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    username: str
    email: str
    created_at: datetime

    model_config = {"from_attributes": True}


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


class CourtCreate(BaseModel):
    name: str
    latitude: float | None = None
    longitude: float | None = None
    address: str | None = None


class CourtOut(BaseModel):
    id: int
    name: str
    latitude: float | None
    longitude: float | None
    address: str | None
    created_at: datetime

    model_config = {"from_attributes": True}
