import { WeatherDataResponse } from "../models/weatherData.models";

export const getWeather = async (
  city: string
): Promise<WeatherDataResponse> => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return await response.json();
};
