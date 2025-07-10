import mapboxgl, { LngLatLike, MapMouseEvent } from "mapbox-gl";
import { getItemDetailUrl } from "@/state/react-query/query-config";
import { useViewStore, VIEWS } from "@/state/zustand/use-view-store";
import { getRenderedCustomElement } from "../utils/get-rendered-custom-element";
import { RulerIcon } from "@/components/icons/ruler-icon";
import {
  getCoordinatesFromEvent,
  getPropertiesFromMapEvent,
} from "../utils/get-properties-from-map-event";
import { useMeasuringStore } from "@/state/zustand/use-measuring-store";

let popup: mapboxgl.Popup | null = null;
let container: HTMLDivElement;

type PopupComponentProps = {
  data: { id: string; name: string };
  viewFull: (id: string) => void;
  coordinates: LngLatLike;
};

const PopupComponent = ({
  data,
  viewFull,
  coordinates,
}: PopupComponentProps) => {
  const { id, name } = data;
  const { startDrawing, setStartPoint, mouseGeoPos, setEndPoint } =
    useMeasuringStore();
  const onMeasureClick = () => {
    setStartPoint(null);
    startDrawing(Object.values(coordinates) as [number, number]);
    setEndPoint(mouseGeoPos);
  };

  return (
    <div className="flex flex-col gap-2 bg-white rounded-lg shadow-md p-[10px] pb-[15px]">
      <div className="flex flex-row justify-between gap-4">
        <span className="font-ibm font-semibold text-base leading-[22px] tracking-[0px] max-w-[200px]">
          {name}
        </span>
        <div
          className="flex flex-row w-[80px] h-5 gap-2 items-center justify-end text-blue-600 cursor-pointer"
          onClick={() => onMeasureClick()}
        >
          <span className="font-normal text-[14px] leading-[18px] tracking-[0.16px]">
            Measure
          </span>
          <RulerIcon />
        </div>
      </div>
      <a
        role="button"
        onClick={() => {
          viewFull(id);
        }}
        className="text-blue-600 hover:underline cursor-pointer"
      >
        View full asset info
      </a>
    </div>
  );
};

const PopupSchoolComponent = ({
  data,
  viewFull,
  coordinates,
}: PopupComponentProps) => {
  const { id, name } = data;
  const { startDrawing, setStartPoint, mouseGeoPos, setEndPoint } =
    useMeasuringStore();
  const onMeasureClick = () => {
    setStartPoint(null);
    startDrawing(Object.values(coordinates) as [number, number]);
    setEndPoint(mouseGeoPos);
  };

  return (
    <div className="flex flex-col gap-2 bg-white rounded-lg shadow-md p-[10px] pb-[15px]">
      <div className="flex flex-row justify-between gap-4">
        <span className="font-ibm font-semibold text-base leading-[22px] tracking-[0px] max-w-[200px]">
          {name}
        </span>
        <div
          className="flex flex-row w-[80px] h-5 gap-2 items-center justify-end text-blue-600 cursor-pointer"
          onClick={() => onMeasureClick()}
        >
          <span className="font-normal text-[14px] leading-[18px] tracking-[0.16px]">
            Measure
          </span>
          <RulerIcon />
        </div>
      </div>
    </div>
  );
};

export const detailPopup = async (map: mapboxgl.Map, event: MapMouseEvent) => {
  closeDetailPopup();
  const coordinates = getCoordinatesFromEvent(event);
  const properties = getPropertiesFromMapEvent(event);
  const { id, name } = properties;
  if (!id) return;

  // Show loading popup
  popup = new mapboxgl.Popup({
    offset: 15,
    closeButton: false,
    className: "my-popup",
    closeOnClick: false,
  })
    .setLngLat(coordinates)
    .addTo(map);
  // Force layout recalculation
  map.panBy([0, 0]);
  const url = getItemDetailUrl(id);
  const { setView, setSelectedItemId } = useViewStore.getState();
  const viewFull = (id: string) => {
    setView(VIEWS.ASSET_DETAIL);
    setSelectedItemId(id);
  };
  container = getRenderedCustomElement(
    <PopupComponent
      data={{ id, name }}
      viewFull={viewFull}
      coordinates={coordinates}
    />
  );
  popup.setDOMContent(container);
};

export const detailSchoolPopup = async (map: mapboxgl.Map, event: MapMouseEvent) => {
  closeDetailPopup();
  const coordinates = getCoordinatesFromEvent(event);
  const properties = getPropertiesFromMapEvent(event);
  const { id, name } = properties;
  if (!id) return;

  // Show loading popup
  popup = new mapboxgl.Popup({
    offset: 15,
    closeButton: false,
    className: "my-popup",
    closeOnClick: false,
  })
    .setLngLat(coordinates)
    .addTo(map);
  // Force layout recalculation
  map.panBy([0, 0]);
  const url = getItemDetailUrl(id);
  const { setView, setSelectedItemId } = useViewStore.getState();
  const viewFull = (id: string) => {
    setView(VIEWS.ASSET_DETAIL);
    setSelectedItemId(id);
  };
  container = getRenderedCustomElement(
    <PopupSchoolComponent
      data={{ id, name }}
      viewFull={viewFull}
      coordinates={coordinates}
    />
  );
  popup.setDOMContent(container);
};

export const closeDetailPopup = async () => {
  if (popup) {
    popup.remove();
    popup = null;
    container?.remove();
  }
};
