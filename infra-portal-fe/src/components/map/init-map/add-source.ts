import { MapSource } from "@/types/fe-bff/map/map-source";

export const addSource = (
  map: mapboxgl.Map,
  mapSource: MapSource,
  defaultLongLat: [number, number]
) => {
  if (!map.getSource("school-source")) {
    map.addSource("school-source", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: mapSource.schools,
      },
    });
  }
  if (!map.getSource("points-source")) {
    map.addSource("points-source", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: mapSource.points,
      },
    });
  }

  if (!map.getSource("lines-source")) {
    map.addSource("lines-source", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: mapSource.lines,
      },
    });
  }

  if (!map.getSource("distance-circle-source")) {
    map.addSource("distance-line-source", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: defaultLongLat,
        },
        properties: {},
      },
    });
  }
};
