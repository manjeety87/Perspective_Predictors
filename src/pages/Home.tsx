import ActivitySelector from "@/components/ActivitySelector";
import DateRangeCalendar from "@/components/DateRangeCalendar";
import Maps from "@/components/Maps";
import { octoberTemperatureData } from "@/constants/constants";
import { useWeatherStore } from "@/store/useWeatherStore";
import { useEffect, useState } from "react";

const Home = () => {
  const {
    activity,
    dateRange,
    setActivity,
    setDateRange,
    setCoordinates,
    coordinates,
  } = useWeatherStore();

  const [temperatureData, setTemperatureData] = useState<
    Record<string, number>
  >({});

  // 🔥 Whenever range or activity changes, filter data
  useEffect(() => {
    if (!dateRange?.from || !dateRange?.to) return;

    const filtered: Record<string, number> = {};
    const from = dateRange.from;
    const to = dateRange.to;

    Object.entries(octoberTemperatureData).forEach(([key, temp]) => {
      const date = new Date(key);
      if (date >= from && date <= to) {
        filtered[key] = temp;
      }
    });
    setTemperatureData(filtered);
  }, [dateRange, activity]);

  const handleLocationSelect = (coords: { lat: number; lng: number }) => {
    setCoordinates(coords);
    console.log("🌍 Coordinates saved in store:", coords);
  };

  useEffect(() => {
    console.log("🧭 Store snapshot:", { activity, dateRange, coordinates });
  }, [activity, dateRange, coordinates]);

  return (
    <main className="flex flex-col max-w-7xl justify-center items-center w-full min-h-screen bg-black text-white py-10 gap-8">
      <div className="flex justify-between gap-4 w-full">
        <div>
          <ActivitySelector activity={activity} setActivity={setActivity} />
          <div className="w-full gap-6 mt-8">
            <div className="">Select Date Range</div>
            <DateRangeCalendar
              selectModeOnly={true}
              onDateChange={setDateRange}
            />
          </div>
        </div>
        <Maps onLocationSelect={handleLocationSelect} />
      </div>

      <div className="w-full flex flex-col items-center gap-6 mt-8">
        <h2 className="text-xl font-medium">Temperature Overview</h2>
        <DateRangeCalendar temperatureData={temperatureData} />
      </div>

      {coordinates && (
        <div className="mt-8 bg-gray-900 text-white p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Selected Coordinates</h3>
          <p>Latitude: {coordinates.lat.toFixed(4)}</p>
          <p>Longitude: {coordinates.lng.toFixed(4)}</p>
        </div>
      )}
    </main>
  );

  //   const [dateRange, setDateRange] = useState<DateRange | undefined>();
  //   const [activity, setActivity] = useState<string>("");
  //   const [temperatureData, setTemperatureData] = useState<
  //     Record<string, number>
  //   >({});

  //   useEffect(() => {
  //     if (!dateRange?.from || !dateRange?.to) return;
  //     const filtered: Record<string, number> = {};
  //     const from = dateRange.from;
  //     const to = dateRange.to;

  //     Object.entries(octoberTemperatureData).forEach(([key, temp]) => {
  //       const date = new Date(key);
  //       if (date >= from && date <= to) {
  //         filtered[key] = temp;
  //       }
  //     });
  //     setTemperatureData(filtered);
  //   }, [dateRange, activity]);

  //   return (
  //     <main className="flex flex-col items-center w-full min-h-screen bg-black text-white py-10 gap-8">
  //       <h1 className="text-2xl font-semibold">Weather Insights</h1>
  //       <Maps />
  //       <ActivitySelector activity={activity} setActivity={setActivity} />

  //       <div className="w-full flex flex-col items-center gap-6 mt-4">
  //         <h2 className="text-xl font-medium">Select Date Range</h2>
  //         <DateRangeCalendar
  //           selectModeOnly={true}
  //           onDateChange={(range) => setDateRange(range)}
  //         />
  //       </div>

  //       <div className="w-full flex flex-col items-center gap-6 mt-8">
  //         <h2 className="text-xl font-medium">Temperature Overview</h2>
  //         <DateRangeCalendar temperatureData={temperatureData} />
  //       </div>
  //     </main>
  //   );
};

export default Home;
