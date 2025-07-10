import { haversineDistance } from "@/utils/haversine-distance";
import { getPixelDistance } from "@/utils/pixel-distance";
import { create } from "zustand";
import { LngLat } from "./types";

// Enum for view states
export enum MEASURING_MODE {
  OFF = "OFF",
  ACTIVE = "ACTIVE",
  DRAWING = "DRAWING",
  DRAWN = "DRAWN",
}

type Store = {
  mode: MEASURING_MODE;
  setMode: (mode: MEASURING_MODE) => void;
  startPoint: LngLat | null;
  endPoint: LngLat | null;
  setStartPoint: (lngLat: LngLat | null) => void;
  setEndPoint: (lngLat: LngLat) => void;
  getShouldShowRulerCursor: () => boolean;
  getShouldShow: () => boolean;
  startDrawing: (startPoint: LngLat) => void;
  stopDrawing: (startPoint: LngLat) => void;
  distanceInKM: number;
  distanceInPixels: number;
  recalc: () => void;
  mouseGeoPos: [number, number];
  setMouseGeoPos: (mouseGeoPos: [number, number]) => void;
};

export const useMeasuringStore = create<Store>((set, get) => ({
  mode: MEASURING_MODE.OFF,
  mouseGeoPos: [0, 0],
  setMouseGeoPos: (mouseGeoPos) => set({ mouseGeoPos }),
  distanceInKM: 0,
  distanceInPixels: 0,
  setMode: (mode) => set({ mode }),
  setStartPoint: (startPoint) => set({ startPoint }),
  startPoint: null,
  endPoint: null,
  setEndPoint: (endPoint) => {
    const startPoint = get().startPoint;
    if (!startPoint) {
      return set({ endPoint });
    }
    return set({
      endPoint,
      distanceInKM: Math.round(
        haversineDistance(
          startPoint as [number, number],
          endPoint as [number, number]
        )
      ),
      distanceInPixels: getPixelDistance(
        startPoint as [number, number],
        endPoint as [number, number]
      ),
    });
  },
  getShouldShowRulerCursor: () => {
    return (
      get().mode === MEASURING_MODE.ACTIVE ||
      get().mode === MEASURING_MODE.DRAWING
    );
  },
  getShouldShow: () => {
    return (
      get().mode === MEASURING_MODE.DRAWING ||
      get().mode === MEASURING_MODE.DRAWN
    );
  },
  startDrawing: (startPoint: LngLat) => {
    if (get().startPoint === null) {
      return set({
        startPoint,
        mode: MEASURING_MODE.DRAWING,
      });
    }
    return set({
      mode: MEASURING_MODE.DRAWING,
    });
  },
  stopDrawing: (endPoint: LngLat) => {
    get().setEndPoint(endPoint);
    return set({ mode: MEASURING_MODE.DRAWN });
  },
  recalc: () => {
    if (get().getShouldShow()) {
      get().setEndPoint(get().endPoint as LngLat);
    }
  },
}));

export const getMeasuringState = () => useMeasuringStore.getState();
