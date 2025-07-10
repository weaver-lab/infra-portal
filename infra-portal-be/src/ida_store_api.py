from fastapi import FastAPI, HTTPException, Depends, Header, Query
from typing import Optional
from models import Item, School, UpdatedItem, UpdatedSchool
from db import users_collection, schools_collection, items_collection
import datetime


app = FastAPI()

#Constants
EARTH_RADIUS_KM = 6378.1

# Dependency to check API key
async def validate_api_key(x_api_key: str = Header(...)):
    user_doc = await users_collection.find_one({"apiKey": x_api_key})
    if not user_doc:
        raise HTTPException(status_code=403, detail="Invalid API key")
    return user_doc

# Helper function to convert MongoDB document to dictionary
def item_serializer(item) -> dict:
    return {
        "item_id": item.get("item_id", ""),
        "item_name": item.get("item_name", ""),
        "item_type": item.get("item_type", ""),
        "item_description": item.get("item_description", ""),
        "item_amount": item.get("item_amount", ""),
        "location": item.get("location", {}),
        "city": item.get("city", ""),
        "country": item.get("country", ""),
        "operational_status": item.get("operational_status", ""),
        "ownership": item.get("ownership", ""),
        "item_provider": item.get("item_provider", ""),
        "deployment_type": item.get("deployment_type", ""),
        "cross_connect": item.get("cross_connect", ""),
        "colocation": item.get("colocation", ""),
        "user_defined_metadata": item.get("user_defined_metadata", {}),
        "transmission_equipment": item.get("transmission_equipment", ""),
        "band": item.get("band", ""),
        "teleport": item.get("teleport", ""),
        "antenna": item.get("antenna", ""),
        "accessories": item.get("accessories", ""),
        "visibility": item.get("visibility", False),
        "submitter_id": str(item["submitter_id"]),
        "submitter_name": item.get("submitter_name", ""),
        "creation_date": item.get("creation_date", "")
    }

# Helper function to convert MongoDB document to dictionary
def school_serializer(school) -> dict:
    return {
        "school_id": school.get("school_id", ""),
        "school_name": school.get("school_name", ""),
        "location": school.get("location", {}),
        "submitter_id": str(school["submitter_id"]),
        "creation_date": school.get("creation_date", "")
    }

def convert_geo_object(geo_object: str):
    if "Line" in geo_object:
        return "LineString"
    else:
        return "Point"

def validate_long_lat(location: dict):
    invalid = False
    if location["type"] == "LineString":
        for coordinates in location["coordinates"]:
            if coordinates[0] < -180 or coordinates[0] > 180:
                invalid = True
            if coordinates[1] < -90 or coordinates[1] > 90:
                invalid = True
            if invalid is True:
                return False
    elif location["type"] == "Point":
        if location["coordinates"][0] < -180 or location["coordinates"][0] > 180:
            invalid = True
        if location["coordinates"][1] < -90 or location["coordinates"][1] > 90:
            invalid = True
        if invalid is True:
            return False
    return True

# Item Routes
@app.post("/ida/api/v1/items/", response_model=dict)
async def create_item(item: Item, user: dict = Depends(validate_api_key)):
    new_item = item.model_dump()
    existing_item = await items_collection.find_one({"item_id": new_item["item_id"]})
    if not existing_item:
        new_item["creation_date"] = datetime.datetime.now(datetime.timezone.utc)
        new_item["submitter_id"] = (user["_id"])
        new_item["submitter_name"] = user["name"]
        new_item["item_provider"] = user["orgName"]
        if not validate_long_lat(new_item["location"]):
            raise HTTPException(status_code=400, detail="Item contains invalid longitude-latitude coordinates")
        result = await items_collection.insert_one(new_item)
        return item_serializer(new_item)
    else:
        raise HTTPException(status_code=400, detail="Item ID already exists")

@app.get("/ida/api/v1/items/{item_id}", response_model=dict)
async def get_item(item_id: str):
    item = await items_collection.find_one({"item_id": item_id, "visibility": True})
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item_serializer(item)

@app.get("/ida/api/v1/items/", response_model=list)
async def list_items(
    country: Optional[str] = Query(None),
    itemType: Optional[str] = Query(None)
):
    query = {}
    if country:
        query["country"] = country
    if itemType:
        query["item_type"] = itemType
    query["visibility"] = True
    items = await items_collection.find(query).to_list(None)
    if not items:
        return []
    return [item_serializer(item) for item in items]

