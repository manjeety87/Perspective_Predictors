// components/WeatherCardList.tsx
import { useWeatherStore } from "@/store/useWeatherStore";
import WeatherCard from "./WeatherCard";

const WeatherCardList = () => {
  const { selectedDays } = useWeatherStore();

  if (!selectedDays || selectedDays.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 w-full flex flex-wrap gap-4 justify-center">
      {selectedDays.map((day, idx) => {
        const imageUrl =
          day.temp > 30
            ? "/images/sunny.jpg"
            : day.temp > 20
            ? "/images/partly-cloudy.jpg"
            : day.temp > 10
            ? "/images/cloudy.jpg"
            : "/images/rainy.jpg";

        return (
          <WeatherCard
            key={idx}
            date={day.date}
            temp={day.temp}
            rain={day.rain}
            wind={day.wind}
            imageUrl={imageUrl}
          />
        );
      })}
    </div>
  );
};

export default WeatherCardList;
