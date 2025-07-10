import { detailPopup, detailSchoolPopup } from "../pop-ups/detail-pop-up";
import { ReactMapboxZoomControl } from "../custom-controls/custom-zoom-control";
import { ReactMapboxMeasureControl } from "../custom-controls/measure-control";
import {
  getMeasuringState,
  MEASURING_MODE,
} from "@/state/zustand/use-measuring-store";
import { CUSTOM_RULER_CURSOR_STYLE } from "@/components/consts";
import { getCoordinatesFromEvent } from "../utils/get-properties-from-map-event";

export const addEvents = (map: mapboxgl.Map) => {
  map.addControl(new ReactMapboxMeasureControl(), "bottom-right");
  map.addControl(new ReactMapboxZoomControl(), "bottom-right");

  map.dragRotate.disable();
  map.touchZoomRotate.disableRotation();

  map.on("click", "schools-layer", (event) => {
    if (getMeasuringState().mode !== MEASURING_MODE.DRAWING) {
      detailSchoolPopup(map, event);
    }

    manageDrawing(getCoordinatesFromEvent(event) as [number, number]);
  });

  map.on("click", "points-layer", (event) => {
    if (getMeasuringState().mode !== MEASURING_MODE.DRAWING) {
      detailPopup(map, event);
    }

    manageDrawing(getCoordinatesFromEvent(event) as [number, number]);
  });

  map.on("click", "lines-halo-layer", (event) => {
    if (getMeasuringState().mode !== MEASURING_MODE.DRAWING) {
      detailPopup(map, event);
    }
    manageDrawing(event.lngLat.toArray());
  });

  map.on("click", (e) => {
    manageDrawingFromMap(e.lngLat);
  });

  map.on("mousedown", () => {
    if (getMeasuringState().mode === MEASURING_MODE.ACTIVE) {
      getMeasuringState().setStartPoint(null);
    }
  });

  map.on("mousemove", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["lines-halo-layer", "points-layer", "schools-layer"], // Optional filter
    });
    const { style } = map.getCanvas();

    if (features.length > 0) {
      style.cursor = "pointer";
      return;
    }
    if (getMeasuringState().getShouldShowRulerCursor()) {
      style.cursor = CUSTOM_RULER_CURSOR_STYLE;
      return;
    }
    style.cursor = "";
  });

  map.on("move", () => {
    getMeasuringState().recalc();
  });
};

const manageDrawingFromMap = (lngLat: mapboxgl.LngLat) => {
  const measuringState = getMeasuringState();
  if (measuringState.mode === MEASURING_MODE.ACTIVE) {
    measuringState.startDrawing(lngLat.toArray());
    measuringState.setEndPoint(measuringState.mouseGeoPos);
    return;
  }
  if (measuringState.mode === MEASURING_MODE.DRAWING) {
    measuringState.stopDrawing(lngLat.toArray());
  }
};

const manageDrawing = (lngLat: [number, number]) => {
  const measuringState = getMeasuringState();
  if (measuringState.mode === MEASURING_MODE.ACTIVE) {
    measuringState.setStartPoint(lngLat);
    return;
  }
  if (measuringState.mode === MEASURING_MODE.DRAWING) {
    measuringState.stopDrawing(lngLat);
  }
};
