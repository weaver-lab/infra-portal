import { useSearchParams } from "next/navigation";

export const useQueryParams = () => {
  const searchParams = useSearchParams();
  const getNumericalQuery = (s: string, defaultNum: number) =>
    Number(searchParams.get(s) || defaultNum);
  const long = getNumericalQuery("long", 37.4783);
  const lat = getNumericalQuery("lat", 0.173);
  const zoom = getNumericalQuery("zoom", 6);
  const siteName = searchParams.get("siteName");
  const countryCode = searchParams.get("countryCode");
  return {
    long,
    lat,
    zoom,
    siteName,
    countryCode,
  };
};
