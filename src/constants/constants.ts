export const TemperatureLevel = {
  COOL: "green", // Comfortable temp
  WARM: "yellow", // Normal warm
  HOT: "orange", // High heat
  EXTREME: "red", // Dangerous heat
} as const;

export type TemperatureLevel =
  (typeof TemperatureLevel)[keyof typeof TemperatureLevel];

// export function getTemperatureLevel(temp: number): TemperatureLevel {
//   if (temp < 25) return TemperatureLevel.COOL;
//   if (temp < 30) return TemperatureLevel.WARM;
//   if (temp < 38) return TemperatureLevel.HOT;
//   return TemperatureLevel.EXTREME;
// }

export function getTemperatureLevel(
  temp: number,
  allTemps?: number[]
): "blue" | "green" | "yellow" | "orange" | "red" {
  if (!allTemps || allTemps.length === 0) return "green";

  const min = Math.min(...allTemps);
  const max = Math.max(...allTemps);
  const range = max - min;

  // Avoid division by zero
  if (range === 0) return "green";

  const normalized = (temp - min) / range; // 0 → min, 1 → max

  if (normalized < 0.2) return "blue"; // coldest
  if (normalized < 0.4) return "green";
  if (normalized < 0.6) return "yellow";
  if (normalized < 0.8) return "orange";
  return "red"; // hottest
}
