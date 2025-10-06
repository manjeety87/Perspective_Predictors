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

// export function getTemperatureLevel(
//   temp: number,
//   allTemps?: number[]
// ): "blue" | "green" | "yellow" | "orange" | "red" {
//   if (!allTemps || allTemps.length === 0) return "green";

//   const min = Math.min(...allTemps);
//   const max = Math.max(...allTemps);
//   const range = max - min;

//   // Avoid division by zero
//   if (range === 0) return "green";

//   const normalized = (temp - min) / range; // 0 → min, 1 → max

//   if (normalized < 0.2) return "blue"; // coldest
//   if (normalized < 0.4) return "green";
//   if (normalized < 0.6) return "yellow";
//   if (normalized < 0.8) return "orange";
//   return "red"; // hottest
// }

export function getTemperatureLevel(
  temp: number,
  allTemps?: number[]
): "frost" | "cold" | "mild" | "warm" | "hot" | "extreme" {
  // fallback: no data
  if (isNaN(temp)) return "mild";

  // Find global min/max if provided
  const min = allTemps && allTemps.length ? Math.min(...allTemps) : -10;
  const max = allTemps && allTemps.length ? Math.max(...allTemps) : 35;

  // Normalize 0 → 1
  const clamped = Math.max(min, Math.min(max, temp));
  const normalized = (clamped - min) / (max - min);

  // ❄ realistic temperature zones
  if (temp < -5) return "frost"; // icy blue/white
  if (temp < 5) return "cold"; // cool blue
  if (temp < 15) return "mild"; // teal-green
  if (temp < 25) return "warm"; // yellow-orange
  if (temp < 32) return "hot"; // red-orange
  return "extreme"; // deep red
}
