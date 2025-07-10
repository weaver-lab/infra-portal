import { MapfeatureInfrastructureProperties } from "@/types/fe-bff/map/map-source";
import { GeoJSONPoint, GeoJSONLineString } from "@/types/geo";
import { LngLatLike, MapMouseEvent } from "mapbox-gl";

export const getPropertiesFromMapEvent = (
  mapMouseEvent: MapMouseEvent
): MapfeatureInfrastructureProperties => {
  return mapMouseEvent.features?.[0]
    .properties as MapfeatureInfrastructureProperties;
};

export const getGeometryFromEvent = (
  mapMouseEvent: MapMouseEvent
): GeoJSONPoint | GeoJSONLineString => {
  // @ts-ignore
  return mapMouseEvent.features?.[0].geometry;
};

export const getCoordinatesFromEvent = (mapMouseEvent: MapMouseEvent) => {
  console.log("mapMouseEvent", mapMouseEvent);
  const type = getGeometryTypeFromEvent(mapMouseEvent);
  const coordinates = (
    type === "Point"
      ? getGeometryFromEvent(mapMouseEvent).coordinates
      : mapMouseEvent.lngLat
  ) as LngLatLike;
  return coordinates;
};

export const getGeometryTypeFromEvent = (mapMouseEvent: MapMouseEvent) => {
  return getGeometryFromEvent(mapMouseEvent).type;
};
