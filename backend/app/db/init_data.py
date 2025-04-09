from sqlalchemy.orm import Session
from app.models.organization import Organization
from app.models.contact import Contact
from datetime import datetime

def init_data(db: Session) -> None:
    # Create sample organizations
    org1 = Organization(
        name="Acme Corporation",
        email="info@acme.com",
        phone="+1-555-123-4567",
        address="123 Main St",
        city="New York",
        region="NY",
        country="USA",
        postal_code="10001"
    )

    org2 = Organization(
        name="Tech Solutions Inc",
        email="contact@techsolutions.com",
        phone="+1-555-987-6543",
        address="456 Tech Ave",
        city="San Francisco",
        region="CA",
        country="USA",
        postal_code="94105"
    )

    db.add(org1)
    db.add(org2)
    db.commit()

    # Create sample contacts
    contact1 = Contact(
        name="John Doe",
        email="john@acme.com",
        phone="+1-555-111-2222",
        city="New York",
        organization_id=org1.id
    )

    contact2 = Contact(
        name="Jane Smith",
        email="jane@acme.com",
        phone="+1-555-333-4444",
        city="New York",
        organization_id=org1.id
    )

    contact3 = Contact(
        name="Bob Johnson",
        email="bob@techsolutions.com",
        phone="+1-555-555-6666",
        city="San Francisco",
        organization_id=org2.id
    )

    db.add(contact1)
    db.add(contact2)
    db.add(contact3)
    db.commit()