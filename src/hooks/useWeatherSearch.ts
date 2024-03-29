import { useState, useEffect, MouseEventHandler } from "react";
import { getWeather } from "../api/getWeather";
import { getCityImage } from "../api/getCityImage";
import { WeatherCondition } from "../models/weatherCondition.enum";
import { useGlobalContext } from "../hooks/useGlobalContext";

export const useWeatherSearch = () => {
  const [city, setCity] = useState<string>("");
  const [background, setBackground] = useState<string>("");
  const [imageAuthor, setImageAuthor] = useState<string>("");
  const [authorLink, setAuthorLink] = useState<string>("");
  const {
    setCurrentData,
    setForecast,
    setIntroInvisibility,
    activeForm,
    isReady,
    setError,
    errorMessage,
    currentCityData,
  } = useGlobalContext();

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    try {
      if (isReady) {
        setIntroInvisibility(false);
      }

      const weatherData = await getWeather(city);

      setError("");

      // TEMPERATURE
      const fTemp = weatherData.list[0].main.temp;
      const cTemp = fTemp - 273.15;
      const temp =
        cTemp >= 0 ? Math.floor(cTemp) + "°C" : Math.ceil(cTemp) + "°C";

      // HUMIDITY
      const humidity = weatherData.list[0].main.humidity + "%";

      // AIR PRESSURE
      const airPressure = weatherData.list[0].main.pressure + " hPa";

      // WIND SPEED
      const windSpeed =
        Math.floor((weatherData.list[0].wind.speed * 18) / 5) + " km/h";

      // WEATHER CONDITION
      let weatherCondition = weatherData.list[0].weather[0].main;

      switch (weatherCondition) {
        case WeatherCondition.Clouds:
          weatherCondition = "Pochmurnie";
          break;
        case WeatherCondition.Drizzle:
          weatherCondition = "Mżawka";
          break;
        case WeatherCondition.Thunderstorm:
          weatherCondition = "Burza z piorunami";
          break;
        case WeatherCondition.Rain:
          weatherCondition = "Deszcz";
          break;
        case WeatherCondition.Snow:
          weatherCondition = "Śnieg";
          break;
        case WeatherCondition.Mist:
          weatherCondition = "Mgła";
          break;
        case WeatherCondition.Clear:
          weatherCondition = "Bezchmurnie";
          break;
        default:
          console.log("EN");
      }

      // RAIN
      const rainChecked =
        weatherData.list[0].rain && weatherData.list[0].rain["3h"];
      const rain = rainChecked ? rainChecked + "mm" : "brak opadów";

      // WEATHER ICON
      const weatherIcon = weatherData.list[0].weather[0].icon;

      // FORECAST CARDS
      const forecast = weatherData.list.slice(1, 10).map((item) => {
        const time = item.dt_txt.slice(11, -3);
        const fTemp = item.main.temp;
        const cTemp = fTemp - 273.15;
        const temperature =
          cTemp >= 0 ? Math.floor(cTemp) + "°C" : Math.ceil(cTemp) + "°C";

        const feelLike = item.main.feels_like;
        const cFeelLike = feelLike - 273.15;
        const feel =
          cFeelLike >= 0
            ? Math.floor(cFeelLike) + "°C"
            : Math.ceil(cFeelLike) + "°C";

        return { hour: time, temperature, feel };
      });

      setCurrentData({
        city,
        temp,
        humidity,
        airPressure,
        windSpeed,
        weatherCondition,
        rain,
        weatherIcon,
      });

      setForecast(forecast);

      setTimeout(() => {
        if (isReady) {
          setIntroInvisibility(true);
        }
      }, 600);
    } catch (err) {
      setError("Nie znaleziono miasta!");
      console.log(err);
    }

    // SET IMAGE
    try {
      const { user, urls } = await getCityImage(city);

      const placeImage = urls.regular;

      if (placeImage) {
        const lastName = user.last_name || "";
        const imageAuthor = `${user.first_name} ${lastName}`;
        const authorLink = user.links.html;

        setImageAuthor(imageAuthor);
        setAuthorLink(authorLink);
        setBackground(placeImage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (imageAuthor && authorLink && currentCityData.city) {
      document.body.style.backgroundImage = `url(${background})`;

      const imageAuthorElement = document.getElementById("image-author");
      if (imageAuthorElement instanceof HTMLAnchorElement) {
        imageAuthorElement.innerHTML = imageAuthor;
        imageAuthorElement.href = authorLink;
      }
    }
  }, [background]);

  return {
    city,
    setCity,
    handleSubmit,
    activeForm,
    errorMessage,
  };
};
