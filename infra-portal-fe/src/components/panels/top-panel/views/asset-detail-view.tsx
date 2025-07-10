import { ViewContainer } from "./view-container";
import { HeaderContainer } from "./header-container";
import { CloseViewButton } from "./close-view-button";
import { TITLE_STYLE } from "../../style-constants";
import { useItemDetail } from "@/hooks/use-item-detail";
import { ScrollContainer } from "./scroll-container";

const Row = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row font-open-sans font-normal text-[12px] leading-[24px] tracking-[0px] gap-2">
      <div className="pt-1" style={{ flexShrink: 0 }}>
        <img src="/icons/hash.svg" alt="icon" width={16} height={16} />
      </div>
      {children}
    </div>
  );
};

const SEPARATOR = " : ";

export const AssetDetailView = () => {
  const { item, isError, isLoading } = useItemDetail();
  if (isError || isLoading) {
    return null;
  }
  return (
    <ViewContainer>
      <HeaderContainer>
        <div className={TITLE_STYLE}>{item.item_name}</div>
        <CloseViewButton />
      </HeaderContainer>
      <ScrollContainer>
        <div className="p-4 flex flex-col gap-2">
          <div className="font-ibm font-semibold text-[14px] leading-[18px] tracking-[0.16px]">
            Asset Detail
          </div>
          <Row>{item.item_type}</Row>
          <Row>{item.item_description}</Row>
          <Row>
            Amount{SEPARATOR}
            {item.item_amount}
          </Row>
          <Row>{item.city}</Row>
          <Row>{item.operational_status}</Row>
          <Row>
            Ownership{SEPARATOR}
            {item.ownership}
          </Row>
          <Row>
            Provider id{SEPARATOR}
            {item.item_provider}
          </Row>
          <Row>
            Provider{SEPARATOR}
            {item.item_provider}
          </Row>
          <Row>
            Deployment type
            {SEPARATOR}
            {item.deployment_type}
          </Row>
          <Row>
            Cross_connect
            {SEPARATOR}
            {item.cross_connect}
          </Row>
          <Row>
            Colocation
            {SEPARATOR}
            {item.colocation}
          </Row>
          <Row>
            Transmission Equipment
            {SEPARATOR}
            {item.transmission_equipment}
          </Row>
          <Row>
            Band
            {SEPARATOR}
            {item.band}
          </Row>
          <Row>
            Teleport
            {SEPARATOR}
            {item.teleport}
          </Row>
          <Row>
            Antenna
            {SEPARATOR}
            {item.antenna}
          </Row>
          <Row>
            Accessories
            {SEPARATOR}
            {item.accessories}
          </Row>
          <Row>
            Visibility
            {SEPARATOR}
            {item.visibility}
          </Row>
          <Row>
            Submitter
            {SEPARATOR}
            {item.submitter_name}
          </Row>
          <Row>
            Created
            {SEPARATOR}
            {item.creation_date}
          </Row>
          {Object.keys(item.user_defined_metadata).map((key) => (
            <Row>
              {key}
              {SEPARATOR}
              {item.user_defined_metadata[key]}
            </Row>
          ))}
        </div>
      </ScrollContainer>
    </ViewContainer>
  );
};
