import pytest
from fastapi import status
from app.models.organization import Organization
from app.schemas.organization import OrganizationCreate

def test_create_organization(client, db_session):
    organization_data = {
        "name": "Test Organization",
        "email": "test@example.com",
        "phone": "1234567890",
        "address": "123 Test St",
        "city": "Test City",
        "region": "Test Region",
        "country": "Test Country",
        "postal_code": "12345"
    }

    response = client.post("/api/v1/organizations/", json=organization_data)
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["name"] == organization_data["name"]
    assert data["email"] == organization_data["email"]

def test_get_organization(client, db_session):
    # Create test organization
    org = Organization(
        name="Test Org",
        email="test@example.com",
        phone="1234567890"
    )
    db_session.add(org)
    db_session.commit()

    response = client.get(f"/api/v1/organizations/{org.id}")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["name"] == org.name
    assert data["email"] == org.email

def test_list_organizations(client, db_session):
    # Create test organizations
    org1 = Organization(name="Org 1", email="org1@example.com")
    org2 = Organization(name="Org 2", email="org2@example.com")
    db_session.add_all([org1, org2])
    db_session.commit()

    response = client.get("/api/v1/organizations/")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert len(data) == 2
    assert data[0]["name"] in ["Org 1", "Org 2"]

def test_update_organization(client, db_session):
    # Create test organization
    org = Organization(
        name="Original Name",
        email="original@example.com",
        phone="1234567890"
    )
    db_session.add(org)
    db_session.commit()

    update_data = {
        "name": "Updated Name",
        "email": "updated@example.com"
    }

    response = client.put(f"/api/v1/organizations/{org.id}", json=update_data)
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["name"] == update_data["name"]
    assert data["email"] == update_data["email"]

def test_delete_organization(client, db_session):
    # Create test organization
    org = Organization(
        name="To Delete",
        email="delete@example.com",
        phone="1234567890"
    )
    db_session.add(org)
    db_session.commit()

    response = client.delete(f"/api/v1/organizations/{org.id}")
    assert response.status_code == status.HTTP_200_OK

    # Verify organization is deleted
    response = client.get(f"/api/v1/organizations/{org.id}")
    assert response.status_code == status.HTTP_404_NOT_FOUND