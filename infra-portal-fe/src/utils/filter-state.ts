import { InfrastructureItemFilterType } from "@/state/zustand/use-filter-view-store";

export const getAddAssetTypeFilter = (
  assetTypeFilter: InfrastructureItemFilterType,
  assetTypeFilters: Set<InfrastructureItemFilterType>
) => {
  const clone = structuredClone(assetTypeFilters);
  clone.add(assetTypeFilter);
  clone.delete("all");
  return {
    assetTypeFilters: clone,
  };
};

export const getRemoveAssetTypeFilters = (
  assetTypeFilter: InfrastructureItemFilterType,
  assetTypeFilters: Set<InfrastructureItemFilterType>
) => {
  const clone = structuredClone(assetTypeFilters);
  clone.delete(assetTypeFilter);
  if (clone.size === 0) {
    clone.add("all");
  }
  return {
    assetTypeFilters: clone,
  };
};
