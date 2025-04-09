from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.contact import Contact
from app.schemas.contact import ContactCreate, ContactUpdate
from sqlalchemy.sql import func

def get_contact(db: Session, contact_id: int) -> Optional[Contact]:
    return db.query(Contact).filter(Contact.id == contact_id).first()

def get_contacts(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    organization_id: Optional[int] = None,
    search: Optional[str] = None
) -> List[Contact]:
    query = db.query(Contact)

    if organization_id:
        query = query.filter(Contact.organization_id == organization_id)

    if search:
        query = query.filter(Contact.name.ilike(f"%{search}%"))

    return query.offset(skip).limit(limit).all()

def create_contact(db: Session, contact: ContactCreate) -> Contact:
    db_contact = Contact(**contact.model_dump())
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

def update_contact(
    db: Session,
    db_contact: Contact,
    contact_in: ContactUpdate
) -> Contact:
    update_data = contact_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_contact, field, value)

    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

def delete_contact(db: Session, contact_id: int) -> Optional[Contact]:
    contact = get_contact(db, contact_id)
    if contact:
        contact.deleted_at = func.now()
        db.add(contact)
        db.commit()
        db.refresh(contact)
    return contact