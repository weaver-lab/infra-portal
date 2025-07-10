// CustomZoomControl.tsx
import { ControlPosition, IControl, Map } from "mapbox-gl";
import ReactDOM from "react-dom/client";
import React from "react";
import { getRenderedCustomElement } from "../utils/get-rendered-custom-element";
import { RulerIcon } from "@/components/icons/ruler-icon";
import {
  getMeasuringState,
  MEASURING_MODE,
  useMeasuringStore,
} from "@/state/zustand/use-measuring-store";
import { CUSTOM_RULER_CURSOR_STYLE } from "@/components/consts";

const CustomMeasureControl = () => {
  const { setMode, mode } = useMeasuringStore();
  const onClick = () => setMode(MEASURING_MODE.ACTIVE);
  const style = getMeasuringState().getShouldShowRulerCursor()
    ? { cursor: CUSTOM_RULER_CURSOR_STYLE }
    : {};
  return (
    <div
      className="bg-white w-[32px] h-[32px] rounded-full flex items-center justify-center cursor-pointer"
      onClick={onClick}
      style={style}
    >
      <RulerIcon />
    </div>
  );
};

export class ReactMapboxMeasureControl implements IControl {
  private container: HTMLElement | null = null;
  private map!: Map;

  onAdd(map: Map): HTMLElement {
    this.map = map;
    this.container = getRenderedCustomElement(
      <CustomMeasureControl />,
      "mapboxgl-ctrl my-custom-measure-ctrl"
    );

    return this.container;
  }

  onRemove(): void {
    if (this.container) {
      ReactDOM.createRoot(this.container).unmount();
      this.container.remove();
    }
  }

  getDefaultPosition(): ControlPosition {
    return "bottom-right";
  }
}
