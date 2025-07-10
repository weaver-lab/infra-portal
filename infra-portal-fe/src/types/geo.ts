// GeoJSON types
export type GeoJSONPoint = {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
};

export type GeoJSONLineString = {
  type: "LineString";
  coordinates: [number, number][]; // Array of longitude-latitude pairs
};
