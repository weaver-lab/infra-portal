import { Close } from "@carbon/icons-react";
import { TITLE_STYLE } from "../style-constants";
import { HeaderContainer } from "../top-panel/views/header-container";
import { useEffect, useState } from "react";
import { FilterButton } from "@/components/shared/filter-button";
import { InfrastructureAssetTypeLabels } from "@/config/infrastructure-asset-types";
import {
  getAddAssetTypeFilter,
  getRemoveAssetTypeFilters,
} from "@/utils/filter-state";
import {
  InfrastructureItemFilterType,
  useFilterViewStore,
} from "@/state/zustand/use-filter-view-store";

type CloseFilterPopupButtonProps = {
  closeClicked: () => void;
};

export const CloseFilterPopupButton = ({
  closeClicked,
}: CloseFilterPopupButtonProps) => {
  return <Close onClick={closeClicked} className="cursor-pointer" size="24" />;
};

const config: InfrastructureItemFilterType[][] = [
  ["all"],
  ["Network Route", "Fibre route"],
  [
    "Node",
    "POP",
    "GPON Fiber Access Terminal",
    "Fiber Switch",
    "IXP",
    "Data Center",
    "Antenna",
    "Radio Access Node",
    "MSAN (Multi-Service Access Node)",
    "DWDM (Dense Wavelength Division Multiplexing) transmission equipment",
  ],
  ["Tower/LTE", "Pole", "Pylon"],
  ["Satellite", "VSAT"],
  ["Ducting", "Trenches", "Air conditioning"],
];

type SectionProps = {
  config: InfrastructureItemFilterType[];
  filterButtonClicked: (id: InfrastructureItemFilterType) => void;
  assetTypeFilters: Set<InfrastructureItemFilterType>;
};

const Section = ({
  config,
  filterButtonClicked,
  assetTypeFilters,
}: SectionProps) => {
  return (
    <div className="w-full flex flex-wrap gap-1">
      {config.map((id: InfrastructureItemFilterType) => (
        <FilterButton
          id={id}
          label={InfrastructureAssetTypeLabels[id]}
          hilited={assetTypeFilters.has(id)}
          filterButtonClicked={filterButtonClicked}
        />
      ))}
    </div>
  );
};

const textStyle =
  "font-ibm text-sm font-normal leading-[18px] tracking-[0.16px]";

export const FilterPopUp = () => {
  const {
    showFilterPopup,
    setShowFilterPopup,
    assetTypeFilters,
    setAssetTypeFilters,
  } = useFilterViewStore();

  const [localFilterState, setLocalFilterState] =
    useState<Set<InfrastructureItemFilterType> | null>(null);

  useEffect(() => {
    setLocalFilterState(assetTypeFilters);
  }, [assetTypeFilters]);

  const closeClicked = () => setShowFilterPopup(false);

  const reset = () => setLocalFilterState(assetTypeFilters);

  const showResults = () => {
    setAssetTypeFilters(localFilterState as Set<InfrastructureItemFilterType>);
    closeClicked();
  };

  const filterButtonClicked = (id: InfrastructureItemFilterType) => {
    if (id === "all") {
      setLocalFilterState(new Set(["all" as InfrastructureItemFilterType]));
      return;
    }
    if ((localFilterState as Set<InfrastructureItemFilterType>).has(id)) {
      setLocalFilterState(
        getRemoveAssetTypeFilters(
          id,
          localFilterState as Set<InfrastructureItemFilterType>
        ).assetTypeFilters
      );
      return;
    }
    setLocalFilterState(
      getAddAssetTypeFilter(
        id,
        localFilterState as Set<InfrastructureItemFilterType>
      ).assetTypeFilters
    );
  };

  if (!showFilterPopup) {
    return null;
  }

  return (
    <div
      className={`flex flex-col justify-between bg-white rounded-[8px] border border-custom-gray pointer-events-auto w-[608px] h-[678px]`}
    >
      <HeaderContainer>
        <div className={TITLE_STYLE}>Filter</div>
        <CloseFilterPopupButton closeClicked={closeClicked} />
      </HeaderContainer>
      <div className="p-4 flex flex-col gap-6 h-full w-full overflow-y-auto">
        {config.map((arr) => (
          <Section
            config={arr}
            filterButtonClicked={filterButtonClicked}
            assetTypeFilters={
              localFilterState as Set<InfrastructureItemFilterType>
            }
          />
        ))}
      </div>
      <div className="flex flex-row h-[54px] w-full items-center border-t border-custom-gray justify-between">
        <div
          className={`px-4 w-1/2 ${textStyle} text-[#0F62FE] cursor-pointer`}
          onClick={reset}
        >
          Reset all filters
        </div>

        <div
          className={`flex items-center text-[#ffffff] ${textStyle} px-4 w-1/2 h-full bg-[#0F62FE] cursor-pointer`}
          onClick={showResults}
        >
          Show results
        </div>
      </div>
    </div>
  );
};
