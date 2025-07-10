import { getBffResponse } from "../../utils";
import fs from "fs";
import { createMockAsset } from "../mock-utils/create-mock-asset";
import { fileURLToPath } from "url";
import path from "path";
import { NextRequest } from "next/server";

type RouteParams = { num: number };

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<RouteParams> }
) {
  const routeParams = params ? await params : undefined;
  const arr = Array.from({ length: routeParams?.num || 20 }, (_, i) =>
    createMockAsset()
  );
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, "data.json");
  const data = JSON.stringify(arr, null, 2);
  fs.writeFileSync(filePath, data);
  return getBffResponse({
    status: "OK",
  });
}
