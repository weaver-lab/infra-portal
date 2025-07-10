function toTitleCase(phrase: string): string {
  return phrase
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateTelecomsRecord(
  min = 3,
  max = 8
): Record<string, string> {
  const phrases = [
    "fiber distribution hub",
    "cellular base station",
    "microwave relay tower",
    "network operations center",
    "fiber splice enclosure",
    "antenna array",
    "telecom cabinet",
    "data transmission unit",
    "signal booster",
    "optical network terminal",
    "satellite uplink station",
    "mobile switching center",
    "tower mount amplifier",
    "5g small cell",
    "radio access node",
    "bts controller module",
    "network demarcation point",
    "distributed antenna system",
    "core network gateway",
    "emergency power supply",
  ];

  const result: Record<string, string> = {};
  const numberOfEntries = Math.floor(Math.random() * (max - min + 1)) + min;
  const usedKeys = new Set<string>();

  while (Object.keys(result).length < numberOfEntries) {
    let key = toTitleCase(getRandomItem(phrases));
    let value = toTitleCase(getRandomItem(phrases));

    // Ensure no duplicate keys and value ≠ key
    if (!usedKeys.has(key) && key !== value) {
      result[key] = value;
      usedKeys.add(key);
    }
  }

  return result;
}
