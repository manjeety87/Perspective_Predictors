// import { create } from "zustand";
// import type { DateRange } from "react-day-picker";

// interface Coordinates {
//   lat: number;
//   lng: number;
// }

// interface WeatherDayData {
//   date: string;
//   temp: number;
//   rain: number;
//   wind: number;
// }

// interface WeatherDayInfo {
//   temp: number;
//   rain: number;
//   wind: number;
// }

// interface WeatherState {
//   activity: string;
//   dateRange?: DateRange;
//   coordinates?: Coordinates;
//   locationName?: string;
//   temperatureData?: Record<string, WeatherDayInfo>;
//   loading: boolean;

//   // 👇 new additions
//   selectedDayData?: WeatherDayData;
//   setSelectedDayData: (data: WeatherDayData | undefined) => void;

//   setActivity: (activity: string) => void;
//   setDateRange: (range: DateRange | undefined) => void;
//   setCoordinates: (coords: Coordinates) => void;
//   setLocationName: (name: string) => void;
//   setTemperatureData: (data: Record<string, WeatherDayInfo>) => void;
//   setLoading: (state: boolean) => void;
//   resetAll: () => void;
// }

// export const useWeatherStore = create<WeatherState>((set) => ({
//   activity: "",
//   dateRange: undefined,
//   coordinates: undefined,
//   locationName: undefined,
//   temperatureData: undefined,
//   loading: false,
//   selectedDayData: undefined,

//   // 🧠 Setters
//   setActivity: (activity) => set({ activity }),
//   setDateRange: (dateRange) => set({ dateRange }),
//   setCoordinates: (coordinates) => set({ coordinates }),
//   setLocationName: (locationName) => set({ locationName }),
//   setTemperatureData: (temperatureData) => set({ temperatureData }),
//   setLoading: (loading) => set({ loading }),
//   setSelectedDayData: (selectedDayData) => set({ selectedDayData }),

//   // 🔄 Reset all states
//   resetAll: () =>
//     set({
//       activity: "",
//       dateRange: undefined,
//       coordinates: undefined,
//       locationName: undefined,
//       temperatureData: undefined,
//       loading: false,
//       selectedDayData: undefined,
//     }),
// }));

import { create } from "zustand";
import type { DateRange } from "react-day-picker";

// 🌍 Coordinates type
interface Coordinates {
  lat: number;
  lng: number;
}

// 🌡 Each day's data
export interface WeatherDayData {
  date: string;
  temp: number;
  rain: number;
  wind: number;
}

// 🧩 Data structure returned from backend (mapped by date)
export interface WeatherDayInfo {
  temp: number;
  rain: number;
  wind: number;
}

// 🏪 Zustand Store State
interface WeatherState {
  activity: string;
  dateRange?: DateRange;
  coordinates?: Coordinates;
  locationName?: string;
  temperatureData?: Record<string, WeatherDayInfo>; // ✅ fixed type
  loading: boolean;

  // ✅ for single selected day (when clicked on calendar)
  selectedDayData?: WeatherDayData;

  // --- Actions ---
  setActivity: (activity: string) => void;
  setDateRange: (range: DateRange | undefined) => void;
  setCoordinates: (coords: Coordinates) => void;
  setLocationName: (name: string) => void;
  setTemperatureData: (data: Record<string, WeatherDayInfo>) => void;
  setLoading: (state: boolean) => void;
  setSelectedDayData: (data: WeatherDayData | undefined) => void;
  resetAll: () => void;
}

// ✅ Store Implementation
export const useWeatherStore = create<WeatherState>((set) => ({
  activity: "",
  dateRange: undefined,
  coordinates: undefined,
  locationName: undefined,
  temperatureData: undefined,
  loading: false,
  selectedDayData: undefined,

  // --- Actions ---
  setActivity: (activity) => set({ activity }),
  setDateRange: (dateRange) => set({ dateRange }),
  setCoordinates: (coordinates) => set({ coordinates }),
  setLocationName: (locationName) => set({ locationName }),
  setTemperatureData: (temperatureData) => set({ temperatureData }),
  setLoading: (loading) => set({ loading }),
  setSelectedDayData: (selectedDayData) => set({ selectedDayData }),

  // --- Reset Everything ---
  resetAll: () =>
    set({
      activity: "",
      dateRange: undefined,
      coordinates: undefined,
      locationName: undefined,
      temperatureData: undefined,
      loading: false,
      selectedDayData: undefined,
    }),
}));
