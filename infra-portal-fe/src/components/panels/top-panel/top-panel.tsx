import { PANEL_STYLE } from "../style-constants";
import { VIEWS, useViewStore } from "@/state/zustand/use-view-store";
import { ListView } from "./views/list-view";
import { AssetDetailView } from "./views/asset-detail-view";

const resolveView = {
  [VIEWS.DEFAULT_LIST]: <ListView />,
  [VIEWS.ASSET_DETAIL]: <AssetDetailView />,
};

export const TopPanel = () => {
  const { view } = useViewStore();

  return <div className={`${PANEL_STYLE} h-[600px]`}>{resolveView[view]}</div>;
};