@app.get("/ida/api/v1/items/by-owner/", response_model=list)
async def get_items_by_owner(user: dict = Depends(validate_api_key)):
    query = {"submitter_id": user["_id"]}
    items = await items_collection.find(query).to_list(None)
    return [item_serializer(item) for item in items]

@app.put("/ida/api/v1/items/", response_model=dict)
async def update_item(item_id: str, item: UpdatedItem, user: dict = Depends(validate_api_key)):
    existing_item = await items_collection.find_one({"item_id": item_id, "submitter_id": user["_id"]})
    if not existing_item:
        raise HTTPException(status_code=404, detail="Item not found or not authorized to update")
    updated_item = item.model_dump(exclude_unset=True)
    if "location" in updated_item and not validate_long_lat(updated_item["location"]):
        raise HTTPException(status_code=400, detail="Item contains invalid longitude-latitude coordinates")
    updated_item["submitter_id"] = user["_id"]
    updated_item["submitter_name"] = user["name"]
    updated_item["item_provider"] = user["orgName"]
    await items_collection.update_one({"item_id": item_id}, {"$set": updated_item})
    updated_item = await items_collection.find_one({"item_id": item_id})
    return item_serializer(updated_item)

@app.delete("/ida/api/v1/items/", response_model=dict)
async def delete_item(item_id: str, user: dict = Depends(validate_api_key)):
    query = {"item_id": item_id, "submitter_id": user["_id"]}
    item = await items_collection.find_one(query)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found or not authorized to delete")
    result = await items_collection.delete_one(query)
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Failed to delete item")
    return {"message": "Item deleted successfully"}

@app.get("/ida/api/v1/items/by-range/", response_model=list)
async def get_items_by_range(longitude: float, latitude: float, range_km: float):
    query = {
        "visibility": True,
        "location": {
            "$geoWithin": {
                "$centerSphere": [[longitude, latitude], range_km / EARTH_RADIUS_KM]
            }
        }
    }
    items = await items_collection.find(query).to_list(None)
    return [item_serializer(item) for item in items]

# School Routes
@app.post("/ida/api/v1/schools/", response_model=dict)
async def add_school(school: School, user: dict = Depends(validate_api_key)):
    existing_school = await schools_collection.find_one({"school_id": school.school_id})
    if existing_school:
        raise HTTPException(status_code=400, detail="School already exists")
    new_school = school.model_dump()
    if not validate_long_lat(new_school["location"]):
        raise HTTPException(status_code=400, detail="Item contains invalid longitude-latitude coordinates")
    new_school["submitter_id"] = user["_id"]
    new_school["creation_date"] = datetime.datetime.now(datetime.timezone.utc)
    await schools_collection.insert_one(new_school)
    return {"message": "School added successfully"}

@app.get("/ida/api/v1/schools/{school_id}", response_model=dict)
async def get_school(school_id: str):
    school = await schools_collection.find_one({"school_id": school_id})
    if not school:
        raise HTTPException(status_code=404, detail="School not found")
    return school_serializer(school)

@app.get("/ida/api/v1/schools/", response_model=list)
async def list_schools():
    schools = await schools_collection.find({}).to_list(None)
    return [school_serializer(school) for school in schools]

@app.put("/ida/api/v1/schools/", response_model=dict)
async def update_school(school_id: str, school: UpdatedSchool, user: dict = Depends(validate_api_key)):
    existing_school = await schools_collection.find_one({"school_id": school_id, "submitter_id": user["_id"]})
    if not existing_school:
        raise HTTPException(status_code=404, detail="School not found, or you're not authorised to edit the school")
    updated_school = school.model_dump(exclude_unset=True)
    if "location" in updated_school and not validate_long_lat(updated_school["location"]):
        raise HTTPException(status_code=400, detail="School contains invalid longitude-latitude coordinates")
    await schools_collection.update_one({"school_id": school_id}, {"$set": updated_school})
    return {"message": "School updated successfully"}

@app.delete("/ida/api/v1/schools/", response_model=dict)
async def delete_school(school_id: str, user: dict = Depends(validate_api_key)):
    existing_school = await schools_collection.find_one({"school_id": school_id, "submitter_id": user["_id"]})
    if not existing_school:
        raise HTTPException(status_code=404, detail="School not found, or you're not authorised to edit the school")
    result = await schools_collection.delete_one({"school_id": school_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Failed to delete school")
    return {"message": "School deleted successfully"}

