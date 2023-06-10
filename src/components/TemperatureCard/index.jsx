import { useEffect } from "react";
import { useGlobalContext } from "../../useGlobalContext";

const TemperatureCard = () => {
  const { forecastData, introHideStatus, isReady } = useGlobalContext();

  useEffect(() => {
    if (isReady) {
      const leftBtn = document.getElementsByClassName("left-btn")[0];
      const rightBtn = document.getElementsByClassName("right-btn")[0];
      const forecastWrapper =
        document.getElementsByClassName("forecast-wrapper")[0];

      leftBtn.addEventListener("click", function () {
        forecastWrapper.scrollLeft -= 100;
      });
      rightBtn.addEventListener("click", function () {
        forecastWrapper.scrollLeft += 100;
      });
    }
  }, [isReady]);

  if (!forecastData) {
    return <p>brak danych</p>;
  }
  return (
    <>
      <div
        className={`forecast-wrapper   ${
          !introHideStatus && isReady ? "invisible" : ""
        }`}
      >
        {forecastData.map((item, index) => {
          const { hour, temperature, feel } = item;

          return (
            <article className="forecast-item" key={index}>
              <p className="hour">{hour}</p>
              <h1>{temperature}</h1>
              <p>Odczuwalne {feel}</p>
            </article>
          );
        })}
        <div className="horizontal-nav">
          <div className="nav-bg">
            <button className="left-btn">
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="right-btn">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
      <p
        className={`attribution  ${
          !introHideStatus && isReady ? "invisible" : ""
        }`}
      >
        Photo by <a href="#" id="image-author" target="_blank"></a> on{" "}
        <a href="https://unsplash.com" target="_blank">
          Unsplash
        </a>
      </p>
    </>
  );
};

export default TemperatureCard;
