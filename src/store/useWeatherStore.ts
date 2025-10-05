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

// interface WeatherState {
//   activity: string;
//   dateRange?: DateRange;
//   coordinates?: Coordinates;
//   locationName?: string;
//   temperatureData?: Record<string, number>;
//   loading: boolean;
//   selectedDays: WeatherDayData[];
//   addSelectedDay: (data: WeatherDayData) => void;
//   clearSelectedDays: () => void;

//   setActivity: (activity: string) => void;
//   setDateRange: (range: DateRange | undefined) => void;
//   setCoordinates: (coords: Coordinates) => void;
//   setLocationName: (name: string) => void;
//   setTemperatureData: (data: Record<string, number>) => void;
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

//   setActivity: (activity) => set({ activity }),
//   setDateRange: (dateRange) => set({ dateRange }),
//   setCoordinates: (coordinates) => set({ coordinates }),
//   setLocationName: (locationName) => set({ locationName }),
//   setTemperatureData: (temperatureData) => set({ temperatureData }),
//   setLoading: (loading) => set({ loading }),

//   resetAll: () =>
//     set({
//       activity: "",
//       dateRange: undefined,
//       coordinates: undefined,
//       locationName: undefined,
//       temperatureData: undefined,
//       loading: false,
//     }),

//   selectedDays: [],
//   addSelectedDay: (data) =>
//     set((state) => {
//       // avoid duplicates
//       const exists = state.selectedDays.find((d) => d.date === data.date);
//       if (exists) return state;
//       return { selectedDays: [...state.selectedDays, data] };
//     }),
//   clearSelectedDays: () => set({ selectedDays: [] }),
// }));

import { create } from "zustand";
import type { DateRange } from "react-day-picker";

interface Coordinates {
  lat: number;
  lng: number;
}

interface WeatherDayData {
  date: string;
  temp: number;
  rain: number;
  wind: number;
}

interface WeatherState {
  activity: string;
  dateRange?: DateRange;
  coordinates?: Coordinates;
  locationName?: string;
  temperatureData?: Record<string, number>;
  loading: boolean;

  // 👇 new additions
  selectedDayData?: WeatherDayData;
  setSelectedDayData: (data: WeatherDayData | undefined) => void;

  setActivity: (activity: string) => void;
  setDateRange: (range: DateRange | undefined) => void;
  setCoordinates: (coords: Coordinates) => void;
  setLocationName: (name: string) => void;
  setTemperatureData: (data: Record<string, number>) => void;
  setLoading: (state: boolean) => void;
  resetAll: () => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  activity: "",
  dateRange: undefined,
  coordinates: undefined,
  locationName: undefined,
  temperatureData: undefined,
  loading: false,
  selectedDayData: undefined,

  // 🧠 Setters
  setActivity: (activity) => set({ activity }),
  setDateRange: (dateRange) => set({ dateRange }),
  setCoordinates: (coordinates) => set({ coordinates }),
  setLocationName: (locationName) => set({ locationName }),
  setTemperatureData: (temperatureData) => set({ temperatureData }),
  setLoading: (loading) => set({ loading }),
  setSelectedDayData: (selectedDayData) => set({ selectedDayData }),

  // 🔄 Reset all states
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
