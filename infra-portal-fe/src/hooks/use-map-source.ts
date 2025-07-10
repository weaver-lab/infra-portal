import { MapSource } from "@/types/fe-bff/map/map-source";
import { useBffQuery } from "./use-bff-query";

const defaultMapSource = {
  points: [],
  lines: [],
};

const url = "/map/infrastructure-assets";

export const useMapSource = () => {
  const { data, isError, isLoading } = useBffQuery<MapSource>(
    defaultMapSource,
    [url],
    url
  );
  return {
    mapSource: data,
    isError,
    isLoading,
  };
};
