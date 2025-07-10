import { getBffResponse } from "@/app/api/utils";
import items from "@/app/api/mock/generation/data.json";
import { InfrastructureAsset } from "@/types/infrastructure";
import {
  MapLineString,
  MapPoint,
  MapSource,
} from "@/types/fe-bff/map/map-source";
import { GeoJSONLineString, GeoJSONPoint } from "@/types/geo";
import { LineStylesConfig } from "@/config/line-styles";

const filterPoints = (infrastructureAsset: InfrastructureAsset) =>
  infrastructureAsset.location.type === "Point";
const filterLines = (infrastructureAsset: InfrastructureAsset) =>
  infrastructureAsset.location.type === "LineString";

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
  const mapSource: MapSource = {
    schools: (items as unknown as InfrastructureAsset[])
      .filter(filterPoints)
      .map(mapPoints),
    points: (items as unknown as InfrastructureAsset[])
      .filter(filterPoints)
      .map(mapPoints),
    lines: (items as unknown as InfrastructureAsset[])
      .filter(filterLines)
      .map(mapLines),
  };
  return getBffResponse(mapSource);
}
