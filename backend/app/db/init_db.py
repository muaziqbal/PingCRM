from sqlalchemy.orm import Session
from app.db.base_class import Base
from app.db.session import engine
from app.models.organization import Organization
from app.models.contact import Contact

def init_db():
    # Create all tables
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()
