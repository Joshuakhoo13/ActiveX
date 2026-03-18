from pydantic import BaseModel, EmailStr

users_db: dict[str, dict] = {}


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str = ""


class UserOut(BaseModel):
    email: str
    name: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut
