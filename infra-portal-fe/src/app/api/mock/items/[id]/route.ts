import { getBffResponse } from "@/app/api/utils";
import { NextRequest } from "next/server";

type IdRouteParams = { id: string };

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<IdRouteParams> }
) {
  const rt = params ? await params : undefined;
  return getBffResponse({
    id: rt?.id,
  });
}
