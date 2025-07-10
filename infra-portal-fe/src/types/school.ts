import { GeoJSONPoint, GeoJSONLineString } from "@/types/geo";


// School type definition
export type School = {
  school_id: string;
  school_name: string;
  location: GeoJSONPoint | GeoJSONLineString;
  submitter_id: string;
};
