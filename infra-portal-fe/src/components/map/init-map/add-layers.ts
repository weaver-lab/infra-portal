export const addLayers = (map: mapboxgl.Map) => {
  map.addLayer({
    id: "lines-halo-layer",
    type: "line",
    source: "lines-source",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#009900",
      "line-width": 6,
      "line-opacity": 0,
    },
  });
  map.addLayer({
    id: "lines-layer",
    type: "line",
    source: "lines-source",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": ["get", "color"],
      "line-width": 1,
      "line-dasharray": ["get", "dash"],
    },
  });

  map.addLayer({
    id: "points-layer",
    type: "symbol",
    source: "points-source",
    layout: {
      "icon-image": "inf",
      "icon-size": 1,
    },
    paint: {
      "icon-color": "#FF0000",
      "text-color": "#000000",
    },
  });

  map.addLayer({
    id: "schools-layer",
    type: "symbol",
    source: "school-source",
    layout: {
      "icon-image": "school",
      "icon-size": 1,
    },
    paint: {
      "icon-color": "#FF0000",
      "text-color": "#000000",
    },
  });
};
