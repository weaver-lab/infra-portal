import {
  InfrastructureItemFilterType,
  useFilterViewStore,
} from "@/state/zustand/use-filter-view-store";
import { useBffQuery } from "./use-bff-query";
import { ListItem } from "@/types/fe-bff/list/list-item";
import { useMeasuringStore } from "@/state/zustand/use-measuring-store";
import { lineIntersectsCircle } from "@/components/map/utils/line-intersects-circle";
import { haversineDistance } from "@/utils/haversine-distance";

const defaultList: ListItem[] = [];

const url = "/list/infrastructure-assets";

const insideDistanceFilter =
  (startPoint: [number, number], distanceInK: number) =>
  (listItem: ListItem) => {
    const { geometry } = listItem;
    const { type } = geometry;
    if (type === "LineString") {
      return lineIntersectsCircle(
        geometry,
        { type: "Point", coordinates: startPoint },
        distanceInK
      );
    }
    return haversineDistance(startPoint, geometry.coordinates) <= distanceInK;
  };

const outsideDistanceFilter =
  (startPoint: [number, number], distanceInK: number) =>
  (listItem: ListItem) => {
    const { geometry } = listItem;
    const { type } = geometry;
    if (type === "LineString") {
      return !lineIntersectsCircle(
        geometry,
        { type: "Point", coordinates: startPoint },
        distanceInK
      );
    }
    return haversineDistance(startPoint, geometry.coordinates) > distanceInK;
  };

const applyFilter =
  (assetTypeFilters: Set<InfrastructureItemFilterType>) =>
  (listItem: ListItem) => {
    const assetTypeFilterArray = Array.from(assetTypeFilters);
    if (assetTypeFilterArray[0] === "all") return listItem;
    return assetTypeFilterArray.indexOf(listItem.type) > -1;
  };

export const useList = () => {
  const { startPoint, distanceInKM, getShouldShow } = useMeasuringStore();
  const { assetTypeFilters } = useFilterViewStore();
  const { data, isError, isLoading } = useBffQuery<ListItem[]>(
    defaultList,
    [url],
    url
  );
  const shouldShow = getShouldShow();
  const filteredList = data.filter(applyFilter(assetTypeFilters));

  const listOfItemsInMeasuredRange = shouldShow
    ? filteredList.filter(
        insideDistanceFilter(startPoint as [number, number], distanceInKM)
      )
    : [];

  const list = shouldShow
    ? filteredList.filter(
        outsideDistanceFilter(startPoint as [number, number], distanceInKM)
      )
    : filteredList;
  return {
    listOfItemsInMeasuredRange,
    list,
    isError,
    isLoading,
  };
};
