import ActivitySelector from "@/components/ActivitySelector";
import DateRangeCalendar from "@/components/DateRangeCalendar";
import Maps from "@/components/Maps";
import { Button } from "@/components/ui/button";
import WeatherCard from "@/components/WeatherCard";
import { fetchWeatherData } from "@/lib/api";
import { useWeatherStore } from "@/store/useWeatherStore";
import { useEffect } from "react";

const Home = () => {
  const {
    activity,
    dateRange,
    coordinates,
    locationName,
    temperatureData,
    loading,
    setActivity,
    setDateRange,
    setCoordinates,
  } = useWeatherStore();

  //   const { activity, dateRange, coordinates, temperatureData, loading } =
  //     useWeatherStore();

  //   useEffect(() => {
  //     if (activity && dateRange?.from && dateRange?.to && coordinates) {
  //       fetchWeatherData();
  //     }
  //   }, [activity, dateRange, coordinates]);

  //   const [temperatureData, setTemperatureData] = useState<
  //     Record<string, number>
  //   >({});

  // 🔥 Whenever range or activity changes, filter data
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
  const { selectedDayData } = useWeatherStore();
  useEffect(() => {
    console.log("🧭 Store snapshot:", { activity, dateRange, coordinates });
  }, [activity, dateRange, coordinates]);

  return (
    <main className="flex flex-col max-w-7xl mt-4 justify-center items-center w-full min-h-screen bg-black text-white gap-0">
      <div className="flex justify-between gap-0 w-full">
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
        <Maps
          onLocationSelect={(coords) => {
            console.log("📡 Got coords from child:", coords);
            setCoordinates({ ...coords });
            // setCoordinates({ lat: coords.lat, lng: coords.lng });
            // coords = { lat: 22.3, lng: 72.8, address: "Ahmedabad, Gujarat, India" }
          }}
        />
        {/* <Maps onLocationSelect={handleLocationSelect} /> */}
      </div>
      <Button onClick={fetchWeatherData}>Check</Button>

      {
        <div className="mt-8 bg-gray-900 text-white p-4 rounded-lg w-80 text-center">
          <h3 className="font-semibold mb-2">Selected Location</h3>
          <p className="text-gray-300 mb-1">{locationName || "Fetching..."}</p>
          <p>Latitude: {coordinates?.lat.toFixed(4)}</p>
          <p>Longitude: {coordinates?.lng.toFixed(4)}</p>
        </div>
      }

      {/* 🌡 Show only when data loaded */}
      <div>
        {loading ? (
          <div className="mt-8 text-gray-400">Loading weather data...</div>
        ) : temperatureData && Object.keys(temperatureData).length > 0 ? (
          <>
            <div className="w-full mb-6 flex flex-col items-center gap-6 mt-8">
              <h2 className="text-xl font-medium">Temperature Overview</h2>
              <div className="flex flex-col items-center">
                <DateRangeCalendar temperatureData={temperatureData} />
                <div className="flex flex-wrap gap-4 justify-center mt-6">
                  {selectedDayData && (
                    <WeatherCard
                      date={selectedDayData.date}
                      temp={selectedDayData.temp}
                      rain={selectedDayData.rain}
                      wind={selectedDayData.wind}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>

      {/* <div className="w-full flex flex-col items-center gap-6 mt-8">
        <h2 className="text-xl font-medium">Temperature Overview</h2>
        <DateRangeCalendar temperatureData={temperatureData} />
      </div>

      {coordinates && (
        <div className="mt-8 bg-gray-900 text-white p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Selected Coordinates</h3>
          <p>Latitude: {coordinates.lat.toFixed(4)}</p>
          <p>Longitude: {coordinates.lng.toFixed(4)}</p>
        </div>
      )} */}
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
