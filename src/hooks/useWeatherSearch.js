import { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import countryList from "../helpers/countryList.helper";
import { getWeather } from "../api/getWeather";
import { getCityImage } from "../api/getCityImage";

export const useWeatherSearch = () => {
  const [city, setCity] = useState("");
  const [background, setBackground] = useState("");
  const [imageAuthor, setImageAuthor] = useState("");
  const [authorLink, setAuthorLink] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isReady) {
        setIntroInvisibility(false);
      }

      const weatherData = await getWeather(city);

      setError(false);

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
        case "Clouds":
          weatherCondition = "Pochmurnie";
          break;
        case "Drizzle":
          weatherCondition = "Mżawka";
          break;
        case "Thunderstorm":
          weatherCondition = "Burza z piorunami";
          break;
        case "Rain":
          weatherCondition = "Deszcz";
          break;
        case "Snow":
          weatherCondition = "Śnieg";
          break;
        case "Mist":
          weatherCondition = "Mgła";
          break;
        case "Clear":
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

      setCurrentData([
        city,
        temp,
        humidity,
        airPressure,
        windSpeed,
        weatherCondition,
        rain,
        weatherIcon,
      ]);
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
      const image = await getCityImage(city);

      const placeImage = image.results[0] && image.results[0].urls.regular;

      const placeTags = image.results.flatMap((result) =>
        result.tags.map((tag) => tag.title)
      );
      const countryTag = countryList.find(
        (country) =>
          placeTags.includes(country.name_pl) ||
          placeTags.includes(country.name_en) ||
          countryList.includes(country)
      );

      if (placeImage && countryTag) {
        const lastName = image.results[0].user.last_name || "";
        const imageAuthor = `${image.results[0].user.first_name} ${lastName}`;
        const authorLink = image.results[0].user.links.html;

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
      document.getElementById("image-author").innerHTML = imageAuthor;
      document.getElementById("image-author").href = authorLink;
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
