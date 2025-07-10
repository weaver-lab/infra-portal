import { getBffResponse } from "@/app/api/utils";

export async function GET() {
  const response = await fetch(`${process.env.API_HOST}` + "/ida/api/v1/items/", { next: { revalidate: 10 } });
  const body = await response.json();
  return getBffResponse(body as object);
}
export const dynamic = "force-dynamic";