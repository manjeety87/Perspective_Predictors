import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWeatherIcon } from "@/lib/getWeatherIcon";

interface WeatherCardProps {
  date: string;
  temp: number;
  rain: number;
  wind: number;
}

export default function WeatherCard({
  date,
  temp,
  rain,
  wind,
}: WeatherCardProps) {
  const icon = getWeatherIcon(temp, rain, wind);
  const tempC = (temp - 273.15).toFixed(1); // convert Kelvin to °C

  return (
    <Card className="w-52 bg-gray-900 text-white border-gray-700 hover:shadow-md hover:scale-[1.02] transition-all">
      <CardHeader className="text-center">
        <CardTitle className="text-sm font-medium">
          {new Date(date).toDateString()}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-2">
        <img
          src={icon}
          alt="Weather Icon"
          className="w-12 h-12 object-contain"
        />
        <div className="text-lg font-bold">{tempC}°C</div>
        <div className="text-sm text-gray-400">💧 Rain: {rain.toFixed(3)}</div>
        <div className="text-sm text-gray-400">🌬 Wind: {wind.toFixed(1)}</div>
      </CardContent>
    </Card>
  );
}
