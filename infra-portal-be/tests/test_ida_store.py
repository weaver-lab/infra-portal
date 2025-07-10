import os
dir_path = os.getcwd()

import sys
sys.path.append(dir_path + '/src')

print(sys.path)

import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from fastapi import status
from src.ida_store_api import app, validate_api_key, users_collection, schools_collection, items_collection
from src import ida_store_api
from src.models import Item, School
from unittest.mock import AsyncMock, Mock, MagicMock


@pytest_asyncio.fixture
async def async_client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        yield client

@pytest.mark.asyncio
async def test_create_item_success(async_client, mocker):
    # Setup: mock validate_api_key dependency
    mock_user = {
        "user_id": "user123",
        "user_name": "Test User",
        "organisation": "TestOrg"
    }

    item_data = {
        "item_id": "123",
        "item_name": "Test Item",
        "item_type": "Type1",
        "item_description": "A test item",
        "item_amount": "100",
        "location": {"type": "Point", "coordinates": [10.0, 20.0]},
        "city": "Test City",
        "country": "Test Country",
        "operational_status": "active",
        "ownership": "company",
        "item_provider_id": "provider123",
        "item_provider": "Provider Name",
        "deployment_type": "permanent",
        "cross_connect": "yes",
        "colocation": "no",
        "user_defined_metadata": {},
        "transmission_equipment": "equipment1",
        "band": "band1",
        "teleport": "teleport1",
        "antenna": "antenna1",
        "accessories": "accessory1",
        "power": "stable",
        "visibility": True,
        "submitted_via": "test_tool"
    }

    async def async_mock_user():
        return mock_user

    app.dependency_overrides[validate_api_key] = async_mock_user

    # Setup: mock the database behavior
    mock_items = MagicMock()
    mock_items.insert_one = AsyncMock(return_value=None)
    mock_items.find_one = AsyncMock(return_value={})

    ida_store_api.items_collection = mock_items


    # Call the API
    response = await async_client.post(
        "/ida/api/v1/items/",
        json=item_data,
        headers={"x-api-key": "testkey"}
    )

    # Assert response
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["item_id"] == "123"
    assert "creation_date" in response.json()


@pytest.mark.asyncio
async def test_create_item_failure_duplicate(async_client, mocker):
    # Setup: mock validate_api_key dependency
    mock_user = {
        "user_id": "user123",
        "user_name": "Test User",
        "organisation": "TestOrg"
    }

    # Sample item data
    item_data = {
        "item_id": "123",
        "item_name": "Test Item",
        "item_type": "Type1",
        "item_description": "A test item",
        "item_amount": "100",
        "location": {"type": "Point", "coordinates": [10.0, 20.0]},
        "city": "Test City",
        "country": "Test Country",
        "operational_status": "active",
        "ownership": "company",
        "item_provider_id": "provider123",
        "item_provider": "Provider Name",
        "deployment_type": "permanent",
        "cross_connect": "yes",
        "colocation": "no",
        "user_defined_metadata": {},
        "transmission_equipment": "equipment1",
        "band": "band1",
        "teleport": "teleport1",
        "antenna": "antenna1",
        "accessories": "accessory1",
        "power": "stable",
        "visibility": True,
        "submitted_via": "test_tool"
    }

    async def async_mock_user():
        return mock_user

    app.dependency_overrides[validate_api_key] = async_mock_user

    # Setup: mock the database behavior
    mock_items = MagicMock()
    mock_items.insert_one = AsyncMock(return_value=None)
    mock_items.find_one = AsyncMock(return_value=item_data)

    ida_store_api.items_collection = mock_items


    # Call the API
    response = await async_client.post(
        "/ida/api/v1/items/",
        json=item_data,
        headers={"x-api-key": "testkey"}
    )

    # Assert response
    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.asyncio
async def test_get_item_success(async_client):
    item_data = {"item_id": "123", "item_name": "Test Item", "visibility": True}
    ida_store_api.items_collection.find_one = AsyncMock(return_value=item_data)

    response = await async_client.get("/ida/api/v1/items/123")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["item_id"] == "123"

@pytest.mark.asyncio
async def test_get_item_not_found(async_client):
    ida_store_api.items_collection.find_one = AsyncMock(return_value=None)

    response = await async_client.get("/ida/api/v1/items/999")
    assert response.status_code == status.HTTP_404_NOT_FOUND

@pytest.mark.asyncio
async def test_list_items(async_client):
    mock_cursor = MagicMock()
    mock_cursor.to_list = AsyncMock(return_value=[
        {"item_id": "1", "visibility": True}
    ])

    ida_store_api.items_collection.find = MagicMock(return_value=mock_cursor)

    response = await async_client.get("/ida/api/v1/items/")
    assert response.status_code == status.HTTP_200_OK
    assert isinstance(response.json(), list)

@pytest.mark.asyncio
async def test_get_items_by_owner(async_client):
    mock_user = {"user_id": "user123", "user_name": "Test User", "organisation": "TestOrg"}

    async def async_mock_user():
        return mock_user

    app.dependency_overrides[validate_api_key] = async_mock_user

    mock_cursor = MagicMock()
    mock_cursor.to_list = AsyncMock(return_value=[
        {"item_id": "1", "visibility": True}
    ])

    ida_store_api.items_collection.find = MagicMock(return_value=mock_cursor)

    response = await async_client.get("/ida/api/v1/items/by-owner/", headers={"x-api-key": "testkey"})
    assert response.status_code == status.HTTP_200_OK
    assert isinstance(response.json(), list)

@pytest.mark.asyncio
async def test_get_items_by_range(async_client):
    mock_cursor = MagicMock()
    mock_cursor.to_list = AsyncMock(return_value=[
        {"item_id": "1", "visibility": True}
    ])

    ida_store_api.items_collection.find = MagicMock(return_value=mock_cursor)

    response = await async_client.get("/ida/api/v1/items/by-range/?longitude=10.0&latitude=20.0&range_km=100")
    assert response.status_code == status.HTTP_200_OK
    assert isinstance(response.json(), list)

    # New school route tests
@pytest.mark.asyncio
async def test_create_school_success(async_client):
    mock_user = {"user_id": "user123", "user_name": "Test User", "organisation": "TestOrg"}

    school_data = {
        "school_id": "sch001",
        "school_name": "Test School",
        "location": {"type": "Point", "coordinates": [10.0, 20.0]},
        "submitter_id": "user123"
    }

    async def async_mock_user():
        return mock_user

    app.dependency_overrides[validate_api_key] = async_mock_user

    mock_schools = MagicMock()
    mock_schools.insert_one = AsyncMock(return_value=None)
    mock_schools.find_one = AsyncMock(return_value={})
    ida_store_api.schools_collection.insert_one = mock_schools.insert_one
    ida_store_api.schools_collection.find_one = mock_schools.find_one

    response = await async_client.post("/ida/api/v1/schools/", json=school_data, headers={"x-api-key": "testkey"})
    print(response.json())
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["message"] == "School added successfully"

@pytest.mark.asyncio
async def test_get_school_success(async_client):
    school_data = {"school_id": "sch001", "name": "Test School"}
    ida_store_api.schools_collection.find_one = AsyncMock(return_value=school_data)

    response = await async_client.get("/ida/api/v1/schools/sch001")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["school_id"] == "sch001"

@pytest.mark.asyncio
async def test_get_school_not_found(async_client):
    ida_store_api.schools_collection.find_one = AsyncMock(return_value=None)

    response = await async_client.get("/ida/api/v1/schools/doesnotexist")
    assert response.status_code == status.HTTP_404_NOT_FOUND
