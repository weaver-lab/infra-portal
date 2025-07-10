import { getBffResponse } from "@/app/api/utils";

export async function GET() {
  const routeDirectory = {
    label: "map",
  };
  return getBffResponse(routeDirectory);
}
export const dynamic = "force-dynamic";