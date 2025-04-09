from pydantic import BaseModel, EmailStr
from typing import Optional, ClassVar
from datetime import datetime
import uuid
from .organization import Organization as OrganizationSchema

class ContactBase(BaseModel):
    name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    city: Optional[str] = None
    organization_id: Optional[int] = None

class ContactCreate(ContactBase):
    pass

class ContactUpdate(ContactBase):
    name: Optional[str] = None
    organization_id: Optional[int] = None

class ContactInDBBase(ContactBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    deleted_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class Contact(ContactInDBBase):
    pass

class ContactInDB(ContactInDBBase):
    pass

class ContactWithOrganization(Contact):
    organization: Optional[OrganizationSchema] = None

    class Config:
        from_attributes = True