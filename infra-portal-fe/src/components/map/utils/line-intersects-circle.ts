import { point, lineString, booleanIntersects, buffer } from "@turf/turf";
import type {
  Feature,
  LineString as GeoJSONLineString,
  Point as GeoJSONPoint,
} from "geojson";

/**
 * Checks if a GeoJSON LineString intersects with a circle drawn around a point.
 *
 * @param line - A GeoJSON LineString feature or geometry.
 * @param center - A GeoJSON Point feature or geometry.
 * @param radiusMeters - Radius of the circle in meters.
 * @returns True if the line intersects the circle, false otherwise.
 */
export function lineIntersectsCircle(
  line: Feature<GeoJSONLineString> | GeoJSONLineString,
  center: Feature<GeoJSONPoint> | GeoJSONPoint,
  radiusMeters: number
): boolean {
  const centerPoint =
    "geometry" in center
      ? point(center.geometry.coordinates)
      : point(center.coordinates);
  const lineFeature = "geometry" in line ? line : lineString(line.coordinates);

  const circle = buffer(centerPoint, radiusMeters, { units: "kilometers" });

  return circle ? booleanIntersects(lineFeature, circle) : false;
}
