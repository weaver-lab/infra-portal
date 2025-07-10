"use client";
import { Map } from "@/components/map/map";
import { TopPanel } from "./panels/top-panel/top-panel";
import { FilterPanel } from "./panels/filter-panel/filter-panel";
import { FilterPopUp } from "./panels/filter-panel/filter-popup";
import { useQueryParamsStore } from "@/state/zustand/use-query-params-store";
import { useQueryParams } from "@/hooks/use-query-params";
import { useEffect, useRef } from "react";
import { getMap } from "./map/map-singleton";
import {
  MEASURING_MODE,
  useMeasuringStore,
} from "@/state/zustand/use-measuring-store";

export const Container = () => {
  const { setEndPoint, mode, setMouseGeoPos } = useMeasuringStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCountryCode } = useQueryParamsStore();
  const { countryCode } = useQueryParams();

  useEffect(() => {
    setCountryCode(countryCode as string);
  }, [setCountryCode, countryCode]);

  const updateDrawing = (event: React.MouseEvent) => {
    const map = getMap();
    if (!containerRef.current) return;
    if (!map) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const mouseLngLat = map.unproject([x, y]).toArray();
    setMouseGeoPos(mouseLngLat);
    if (mode === MEASURING_MODE.DRAWING) {
      setEndPoint(mouseLngLat);
    }
  };

  return (
    <div
      className="w-full h-full"
      onMouseMove={updateDrawing}
      ref={containerRef}
    >
      <Map />
      <div className="absolute w-full h-full top-0 left-0 pointer-events-none">
        <div className="flex flex-row pt-12 gap-3">
          <div className={`flex flex-col pl-2 w-[296px] gap-2`}>
            <TopPanel />
            <FilterPanel />
          </div>
          <FilterPopUp />
        </div>
      </div>
    </div>
  );
};
