import mapboxgl, { PopupOptions } from "mapbox-gl";
import { getRenderedCustomElement } from "../utils/get-rendered-custom-element";

let popup: mapboxgl.Popup | null = null;
let container: HTMLDivElement;

type PopupComponentProps = {
  siteName: string;
};

const PopupComponent = ({ siteName }: PopupComponentProps) => {
  return (
    <span className="bg-[#D0E2FF] text-[#0043CE] px-4 py-2 rounded-full text-sm font-medium">
      {siteName}
    </span>
  );
};

export const addSiteNamePopup = (
  map: mapboxgl.Map,
  defaultLongLat: [number, number],
  siteName: string | null
) => {
  if (!siteName) return;

  const options: PopupOptions = {};
  // Show loading popup
  popup = new mapboxgl.Popup({
    offset: 15,
    closeButton: false,
    className: "my-popup",
    closeOnClick: false,
  })
    .setLngLat(defaultLongLat)
    .addTo(map);

  container = getRenderedCustomElement(<PopupComponent siteName={siteName} />);
  popup.setDOMContent(container);
};
