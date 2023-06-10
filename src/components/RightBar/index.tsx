import humidityIcon from "../../assets/icons8-humidity-100.png";
import pressureIcon from "../../assets/icons8-pressure-100.png";
import rainIcon from "../../assets/icons8-rain-100.png";
import windIcon from "../../assets/icons8-wind-100.png";
import { useGlobalContext } from "../../hooks/useGlobalContext";

const LeftBar = () => {
  const { currentCityData, introHideStatus, isReady } = useGlobalContext();

  return (
    <div
      className={`rightbar  ${!introHideStatus && isReady ? "invisible" : ""} `}
    >
      <div className="right-bar-item">
        <div className="right-bar-icon">
          <img src={humidityIcon} alt="" />
        </div>
        <h6>Wilgotność</h6>
        <p>{currentCityData.humidity}</p>
      </div>
      <div className="right-bar-item">
        <div className="right-bar-icon">
          <img src={pressureIcon} alt="" />
        </div>
        <h6>Ciśnienie powietrza</h6>
        <p>{currentCityData.airPressure}</p>
      </div>
      <div className="right-bar-item">
        <div className="right-bar-icon">
          <img src={rainIcon} alt="" />
        </div>
        <h6>Opady deszczu</h6>
        <p>{currentCityData.rain}</p>
      </div>
      <div className="right-bar-item">
        <div className="right-bar-icon">
          <img src={windIcon} alt="" />
        </div>
        <h6>Prędkość wiatru</h6>
        <p>{currentCityData.windSpeed}</p>
      </div>
    </div>
  );
};

export default LeftBar;
