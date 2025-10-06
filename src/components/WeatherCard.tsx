import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWeatherIcons } from "@/lib/getWeatherIcon";

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
  const tempC = temp.toFixed(1);
  const { tempIcon, rainIcon, windIcon } = getWeatherIcons(temp, rain, wind);

  return (
    <Card className="w-52 bg-gray-900 text-white border-gray-700 hover:shadow-md hover:scale-[1.02] transition-all">
      <CardHeader className="text-center">
        <CardTitle className="text-sm font-medium">
          {new Date(date).toDateString()}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-2">
        <div className="flex w-full items-center">
          Temp:
          <img
            src={tempIcon}
            alt="Temperature"
            className="w-8 object-contain"
          />
          <div className="text-lg font-bold">{tempC}°C</div>
        </div>
        <div className="flex w-full items-center">
          Rain:
          <img src={rainIcon} alt="Rain" className="w-6 object-contain" />
          <div className="text-lg font-bold">{rain.toFixed(3)}mm/h</div>
        </div>
        <div className="flex w-full items-center">
          Wind:
          <img src={windIcon} alt="Wind" className="w-8 object-contain" />
          <div className="text-lg font-bold">{wind.toFixed(1)}km/h</div>
        </div>
        {/* <div className="text-sm text-gray-400">💧 Rain: {rain.toFixed(3)}</div>
        <div className="text-sm text-gray-400">🌬 Wind: {wind.toFixed(1)}</div> */}
      </CardContent>
    </Card>
  );
}
