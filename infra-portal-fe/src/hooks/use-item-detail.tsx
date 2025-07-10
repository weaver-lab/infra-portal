import { getItemDetailUrl } from "@/state/react-query/query-config";
import { useBffQuery } from "./use-bff-query";
import { useViewStore } from "@/state/zustand/use-view-store";
import { InfrastructureAsset } from "@/types/infrastructure";

export const useItemDetail = () => {
  const { selectedItemId } = useViewStore();
  const url = getItemDetailUrl(selectedItemId as string);
  const { data, isError, isLoading } = useBffQuery<InfrastructureAsset>(
    null,
    [url],
    url
  );
  return {
    item: data,
    isError,
    isLoading,
  };
};
