/**
 * The key is the field value, the value 9 of this object ) is the label.
 * They are the same right now, but it's reasonable to assume
 * that this might not always be the case.
 */

export const InfrastructureAssetTypeLabels = {
  all: "All asset types",
  "Network Route": "Network Route",
  "Fibre route": "Fibre route",
  Node: "Node",
  POP: "POP",
  "Tower/LTE": "Tower/LTE",
  Pole: "Pole",
  Pylon: "Pylon",
  "GPON Fiber Access Terminal": "GPON Fiber Access Terminal",
  "Fiber Switch": "Fiber Switch",
  IXP: "IXP",
  "Data Center": "Data Center",
  Satellite: "Satellite",
  VSAT: "VSAT",
  "Radio Frequency": "Radio Frequency",
  Ducting: "Ducting",
  Trenches: "Trenches",
  "Air conditioning": "Air conditioning",
  Antenna: "Antenna",
  "Radio Access Node": "Radio Access Node",
  "Anchor point building": "Anchor point building",
  "Electricity substation": "Electricity substation",
  "Police station": "Police station",
  "DWDM (Dense Wavelength Division Multiplexing) transmission equipment":
    "DWDM (Dense Wavelength Division Multiplexing) transmission equipment",
  "MSAN (Multi-Service Access Node)": "MSAN (Multi-Service Access Node)",
} as const;
