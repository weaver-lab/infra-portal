import { MapSource } from "@/types/fe-bff/map/map-source";
import mapboxgl from "mapbox-gl";
import { initMap } from "./init-map/init-map";

let map: mapboxgl.Map;

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

export const initialiseMap = (
  div: HTMLDivElement,
  long: number,
  lat: number,
  zoom: number,
  mapSource: MapSource,
  siteName: string | null
) => {
  if (map) {
    throw new Error("map can only be instatiated once");
  }
  map = new mapboxgl.Map({
    container: div,
    style: "mapbox://styles/mapbox/light-v10",
    center: [long, lat],
    attributionControl: true,
    zoom,
  });
  map.on("load", initMap(map, mapSource, [long, lat], siteName));
  return map;
};

export const getMap = () => map;
