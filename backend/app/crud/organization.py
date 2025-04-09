from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.organization import Organization
from app.schemas.organization import OrganizationCreate, OrganizationUpdate

def get_organization(db: Session, organization_id: int) -> Optional[Organization]:
    return db.query(Organization).filter(Organization.id == organization_id).first()

def get_organizations(
    db: Session, skip: int = 0, limit: int = 100, search: Optional[str] = None
) -> List[Organization]:
    query = db.query(Organization)
    if search:
        query = query.filter(Organization.name.ilike(f"%{search}%"))
    return query.offset(skip).limit(limit).all()

def create_organization(db: Session, organization: OrganizationCreate) -> Organization:
    db_organization = Organization(**organization.dict())
    db.add(db_organization)
    db.commit()
    db.refresh(db_organization)
    return db_organization

def update_organization(
    db: Session, organization_id: int, organization: OrganizationUpdate
) -> Optional[Organization]:
    db_organization = get_organization(db, organization_id)
    if db_organization:
        for key, value in organization.dict(exclude_unset=True).items():
            setattr(db_organization, key, value)
        db.commit()
        db.refresh(db_organization)
    return db_organization

def delete_organization(db: Session, organization_id: int) -> bool:
    db_organization = get_organization(db, organization_id)
    if db_organization:
        db.delete(db_organization)
        db.commit()
        return True
    return False