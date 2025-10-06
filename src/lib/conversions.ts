import type { DateRange } from "react-day-picker";

// ========== FRONTEND → BACKEND ==========
/**
 * Converts Zustand store data into the backend API payload.
 * Example Output:
 * {
 *   "Start_Date": "2025-10-01T08:00:00",
 *   "End_Date": "2025-10-06T17:00:00",
 *   "Latitude": 45.4215,
 *   "Longitude": -75.6992
 * }
 */

export function toBackendPayload({
  activity,
  dateRange,
  coordinates,
}: {
  activity: string;
  dateRange?: DateRange;
  coordinates?: { lat: number; lng: number };
}) {
  if (!dateRange?.from || !dateRange?.to || !coordinates) {
    throw new Error("Missing date range or coordinates for backend payload");
  }

  return {
    Activity: activity,
    Start_Date: dateRange.from.toISOString().split(".")[0], // e.g. 2025-10-01T08:00:00
    End_Date: dateRange.to.toISOString().split(".")[0],
    Latitude: coordinates.lat,
    Longitude: coordinates.lng,
  };
}

// ========== BACKEND → FRONTEND ==========
/**
 * Converts backend weather response to a format
 * usable by the calendar (keyed by date string: temperature)
 *
 * Example Input:
 * [
 *   { "Date": "2025-10-01", "Temperature": 26 },
 *   { "Date": "2025-10-02", "Temperature": 27 }
 * ]
 *
 * Output:
 * {
 *   "2025-10-01": 26,
 *   "2025-10-02": 27
 * }
 */

// export function fromBackendResponse(response: any): Record<string, number> {
//   const result: Record<string, number> = {};

//   // Case 1: backend sends array
//   if (Array.isArray(response)) {
//     response.forEach((item) => {
//       if (item.Date && item.Temperature !== undefined) {
//         result[item.Date] = item.Temperature;
//       }
//     });
//   }

//   // Case 2: backend sends dict with "temperatureData"
//   else if (response.temperatureData) {
//     Object.entries(response.temperatureData).forEach(([date, temp]) => {
//       result[date] = Number(temp);
//     });
//   }

//   return result;
// }

// export function fromBackendResponse(response: any): Record<string, number> {
//   const result: Record<string, number> = {};

//   if (Array.isArray(response)) {
//     response.forEach((item) => {
//       // Handle "Temp", "Temperature", or fallback to "Rain"
//       const tempValue = item.Temp ?? item.Temperature ?? item.Rain ?? null;

//       if (item.Date && tempValue !== null) {
//         // Convert Kelvin → Celsius if it's above 200 (your data is around 270K)
//         const celsius =
//           tempValue > 200 ? Math.round(tempValue - 273.15) : tempValue;

//         result[new Date(item.Date).toISOString().split("T")[0]] = celsius;
//       }
//     });
//   } else if (response.temperatureData) {
//     Object.entries(response.temperatureData).forEach(([date, temp]) => {
//       result[date] = Number(temp);
//     });
//   }

//   return result;
// }

// export function fromBackendResponse(response: any): Record<string, number> {
//   const result: Record<string, number> = {};

//   if (!response) return result;

//   // Case 1: if response is an array
//   if (Array.isArray(response)) {
//     response.forEach((item) => {
//       if (item.Date) {
//         const date = new Date(item.Date);
//         const key = date.toISOString().split("T")[0];

//         // Assign a "temperature-like" numeric value based on Rain status
//         // This value controls the color intensity in the calendar
//         if (item.Rain === "Yes")
//           result[key] = 30; // 🔴 rainy = hot/high intensity
//         else if (item.Rain === "Maybe") result[key] = 20; // 🟠 cloudy/moderate
//         else result[key] = 10; // 🟢 clear = low intensity
//       }
//     });
//   }

//   // Case 2: support old format (just in case)
//   else if (response.temperatureData) {
//     Object.entries(response.temperatureData).forEach(([date, temp]) => {
//       result[date] = Number(temp);
//     });
//   }

//   console.log("🎨 Parsed response for calendar:", result);
//   return result;
// }

// src/lib/conversions.ts
export function fromBackendResponse(response: any) {
  // ✅ Store data by date key (YYYY-MM-DD)
  const result: Record<string, { temp: number; rain: number; wind: number }> =
    {};

  if (Array.isArray(response)) {
    response.forEach((item) => {
      if (item.Date && item.Temp !== undefined) {
        const dateKey = new Date(item.Date).toISOString().split("T")[0];

        // 🧠 Backend already sends °C, so no Kelvin conversion
        const tempC = item.Temp;
        const rain = item.Rain ?? 0;
        const wind = item.Wind ?? 0;

        result[dateKey] = { temp: tempC, rain, wind };
      }
    });
  } else if (response.temperatureData) {
    // fallback for older structure
    Object.entries(response.temperatureData).forEach(([date, temp]) => {
      result[date] = { temp: Number(temp), rain: 0, wind: 0 };
    });
  }

  return result;
}
