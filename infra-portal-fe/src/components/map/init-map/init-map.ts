import { MapSource } from "@/types/fe-bff/map/map-source";
import { addSource } from "./add-source";
import { addLayers } from "./add-layers";
import { addEvents } from "./add-interactivity";
import { loadImages } from "./load-images";
import { addSiteNamePopup } from "../pop-ups/site-name-pop-up";
import { addDistanceCirclePopup } from "../pop-ups/distance-circle-popup";

const init =
  (
    map: mapboxgl.Map,
    mapSource: MapSource,
    defaultLongLat: [number, number],
    siteName: string | null
  ) =>
  () => {
    addSource(map, mapSource, defaultLongLat);
    addLayers(map);
    addEvents(map);
    addSiteNamePopup(map, defaultLongLat, siteName);
    addDistanceCirclePopup(defaultLongLat);
  };

export const initMap =
  (
    map: mapboxgl.Map,
    mapSource: MapSource,
    defaultLongLat: [number, number],
    siteName: string | null
  ) =>
  () => {
    loadImages(map, init(map, mapSource, defaultLongLat, siteName));
  };
