import { InfrastructureItemFilterType } from "@/state/zustand/use-filter-view-store";
import {
  MapLineString,
  MapPoint,
  MapSource,
} from "@/types/fe-bff/map/map-source";

const filterMapItem = (
  mapItems: MapPoint[] | MapLineString[],
  assetTypeFilters: Set<InfrastructureItemFilterType>
) => {
  const assetTypeFilterArray = Array.from(assetTypeFilters);
  if (assetTypeFilterArray[0] === "all") {
    return mapItems;
  }
  return mapItems.filter(
    (mapItem) =>
      Array.from(assetTypeFilters).indexOf(mapItem.properties.type) > -1
  );
};

export const applyFilters = (
  map: mapboxgl.Map,
  mapSource: MapSource,
  assetTypeFilters: Set<InfrastructureItemFilterType>
) => {
  const pointsSource = map.getSource("points-source") as mapboxgl.GeoJSONSource;
  const filterMapPoints = filterMapItem(mapSource.points, assetTypeFilters);
  pointsSource?.setData({
    type: "FeatureCollection",
    features: filterMapPoints,
  });

  const linesSource = map.getSource("lines-source") as mapboxgl.GeoJSONSource;
  linesSource?.setData({
    type: "FeatureCollection",
    features: filterMapItem(mapSource.lines, assetTypeFilters),
  });
};
