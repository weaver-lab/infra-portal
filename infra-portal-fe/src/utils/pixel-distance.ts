import { getMap } from "@/components/map/map-singleton";

export const getPixelDistance = (
  from: [number, number],
  to: [number, number]
) => {
  const map = getMap();
  // Convert both coordinates to screen (pixel) coordinates
  const point1 = map.project(from);
  const point2 = map.project(to);

  // Compute pixel distance
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
};
