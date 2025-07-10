from pydantic import BaseModel
from typing import Union, Literal, Optional, Annotated
from annotated_types import MinLen
from datetime import datetime


# Pydantic models for request validation
class GeoJSONPoint(BaseModel):
    type: Literal["Point"]
    coordinates: Annotated[list[float], MinLen(2)]  # [longitude, latitude]

class GeoJSONLineString(BaseModel):
    type: Literal["LineString"]
    coordinates: list[Annotated[list[float], MinLen(2)]]  # [[longitude, latitude], [longitude, latitude]]

class Item(BaseModel):
    item_id: str
    item_name: str
    item_type: str
    item_description: str
    item_amount: str
    location: Union[GeoJSONPoint, GeoJSONLineString]
    city: str
    country: str
    operational_status: str
    ownership: str
    item_provider: str
    deployment_type: str
    cross_connect: str
    colocation: str
    user_defined_metadata: dict[str, str]
    transmission_equipment: str
    band: str
    teleport: str
    antenna: str
    accessories: str
    visibility: bool

class UpdatedItem(BaseModel):
    item_id: Optional[str] = None
    item_name: Optional[str] = None
    item_type: Optional[str] = None
    item_description: Optional[str] = None
    item_amount: Optional[str] = None
    location: Optional[Union[GeoJSONPoint, GeoJSONLineString]] = None
    city: Optional[str] = None
    country: Optional[str] = None
    operational_status: Optional[str] = None
    ownership: Optional[str] = None
    item_provider: Optional[str] = None
    deployment_type: Optional[str] = None
    cross_connect: Optional[str] = None
    colocation: Optional[str] = None
    user_defined_metadata: Optional[dict[str, str]] = None
    transmission_equipment: Optional[str] = None
    band: Optional[str] = None
    teleport: Optional[str] = None
    antenna: Optional[str] = None
    accessories: Optional[str] = None
    visibility: Optional[bool] = None

class School(BaseModel):
    school_id: str
    school_name: str
    location: Union[GeoJSONPoint, GeoJSONLineString]

class UpdatedSchool(BaseModel):
    school_id: Optional[str] = None
    school_name: Optional[str] = None
    location: Optional[Union[GeoJSONPoint, GeoJSONLineString]] = None

