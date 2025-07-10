import { useViewStore, VIEWS } from "@/state/zustand/use-view-store";
import { TITLE_STYLE } from "../../style-constants";
import { ViewContainer } from "./view-container";
import { useList } from "@/hooks/use-list";
import { HeaderContainer } from "./header-container";
import { ScrollContainer } from "./scroll-container";
import { closeDetailPopup } from "@/components/map/pop-ups/detail-pop-up";

type ListItemProps = {
  id: string;
  name: string;
  description: string;
  itemClicked: (id: string) => void;
};

const textStyle = "font-roboto leading-[22px] tracking-[0%]";

const ListItem = ({ name, description, itemClicked, id }: ListItemProps) => {
  return (
    <div
      className="flex flex-col gap-1 p-3 h-[76px] border-b border-custom-gray cursor-pointer"
      onClick={() => itemClicked(id)}
    >
      <div className={`${textStyle} font-bold text-[14px]`}>{name}</div>
      <div className={`${textStyle} font-normal text-[11px]`}>
        {description}
      </div>
    </div>
  );
};

export const ListView = () => {
  const { listOfItemsInMeasuredRange, list, isError, isLoading } = useList();
  const { setSelectedItemId, setView } = useViewStore();
  if (isError || isLoading) {
    return null;
  }
  const itemClicked = (id: string) => {
    setSelectedItemId(id);
    setView(VIEWS.ASSET_DETAIL);
    closeDetailPopup();
  };
  const numRangeItems = listOfItemsInMeasuredRange.length;
  const showRangeItems = numRangeItems > 0;
  return (
    <ViewContainer>
      <HeaderContainer>
        <span className={TITLE_STYLE}>
          {!showRangeItems && `Items (${list.length})`}
          {showRangeItems && `Items (${numRangeItems}) within range.`}
        </span>
      </HeaderContainer>
      <ScrollContainer>
        {listOfItemsInMeasuredRange.map((listItem) => (
          <ListItem {...listItem} itemClicked={itemClicked} key={listItem.id} />
        ))}

        {showRangeItems && (
          <HeaderContainer>
            <span
              className={TITLE_STYLE}
            >{`Items outside range (${list.length})`}</span>
          </HeaderContainer>
        )}
        {list.map((listItem) => (
          <ListItem {...listItem} itemClicked={itemClicked} key={listItem.id} />
        ))}
      </ScrollContainer>
    </ViewContainer>
  );
};
