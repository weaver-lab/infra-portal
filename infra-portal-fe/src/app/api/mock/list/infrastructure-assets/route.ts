import items from "@/app/api/mock/generation/data.json";
import { getBffResponse } from "@/app/api/utils";

export async function GET() {
  const infrastructureAssets = items.map(
    ({ item_name, item_description, item_id, item_type, location }) => ({
      id: item_id,
      name: item_name,
      description: item_description,
      type: item_type,
      geometry: location,
    })
  );
  return getBffResponse(infrastructureAssets);
}
