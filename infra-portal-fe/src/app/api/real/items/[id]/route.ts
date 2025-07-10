import { getBffResponse } from "@/app/api/utils";
import { NextRequest } from "next/server";

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

  const response = await fetch(`${process.env.API_HOST}` + "/ida/api/v1/items/", { next: { revalidate: 10 } });
  const body = await response.json();
  return getBffResponse(body as object);

}
export const dynamic = "force-dynamic";