import { getBffResponse } from "@/app/api/utils";

export async function GET() {
  const response = await fetch(`${process.env.API_HOST}` + "/ida/api/v1/items/", { next: { revalidate: 10 } });
  const items = await response.json();

  const infrastructureAssets = items.map(
    ({ item_name, item_description, item_id, item_type, location }: any) => ({
      id: item_id,
      name: item_name,
      description: item_description,
      type: item_type,
      geometry: location,
    })
  );
  return getBffResponse(infrastructureAssets);
}
export const dynamic = "force-dynamic";