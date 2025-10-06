// import { useEffect, useState } from "react";
// import { format } from "date-fns";
// import { Calendar } from "@/components/ui/calendar";
// import type { DateRange } from "react-day-picker";
// import { getTemperatureLevel } from "@/constants/constants";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "./ui/tooltip";
// import { useWeatherStore, type WeatherDayInfo } from "@/store/useWeatherStore";

// interface DateRangeCalendarProps {
//   selectModeOnly?: boolean;
//   mode: "single" | "range";
//   temperatureData?: Record<string, WeatherDayInfo>;
//   onDateChange?: (range: DateRange | undefined) => void;
//   onDateSelect?: (date: string, temp: number) => void;
// }

// const DateRangeCalendar = ({
//   selectModeOnly = false,
//   temperatureData,
//   onDateChange,
//   onDateSelect,
//   mode = "range",
// }: DateRangeCalendarProps) => {
//   const [date, setDate] = useState<DateRange | undefined>();
//   const [modifiers, setModifiers] = useState<Record<string, Date[]>>({
//     green: [],
//     yellow: [],
//     orange: [],
//     red: [],
//   });

//   const handleSelect = (range: DateRange | undefined) => {
//     setDate(range);
//     onDateChange?.(range);
//   };

//   useEffect(() => {
//     if (!temperatureData) return;

//     const temps = Object.values(temperatureData);
//     const newMods: Record<string, Date[]> = {
//       blue: [],
//       green: [],
//       yellow: [],
//       orange: [],
//       red: [],
//     };

//     Object.entries(temperatureData).forEach(([key, temp]) => {
//       const d = new Date(key);
//       const level = getTemperatureLevel(temp, temps); // pass all temps
//       newMods[level].push(d);
//     });

//     setModifiers(newMods);
//   }, [temperatureData]);

//   const setSelectedDayData = useWeatherStore((s) => s.setSelectedDayData);

//   const getTooltipLabel = (temp: number) => {
//     if (temp < 10) return `Low (${temp.toFixed(1)}°C)`;
//     if (temp < 25) return `Moderate (${temp.toFixed(1)}°C)`;
//     if (temp < 35) return `High (${temp.toFixed(1)}°C)`;
//     return `Very High (${temp.toFixed(1)}°C)`;
//   };

//   // useEffect(() => {
//   //   if (!temperatureData) return;

//   //   const newMods: Record<string, Date[]> = {
//   //     green: [],
//   //     yellow: [],
//   //     orange: [],
//   //     red: [],
//   //   };
//   //   Object.entries(temperatureData).forEach(([key, temp]) => {
//   //     const d = new Date(key);
//   //     const level = getTemperatureLevel(temp);
//   //     newMods[level].push(d);
//   //   });
//   //   setModifiers(newMods);
//   // }, [temperatureData]);

//   return (
//     <div className="p-6 w-full bg-black text-white">
//       <TooltipProvider>
//         <Calendar
//           onDayClick={(date) => {
//             const key = date.toISOString().split("T")[0];
//             const temp = temperatureData?.[key];
//             if (!temp) return;

//             // Example structure
//             setSelectedDayData({
//               date: key,
//               temp: temp.temp,
//               rain: temp.rain,
//               wind: temp.wind,
//             });
//           }}
//           mode={mode}
//           selected={date}
//           onSelect={handleSelect}
//           numberOfMonths={1}
//           modifiers={!selectModeOnly ? modifiers : undefined}
//           // modifiersClassNames={{
//           //   green: "bg-green-500 text-white rounded-md",
//           //   yellow: "bg-yellow-400 text-black rounded-md",
//           //   orange: "bg-orange-500 text-white rounded-md",
//           //   red: "bg-red-600 text-white rounded-md",
//           // }}
//           // modifiersClassNames={{
//           //   blue: "bg-blue-500 text-white rounded-md",
//           //   green: "bg-green-500 text-white rounded-md",
//           //   yellow: "bg-yellow-400 text-black rounded-md",
//           //   orange: "bg-orange-500 text-white rounded-md",
//           //   red: "bg-red-600 text-white rounded-md",
//           // }}
//           modifiersClassNames={{
//             frost: "bg-blue-200 text-blue-900 rounded-md", // ❄ icy
//             cold: "bg-sky-300 text-blue-950 rounded-md", // 🧊 cool
//             mild: "bg-green-300 text-green-900 rounded-md", // 🌼 mild
//             warm: "bg-yellow-400 text-yellow-900 rounded-md", // 🌤 warm
//             hot: "bg-orange-500 text-white rounded-md", // ☀️ hot
//             extreme: "bg-red-600 text-white rounded-md", // 🔥 extreme
//           }}
//           className="rounded-lg shadow-md"
//         />

