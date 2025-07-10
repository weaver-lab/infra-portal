import { v4 as uuidv4 } from "uuid";
import {
  InfrastructureAsset,
  InfrastructureItemType,
} from "../../../../types/infrastructure";
import { GeoJSONPoint, GeoJSONLineString } from "@/types/geo";
import { generateTelecomsRecord } from "./generate-telecoms-record";

// Lists for random selection
const citiesInKenya = [
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Eldoret",
  "Thika",
  "Malindi",
  "Kitale",
];
const assetTypes = [
  "Network Route",
  "Fibre route",
  "Node",
  "POP",
  "Tower/LTE",
  "Pole",
  "Pylon",
  "GPON Fiber Access Terminal",
  "Fiber Switch",
  "IXP",
  "Data Center",
  "Satellite",
  "VSAT",
  "Radio Frequency",
  "Ducting",
  "Trenches",
  "Air conditioning",
  "Antenna",
  "Radio Access Node",
  "Anchor point building",
  "Electricity substation",
  "Police station",
  "DWDM transmission equipment",
  "MSAN",
];
const operationalStatuses = [
  "active",
  "inactive",
  "under maintenance",
  "decommissioned",
];
const ownershipStatuses = ["owned", "leased", "shared"];
const deploymentTypes = ["aerial", "underground", "surface"];
const availabilityStatuses = ["available", "unavailable", "reserved"];
const transmissionEquipments = ["DWDM", "MSAN", "Optical Amplifier", "Router"];
const bands = ["C-band", "Ku-band", "Ka-band", "L-band"];
const teleports = ["Teleport A", "Teleport B", "Teleport C"];
const antennas = ["Parabolic", "Yagi", "Panel", "Horn"];
const accessoriesList = [
  "Power cables",
  "Mounting brackets",
  "Weatherproof covers",
  "Connectors",
];
const lineTypes = ["Network Route", "Fibre route", "Ducting", "Trenches"];

// Function to generate random longitude and latitude within Kenya
function getRandomCoordinate(): [number, number] {
  const latitude = Math.random() * (5 - -5) - 5; // -5 to 5
  const longitude = Math.random() * (42 - 33.5) + 33.5; // 33.5 to 42
  return [longitude, latitude];
}

// Function to generate a random GeoJSON location
function getRandomLocation(itemType: string): GeoJSONPoint | GeoJSONLineString {
  if (lineTypes.indexOf(itemType) > -1) {
    return {
      type: "LineString",
      coordinates: Array.from({ length: 10 }, (_, i) => getRandomCoordinate()),
    };
  } else {
    return { type: "Point", coordinates: getRandomCoordinate() };
  }
}

// Function to generate a random asset
export function createMockAsset(): InfrastructureAsset {
  const item_type = assetTypes[
    Math.floor(Math.random() * assetTypes.length)
  ] as InfrastructureItemType;
  return {
    item_id: uuidv4(),
    item_name: `${
      assetTypes[Math.floor(Math.random() * assetTypes.length)]
    } ${Math.floor(Math.random() * 1000)}`,
    item_type,
    item_description: "Bundle of high-capacity networking equipment",
    item_amount: Math.floor(Math.random() * 100) + 1, // Random between 1 and 100
    location: getRandomLocation(item_type),
    city: citiesInKenya[Math.floor(Math.random() * citiesInKenya.length)],
    country: "KEN",
    operational_status:
      operationalStatuses[
        Math.floor(Math.random() * operationalStatuses.length)
      ],
    ownership:
      ownershipStatuses[Math.floor(Math.random() * ownershipStatuses.length)],
    item_provider: "FibreCo",
    deployment_type:
      deploymentTypes[Math.floor(Math.random() * deploymentTypes.length)],
    cross_connect: `Cross-connect-${Math.floor(Math.random() * 100)}`,
    colocation: `Colocation-${Math.floor(Math.random() * 50)}`,
    transmission_equipment:
      transmissionEquipments[
        Math.floor(Math.random() * transmissionEquipments.length)
      ],
    band: bands[Math.floor(Math.random() * bands.length)],
    teleport: teleports[Math.floor(Math.random() * teleports.length)],
    antenna: antennas[Math.floor(Math.random() * antennas.length)],
    accessories:
      accessoriesList[Math.floor(Math.random() * accessoriesList.length)],
    visibility: Math.random() > 0.5,
    submitter_id: uuidv4(),
    submitter_name: "Cell-Stack",
    creation_date: new Date().toISOString(),
    user_defined_metadata: generateTelecomsRecord(),
  };
}
