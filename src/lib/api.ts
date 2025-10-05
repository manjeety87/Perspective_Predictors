// import { useWeatherStore } from "@/store/useWeatherStore";

// interface WeatherPayload {
//   activity: string;
//   dateRange?: { from?: Date; to?: Date };
//   coordinates?: { lat: number; lng: number };
// }

// export async function fetchWeatherData(payload: WeatherPayload) {
//   const store = useWeatherStore.getState();
//   store.setLoading(true);

//   try {
//     const res = await fetch("http://localhost:5000/request", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) throw new Error("Failed to fetch weather data");

//     const data = await res.json();

//     store.setTemperatureData(data.temperatureData || {});
//   } catch (error) {
//     console.error("❌ Weather API error:", error);
//   } finally {
//     store.setLoading(false);
//   }
// }

import { useWeatherStore } from "@/store/useWeatherStore";
import { toBackendPayload, fromBackendResponse } from "@/lib/conversions";

export async function fetchWeatherData() {
  const store = useWeatherStore.getState();
  const { activity, dateRange, coordinates } = store;

  store.setLoading(true);

  try {
    const payload = toBackendPayload({ activity, dateRange, coordinates });

    console.log("📤 Sending to backend:", payload);

    const res = await fetch("http://localhost:5000/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    const data = await res.json();

    // Convert response to frontend calendar format
    const formatted = fromBackendResponse(data);
    console.log("📥Formatted data:", formatted);

    store.setTemperatureData(formatted);
    console.log("✅ Converted response:", formatted);
  } catch (error) {
    console.error("❌ Weather API error:", error);
  } finally {
    store.setLoading(false);
  }
}
