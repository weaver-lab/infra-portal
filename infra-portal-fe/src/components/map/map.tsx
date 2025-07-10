"use client";

import { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMapSource } from "@/hooks/use-map-source";

import { useQueryParams } from "@/hooks/use-query-params";
import { useFilterViewStore } from "@/state/zustand/use-filter-view-store";
import { applyFilters } from "./utils/filtering";
import { getMap, initialiseMap } from "./map-singleton";

export const Map = () => {
  const { mapSource, isError, isLoading } = useMapSource();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const { long, lat, zoom, siteName } = useQueryParams();
  const { assetTypeFilters } = useFilterViewStore();

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (isError) return;
    if (isLoading) return;

    initialiseMap(
      mapContainerRef.current,
      long,
      lat,
      zoom,
      mapSource,
      siteName
    );
    return () => {
      mapContainerRef.current?.remove();
    };
  }, [mapContainerRef.current, mapSource, isError, isLoading, siteName]);

  /**
   * If filters are ever saved, we will need to apply them upon map instantiation
   */
  useEffect(() => {
    if (!getMap()) return;
    applyFilters(getMap(), mapSource, assetTypeFilters);
  }, [mapSource, assetTypeFilters]);

  return (
    <div ref={mapContainerRef} className="w-full h-full rounded-md shadow-md" />
  );
};
