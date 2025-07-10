/**
 * This is for items like popups and map controls where we need to wrap react
 * components in a dom element before adding them to the map
 */

import ReactDOM from "react-dom/client";

export const getRenderedCustomElement = (
  component: React.ReactNode,
  classNames: string = ""
) => {
  const container = document.createElement("div");
  container.className = classNames;

  const root = ReactDOM.createRoot(container);
  root.render(component);
  return container;
};
