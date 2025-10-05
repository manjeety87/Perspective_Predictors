export function getWeatherIcon(temp: number, rain: number, wind: number) {
  // Convert Kelvin to Celsius if needed
  const tempC = temp > 100 ? temp - 273.15 : temp;

  // 🧊 Temperature Icons
  if (tempC <= 10) return "../Icons/templow.png"; // cold
  if (tempC > 10 && tempC <= 25) return "../Icons/tempmid.png"; // mild
  if (tempC > 25) return "../Icons/temphigh.png"; // hot

  // 🌧 Rain Icons
  if (rain > 0.5) return "../Icons/rainhigh.png";
  if (rain > 0.1) return "../Icons/rainmid.png";
  if (rain > 0.01) return "../Icons/rainlow.png";

  // 💨 Wind Icons
  if (wind > 40) return "../Icons/windhigh.png";
  if (wind > 20) return "../Icons/windmid.png";
  return "../Icons/windlow.png";
}
