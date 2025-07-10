import { getBffResponse } from "@/app/api/utils";
import { NextRequest } from "next/server";
import items from "@/app/api/mock/generation/data.json";

type IdRouteParams = { id: string };

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<IdRouteParams> }
) {
  const rt = params ? await params : undefined;
  const id = rt?.id;
  if (!id) {
    return getBffResponse({ message: "NOT FOUND" });
  }
  const infrastructureAsset = items.find((infAsset) => infAsset.item_id === id);
  return getBffResponse(infrastructureAsset as object);
}
