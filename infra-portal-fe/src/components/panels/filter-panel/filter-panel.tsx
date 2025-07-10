import { PANEL_STYLE } from "../style-constants";
import { DefaultView } from "./default-view";

export const FilterPanel = () => {
  return (
    <div className={`${PANEL_STYLE} h-[70px]`}>
      <DefaultView />
    </div>
  );
};
