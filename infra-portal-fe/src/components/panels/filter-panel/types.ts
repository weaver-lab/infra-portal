import { InfrastructureItemFilterType } from "@/state/zustand/use-filter-view-store";
import { InfrastructureItemTypeLabel } from "@/types/infrastructure";

export type ViewConfig = {
  id: InfrastructureItemFilterType;
  label: "All asset types" | InfrastructureItemTypeLabel;
};