//         {/* Range summary */}
//         {!temperatureData && (
//           <div className="mt-6 text-white space-y-1">
//             {date?.from && date?.to ? (
//               <>
//                 <p>
//                   <strong>From:</strong> {format(date.from, "PPP")}
//                 </p>
//                 <p>
//                   <strong>To:</strong> {format(date.to, "PPP")}
//                 </p>
//               </>
//             ) : date?.from ? (
//               <p>
//                 <strong>Selected:</strong> {format(date.from, "PPP")}
//               </p>
//             ) : (
//               <p className="text-white/70">No date selected yet</p>
//             )}
//           </div>
//         )}
//       </TooltipProvider>
//     </div>
//   );
// };

// export default DateRangeCalendar;

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";
import { getTemperatureLevel } from "@/constants/constants";
import { TooltipProvider } from "./ui/tooltip";
import { useWeatherStore, type WeatherDayInfo } from "@/store/useWeatherStore";

interface DateRangeCalendarProps {
  selectModeOnly?: boolean;
  mode?: "single" | "range";
  temperatureData?: Record<string, WeatherDayInfo>;
  onDateChange?: (range: DateRange | undefined) => void;
  onDateSelect?: (date: string, temp: number) => void;
}

const DateRangeCalendar = ({
  selectModeOnly = false,
  temperatureData,
  onDateChange,
  onDateSelect,
  mode = "range",
}: DateRangeCalendarProps) => {
  const [date, setDate] = useState<DateRange | undefined>();
  const [modifiers, setModifiers] = useState<Record<string, Date[]>>({
    frost: [],
    cold: [],
    mild: [],
    warm: [],
    hot: [],
    extreme: [],
  });

  const setSelectedDayData = useWeatherStore((s) => s.setSelectedDayData);

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range);
    onDateChange?.(range);
  };

  // 🧮 Generate colored modifiers for the calendar
  useEffect(() => {
    if (!temperatureData) return;

    const temps = Object.values(temperatureData).map((t) => t.temp);
    const newMods: Record<string, Date[]> = {
      frost: [],
      cold: [],
      mild: [],
      warm: [],
      hot: [],
      extreme: [],
    };

    Object.entries(temperatureData).forEach(([key, val]) => {
      if (!val?.temp) return;
      const d = new Date(key);
      if (isNaN(d.getTime())) return;

      const level = getTemperatureLevel(val.temp, temps);
      newMods[level].push(d);
    });

    setModifiers(newMods);
  }, [temperatureData]);

  // 🧠 Tooltip helper
  const getTooltipLabel = (temp: number) => {
    if (temp < 0) return `Freezing (${temp.toFixed(1)}°C)`;
    if (temp < 10) return `Cold (${temp.toFixed(1)}°C)`;
    if (temp < 20) return `Mild (${temp.toFixed(1)}°C)`;
    if (temp < 28) return `Warm (${temp.toFixed(1)}°C)`;
    if (temp < 35) return `Hot (${temp.toFixed(1)}°C)`;
    return `Extreme Heat (${temp.toFixed(1)}°C)`;
  };

  return (
    <div className="p-6 w-full bg-black text-white rounded-lg">
      <TooltipProvider>
        <Calendar
          mode={mode}
          selected={date}
          onSelect={handleSelect}
          numberOfMonths={1}
          onDayClick={(date) => {
            if (!temperatureData) return;
            const key = date.toISOString().split("T")[0];
            const tempObj = temperatureData[key];
            if (!tempObj) return;

            setSelectedDayData({
              date: key,
              temp: tempObj.temp,
              rain: tempObj.rain,
              wind: tempObj.wind,
            });

            onDateSelect?.(key, tempObj.temp);
          }}
          modifiers={!selectModeOnly ? modifiers : undefined}
          modifiersClassNames={{
            frost: "bg-blue-100 text-blue-900 rounded-md", // ❄ below 0°C
            cold: "bg-sky-300 text-blue-950 rounded-md", // 🧊 0-10°C
            mild: "bg-green-300 text-green-900 rounded-md", // 🌼 10-20°C
            warm: "bg-yellow-400 text-yellow-900 rounded-md", // 🌤 20-28°C
            hot: "bg-orange-500 text-white rounded-md", // ☀️ 28-35°C
            extreme: "bg-red-600 text-white rounded-md", // 🔥 35+°C
          }}
          className="rounded-lg shadow-md"
        />

        {/* 📅 Date summary (only shown if no data) */}
        {!temperatureData && (
          <div className="mt-6 text-white space-y-1">
            {date?.from && date?.to ? (
              <>
                <p>
                  <strong>From:</strong> {format(date.from, "PPP")}
                </p>
                <p>
                  <strong>To:</strong> {format(date.to, "PPP")}
                </p>
              </>
            ) : date?.from ? (
              <p>
                <strong>Selected:</strong> {format(date.from, "PPP")}
              </p>
            ) : (
              <p className="text-white/70">No date selected yet</p>
            )}
          </div>
        )}
      </TooltipProvider>
    </div>
  );
};

export default DateRangeCalendar;
