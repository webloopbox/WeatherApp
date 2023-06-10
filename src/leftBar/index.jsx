import { useGlobalContext } from "../context";

const LeftBar = () => {
  const { currentCityData, introHideStatus, isReady } = useGlobalContext();

  const icon = currentCityData.weatherIcon
    ? `http://openweathermap.org/img/wn/${currentCityData.weatherIcon}@2x.png`
    : "";

  return (
    <div
      className={`leftbar ${!introHideStatus && isReady ? "invisible" : ""}`}
    >
      <img src={icon} alt="" className="icon" />
      <h2 className="weather-condition">{currentCityData.weatherCondition}</h2>
      <h4 className="city">{currentCityData.city}</h4>
      <h3 className="current-temperature">{currentCityData.temp}</h3>
    </div>
  );
};

export default LeftBar;
