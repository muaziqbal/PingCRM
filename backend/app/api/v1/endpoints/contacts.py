from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.schemas.contact import Contact, ContactCreate, ContactUpdate
from app.crud.contact import (
    get_contact,
    get_contacts,
    create_contact,
    update_contact,
    delete_contact,
)

router = APIRouter()

@router.get("/", response_model=List[Contact])
def read_contacts(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    search: str = None,
    organization_id: int = None,
):
    """
    Retrieve contacts.
    """
    contacts = get_contacts(
        db,
        skip=skip,
        limit=limit,
        search=search,
        organization_id=organization_id,
    )
    return contacts

@router.post("/", response_model=Contact)
def create_contact_endpoint(
    contact: ContactCreate,
    db: Session = Depends(get_db),
):
    """
    Create new contact.
    """
    return create_contact(db=db, contact=contact)

@router.get("/{contact_id}", response_model=Contact)
def read_contact(contact_id: int, db: Session = Depends(get_db)):
    """
    Get contact by ID.
    """
    contact = get_contact(db, contact_id=contact_id)
    if contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact

@router.put("/{contact_id}", response_model=Contact)
def update_contact_endpoint(
    contact_id: int,
    contact: ContactUpdate,
    db: Session = Depends(get_db),
):
    """
    Update a contact.
    """
    db_contact = update_contact(
        db=db, contact_id=contact_id, contact=contact
    )
    if db_contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return db_contact

@router.delete("/{contact_id}")
def delete_contact_endpoint(contact_id: int, db: Session = Depends(get_db)):
    """
    Delete a contact.
    """
    success = delete_contact(db=db, contact_id=contact_id)
    if not success:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"message": "Contact deleted successfully"}