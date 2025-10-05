import { create } from "zustand";
import type { DateRange } from "react-day-picker";

interface Coordinates {
  lat: number;
  lng: number;
}

interface WeatherState {
  activity: string;
  dateRange?: DateRange;
  coordinates?: Coordinates;
  setActivity: (activity: string) => void;
  setDateRange: (range: DateRange | undefined) => void;
  setCoordinates: (coords: Coordinates) => void;
  resetAll: () => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  activity: "",
  dateRange: undefined,
  coordinates: undefined,

  setActivity: (activity) => set({ activity }),
  setDateRange: (dateRange) => set({ dateRange }),
  setCoordinates: (coordinates) => set({ coordinates }),

  resetAll: () =>
    set({
      activity: "",
      dateRange: undefined,
      coordinates: undefined,
    }),
}));
