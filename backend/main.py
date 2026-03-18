from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from api.auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user_email,
)
from database import users_db, UserCreate, UserOut, LoginRequest, TokenResponse

app = FastAPI(title="ActiveX API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/auth/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(body: UserCreate):
    if body.email in users_db:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

    users_db[body.email] = {
        "email": body.email,
        "name": body.name or body.email.split("@")[0],
        "hashed_password": hash_password(body.password),
    }

    token = create_access_token({"sub": body.email})
    user = UserOut(email=body.email, name=users_db[body.email]["name"])
    return TokenResponse(access_token=token, user=user)


@app.post("/auth/login", response_model=TokenResponse)
def login(body: LoginRequest):
    user_record = users_db.get(body.email)
    if not user_record or not verify_password(body.password, user_record["hashed_password"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    token = create_access_token({"sub": body.email})
    user = UserOut(email=user_record["email"], name=user_record["name"])
    return TokenResponse(access_token=token, user=user)


@app.get("/auth/me", response_model=UserOut)
def get_me(email: str = Depends(get_current_user_email)):
    user_record = users_db.get(email)
    if not user_record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return UserOut(email=user_record["email"], name=user_record["name"])


@app.get("/health")
def health():
    return {"status": "ok"}
