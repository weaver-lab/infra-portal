import { closeDetailPopup } from "@/components/map/pop-ups/detail-pop-up";
import { useViewStore, VIEWS } from "@/state/zustand/use-view-store";
import { Close } from "@carbon/icons-react";

export const CloseViewButton = () => {
  const { setView } = useViewStore();
  const closeClicked = () => {
    setView(VIEWS.DEFAULT_LIST);
    closeDetailPopup();
  };
  return <Close onClick={closeClicked} className="cursor-pointer" size="24" />;
};
