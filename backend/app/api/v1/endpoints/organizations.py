from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.organization import Organization, OrganizationCreate, OrganizationUpdate
from app.crud.organization import (
    get_organization,
    get_organizations,
    create_organization,
    update_organization,
    delete_organization,
)

router = APIRouter()

@router.get("/", response_model=List[Organization])
def read_organizations(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    search: str = None,
):
    organizations = get_organizations(db, skip=skip, limit=limit, search=search)
    return organizations

@router.post("/", response_model=Organization)
def create_organization_endpoint(
    organization: OrganizationCreate,
    db: Session = Depends(get_db),
):
    return create_organization(db=db, organization=organization)

@router.get("/{organization_id}", response_model=Organization)
def read_organization(organization_id: int, db: Session = Depends(get_db)):
    organization = get_organization(db, organization_id=organization_id)
    if organization is None:
        raise HTTPException(status_code=404, detail="Organization not found")
    return organization

@router.put("/{organization_id}", response_model=Organization)
def update_organization_endpoint(
    organization_id: int,
    organization: OrganizationUpdate,
    db: Session = Depends(get_db),
):
    db_organization = update_organization(
        db=db, organization_id=organization_id, organization=organization
    )
    if db_organization is None:
        raise HTTPException(status_code=404, detail="Organization not found")
    return db_organization

@router.delete("/{organization_id}")
def delete_organization_endpoint(organization_id: int, db: Session = Depends(get_db)):
    success = delete_organization(db=db, organization_id=organization_id)
    if not success:
        raise HTTPException(status_code=404, detail="Organization not found")
    return {"message": "Organization deleted successfully"}