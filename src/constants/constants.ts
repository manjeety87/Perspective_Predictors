export const TemperatureLevel = {
  COOL: "green", // Comfortable temp
  WARM: "yellow", // Normal warm
  HOT: "orange", // High heat
  EXTREME: "red", // Dangerous heat
} as const;

export type TemperatureLevel =
  (typeof TemperatureLevel)[keyof typeof TemperatureLevel];

export function getTemperatureLevel(temp: number): TemperatureLevel {
  if (temp < 25) return TemperatureLevel.COOL;
  if (temp < 30) return TemperatureLevel.WARM;
  if (temp < 38) return TemperatureLevel.HOT;
  return TemperatureLevel.EXTREME;
}

export const octoberTemperatureData: Record<string, number> = {
  "2025-10-01": 22,
  "2025-10-02": 25,
  "2025-10-03": 27,
  "2025-10-04": 29,
  "2025-10-05": 31,
  "2025-10-06": 33,
  "2025-10-07": 35,
  "2025-10-08": 37,
  "2025-10-09": 40,
  "2025-10-10": 42,
  "2025-10-11": 41,
  "2025-10-12": 39,
  "2025-10-13": 36,
  "2025-10-14": 34,
  "2025-10-15": 32,
  "2025-10-16": 29,
  "2025-10-17": 27,
  "2025-10-18": 26,
  "2025-10-19": 25,
  "2025-10-20": 23,
  "2025-10-21": 22,
  "2025-10-22": 24,
  "2025-10-23": 26,
  "2025-10-24": 28,
  "2025-10-25": 31,
  "2025-10-26": 35,
  "2025-10-27": 38,
  "2025-10-28": 41,
  "2025-10-29": 39,
  "2025-10-30": 36,
  "2025-10-31": 30,
};
