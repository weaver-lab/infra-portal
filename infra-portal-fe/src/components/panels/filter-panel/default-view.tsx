import { ViewConfig } from "./types";
import { Filter } from "@carbon/icons-react";
import { FilterButton } from "@/components/shared/filter-button";
import {
  InfrastructureItemFilterType,
  useFilterViewStore,
} from "@/state/zustand/use-filter-view-store";

const viewConfig: ViewConfig[] = [
  { id: "all", label: "All asset types" },
  { id: "Fibre route", label: "Fibre route" },
  { id: "Tower/LTE", label: "Tower/LTE" },
];

export const DefaultView = () => {
  const { showFilterPopup, setShowFilterPopup } = useFilterViewStore();
  const {
    assetTypeFilters,
    addAssetTypeFilter,
    removeAssetTypeFilter,
    removeAllAssetTypeFilters,
  } = useFilterViewStore();

  const filterButtonClicked = (id: InfrastructureItemFilterType) => {
    if (id === "all") {
      removeAllAssetTypeFilters();
      return;
    }
    if (assetTypeFilters.has(id)) {
      removeAssetTypeFilter(id);
      return;
    }
    addAssetTypeFilter(id);
  };
  return (
    <div className="flex flex-row items-center gap-1 h-full p-2">
      {viewConfig.map((item) => (
        <FilterButton
          id={item.id}
          key={item.id}
          label={item.label}
          hilited={assetTypeFilters.has(item.id)}
          filterButtonClicked={filterButtonClicked}
        />
      ))}
      <Filter
        className="cursor-pointer"
        onClick={() => setShowFilterPopup(!showFilterPopup)}
      />
    </div>
  );
};
