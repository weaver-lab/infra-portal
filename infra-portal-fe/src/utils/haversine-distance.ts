export const haversineDistance = (
  from: [number, number],
  to: [number, number]
): number => {
  const lat1 = from[1];
  const lat2 = to[1];

  const lon1 = from[0];
  const lon2 = to[0];

  const toRadians = (deg: number) => (deg * Math.PI) / 180;

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};
