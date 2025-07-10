import { iconConfig } from "./config/icon-config";

export const loadImages = (map: mapboxgl.Map, callback: () => void) => {
  const loadPromises = iconConfig.map((iconConfig) => {
    return new Promise<void>((resolve, reject) => {
      map.loadImage(iconConfig.url, (error, image) => {
        if (error) {
          reject(error);
        } else {
          if (image) {
            map.addImage(iconConfig.name, image); // Add image to the map
          }
          resolve(); // Resolve when the image is loaded and added
        }
      });
    });
  });

  // Wait for all images to be loaded
  Promise.all(loadPromises)
    .then(() => {
      // All images have been loaded and added
      callback();
    })
    .catch((error) => {
      console.error("Error loading images:", error);
    });
};
