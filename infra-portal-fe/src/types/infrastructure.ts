import { InfrastructureAssetTypeLabels } from "@/config/infrastructure-asset-types";
import { GeoJSONPoint, GeoJSONLineString } from "@/types/geo";

export type InfrastructureItemType = keyof typeof InfrastructureAssetTypeLabels;
export type InfrastructureItemTypeLabel =
  (typeof InfrastructureAssetTypeLabels)[keyof typeof InfrastructureAssetTypeLabels];

// Asset type definition
export type InfrastructureAsset = {
  item_id: string;
  item_name: string;
  item_type: InfrastructureItemType;
  item_description: string;
  item_amount: number;
  location: GeoJSONPoint | GeoJSONLineString;
  city: string;
  country: string;
  operational_status: string;
  ownership: string;
  item_provider: string;
  deployment_type: string;
  cross_connect: string;
  colocation: string;
  transmission_equipment: string;
  band: string;
  teleport: string;
  antenna: string;
  accessories: string;
  visibility: boolean;
  submitter_id: string;
  submitter_name: string;
  creation_date: string;
  user_defined_metadata: Record<string, string>;
};
