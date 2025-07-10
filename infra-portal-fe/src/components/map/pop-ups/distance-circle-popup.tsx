import mapboxgl from "mapbox-gl";
import { getMap } from "../map-singleton";
import { getRenderedCustomElement } from "../utils/get-rendered-custom-element";
import { useMeasuringStore } from "@/state/zustand/use-measuring-store";
import { useEffect } from "react";

let popup: mapboxgl.Popup | null = null;
let container: HTMLDivElement;

const CIRCLE_COLOR = "#0F62FE";

const DistanceMeasureComponent = () => {
  const { distanceInPixels, distanceInKM, startPoint, getShouldShow } =
    useMeasuringStore();
  const diameter = distanceInPixels * 2;

  useEffect(() => {
    startPoint && popup?.setLngLat(startPoint);
  }, [startPoint, popup]);
  if (!getShouldShow() || distanceInPixels <= 0) return null;
  return (
    <div className="pointer-events-none">
      <svg
        style={{
          top: -distanceInPixels,
          left: -distanceInPixels,
        }}
        className="absolute"
        width={diameter}
        height={diameter}
        viewBox={`-1 -1 ${diameter + 2} ${diameter + 2}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx={distanceInPixels}
          cy={distanceInPixels}
          r={distanceInPixels - 1}
          stroke={CIRCLE_COLOR}
          strokeWidth="3"
        />
        <circle
          cx={distanceInPixels}
          cy={distanceInPixels}
          r="7"
          stroke={CIRCLE_COLOR}
          strokeWidth="3"
        />
      </svg>
      <div
        className="flex justify-center items-center absolute w-[60px] h-[18px]  text-white font-ibm font-normal text-[12px] leading-[16px] tracking-[0.32px] bg-[#0F62FE] rounded-full"
        style={{
          top: distanceInPixels - 12,
          left: -30,
        }}
      >
        {distanceInKM} km
      </div>
    </div>
  );
};

export const addDistanceCirclePopup = (defaultLongLat: [number, number]) => {
  popup = new mapboxgl.Popup({
    offset: 0,
    closeButton: false,
    className: "my-popup",
    closeOnClick: false,
  })
    .setLngLat(defaultLongLat)
    .addTo(getMap());

  container = getRenderedCustomElement(<DistanceMeasureComponent />);
  popup.setDOMContent(container);
};
