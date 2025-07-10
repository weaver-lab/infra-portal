import { InfrastructureItemType } from "@/types/infrastructure";

type LineStyle = {
  color: string;
  dash: number[];
};

const ductsAndTrenchesLineStyle = {
  color: "#DA1E28",
  dash: [5, 3],
};
const otherLineStyle = {
  color: "#7B61FF",
  dash: [5],
};

export const LineStylesConfig: Record<string, LineStyle> = {
  "Network Route": otherLineStyle,
  "Fibre route": ductsAndTrenchesLineStyle,
  Ducting: otherLineStyle,
  Trenches: ductsAndTrenchesLineStyle,
};
