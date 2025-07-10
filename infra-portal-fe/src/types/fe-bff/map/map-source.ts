import { GeoJSONLineString, GeoJSONPoint } from "@/types/geo";
import { InfrastructureItemType } from "@/types/infrastructure";

export type MapfeatureInfrastructureProperties = {
  id: string;
  name: string;
  type: InfrastructureItemType;
};

export type MapfeatureSchoolProperties = {
  id: string;
  name: string;
};

export type SchoolPoint = {
  type: "Feature";
  geometry: GeoJSONPoint;
  properties: MapfeatureSchoolProperties;
};

export type MapPoint = {
  type: "Feature";
  geometry: GeoJSONPoint;
  properties: MapfeatureInfrastructureProperties;
};

export type MapLineString = {
  type: "Feature";
  geometry: GeoJSONLineString;
  properties: MapfeatureInfrastructureProperties;
};

export type MapSource = {
  schools: SchoolPoint[];
  points: MapPoint[];
  lines: MapLineString[];
};
