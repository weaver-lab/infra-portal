import { getBffResponse } from "@/app/api/utils";
import items from "@/app/api/mock/generation/data.json";

export async function GET() {
  return getBffResponse(items);
}
