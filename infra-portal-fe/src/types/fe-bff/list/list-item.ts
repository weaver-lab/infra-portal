import { GeoJSONLineString, GeoJSONPoint } from "@/types/geo";
import { InfrastructureItemType } from "@/types/infrastructure";

export type ListItem = {
  id: string;
  name: string;
  description: string;
  type: InfrastructureItemType;
  geometry: GeoJSONPoint | GeoJSONLineString;
};
