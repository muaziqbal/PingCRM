from typing import Generator
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.core.config import settings

def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

def get_current_user():
    # TODO: Implement user authentication
    pass

def get_current_active_user():
    # TODO: Implement active user check
    pass