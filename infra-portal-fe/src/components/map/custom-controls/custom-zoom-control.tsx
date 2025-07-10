// CustomZoomControl.tsx
import { ControlPosition, IControl, Map } from "mapbox-gl";
import ReactDOM from "react-dom/client";
import React from "react";
import { getRenderedCustomElement } from "../utils/get-rendered-custom-element";

interface Props {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const CustomZoomControl: React.FC<Props> = ({ onZoomIn, onZoomOut }) => {
  return (
    <div className="bg-white w-[24px] h-[54px] rounded-full">
      <button onClick={onZoomIn}>
        <svg
          className="absolute top-[6px] left-[3px]"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="#ff0000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5625 8.4375V4.5H8.4375V8.4375H4.5V9.5625H8.4375V13.5H9.5625V9.5625H13.5V8.4375H9.5625Z"
            fill="#161616"
          />
        </svg>
      </button>
      <button onClick={onZoomOut}>
        <svg
          className="absolute bottom-[6px] left-[3px]"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5 8.4375H4.5V9.5625H13.5V8.4375Z" fill="#161616" />
        </svg>
      </button>
    </div>
  );
};

export class ReactMapboxZoomControl implements IControl {
  private container: HTMLElement | null = null;
  private map!: Map;

  onAdd(map: Map): HTMLElement {
    this.map = map;
    this.container = getRenderedCustomElement(
      <CustomZoomControl
        onZoomIn={() => map.zoomIn()}
        onZoomOut={() => map.zoomOut()}
      />,
      "mapboxgl-ctrl my-custom-zoom-ctrl"
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
