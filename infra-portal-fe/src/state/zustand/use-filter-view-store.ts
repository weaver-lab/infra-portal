import { InfrastructureItemType } from "@/types/infrastructure";
import {
  getAddAssetTypeFilter,
  getRemoveAssetTypeFilters,
} from "@/utils/filter-state";
import { create } from "zustand";

export type InfrastructureItemFilterType = "all" | InfrastructureItemType;

// Zustand store
type Store = {
  assetTypeFilters: Set<InfrastructureItemFilterType>;
  showFilterPopup: boolean;
  setAssetTypeFilters: (
    assetTypeFilters: Set<InfrastructureItemFilterType>
  ) => void;
  addAssetTypeFilter: (assetTypeFilter: InfrastructureItemFilterType) => void;
  removeAssetTypeFilter: (
    assetTypeFilter: InfrastructureItemFilterType
  ) => void;
  removeAllAssetTypeFilters: () => void;
  setShowFilterPopup: (showFilterPopup: boolean) => void;
};

const resetSet = () => new Set(["all" as InfrastructureItemFilterType]);

export const useFilterViewStore = create<Store>((set) => ({
  assetTypeFilters: resetSet(),
  showFilterPopup: false,
  setAssetTypeFilters: (assetTypeFilters) => set({ assetTypeFilters }),
  addAssetTypeFilter: (assetTypeFilter) =>
    set((state) =>
      getAddAssetTypeFilter(assetTypeFilter, state.assetTypeFilters)
    ),
  removeAssetTypeFilter: (assetTypeFilter) =>
    set((state) =>
      getRemoveAssetTypeFilters(assetTypeFilter, state.assetTypeFilters)
    ),
  removeAllAssetTypeFilters: () => {
    set({ assetTypeFilters: resetSet() });
  },
  setShowFilterPopup: (showFilterPopup) => set({ showFilterPopup }),
}));
