import { getBffResponse } from "@/app/api/utils";
import { InfrastructureAsset } from "@/types/infrastructure";
import { School } from "@/types/school";
import {
  MapLineString,
  MapPoint,
  MapSource,
  SchoolPoint
}
from "@/types/fe-bff/map/map-source";
import { GeoJSONLineString, GeoJSONPoint } from "@/types/geo";
import { LineStylesConfig } from "@/config/line-styles";

const filterSchools = (school: School) =>
  school.location.type === "Point";
const filterPoints = (infrastructureAsset: InfrastructureAsset) =>
  infrastructureAsset.location.type === "Point";
const filterLines = (infrastructureAsset: InfrastructureAsset) =>
  infrastructureAsset.location.type === "LineString";

const schoolPoints = (school: School): SchoolPoint => {
  return {
    type: "Feature",
    geometry: school.location as GeoJSONPoint,
    properties: {
      id: school.school_id,
      name: school.school_name,
    },
  };
};

const mapPoints = (infrastructureAsset: InfrastructureAsset): MapPoint => {
  return {
    type: "Feature",
    geometry: infrastructureAsset.location as GeoJSONPoint,
    properties: {
      id: infrastructureAsset.item_id,
      name: infrastructureAsset.item_name,
      type: infrastructureAsset.item_type,
    },
  };
};

const mapLines = (infrastructureAsset: InfrastructureAsset): MapLineString => {
  const { item_id, item_name, item_type } = infrastructureAsset;
  return {
    type: "Feature",
    geometry: infrastructureAsset.location as GeoJSONLineString,
    properties: {
      id: item_id,
      name: item_name,
      type: item_type,
      ...LineStylesConfig[item_type],
    },
  };
};

export async function GET() {
  const itemResponse = await fetch(`${process.env.API_HOST}` + "/ida/api/v1/items/", { next: { revalidate: 10 } });
  const items = await itemResponse.json();

  const schoolResponse = await fetch(`${process.env.API_HOST}` + "/ida/api/v1/schools/", { next: { revalidate: 10 } });
  const schools = await schoolResponse.json();

  const mapSource: MapSource = {
    schools: (schools as unknown as School[])
      .filter(filterSchools)
      .map(schoolPoints),
    points: (items as unknown as InfrastructureAsset[])
      .filter(filterPoints)
      .map(mapPoints),
    lines: (items as unknown as InfrastructureAsset[])
      .filter(filterLines)
      .map(mapLines),
  };
  return getBffResponse(mapSource);
}
export const dynamic = "force-dynamic";