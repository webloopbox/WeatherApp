import { useEffect } from "react";
import { useGlobalContext } from "../../hooks/useGlobalContext";

const IntroScreen = ({ children }: { children: JSX.Element[] }) => {
  const {
    currentCityData,
    setIntroInvisibility,
    setForm,
    setLoading,
    activeLoading,
    setReady,
    isReady,
  } = useGlobalContext();

  const { city } = currentCityData;

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.style.overflowY = "hidden";

    if (city) {
      setForm(false);
      setLoading(true);

      setTimeout(() => {
        setIntroInvisibility(true);

        // STOP LOADING
        setLoading(false);
        setReady(true);

        body.style.overflowY = "auto";
      }, 1500);
    }
  }, [city]);

  return (
    <>
      <div className={`intro-screen ${isReady ? "invisible" : ""}`}>
        <div className={`loading ${activeLoading ? "active" : ""}`}>
          <span className="circle circle-1"></span>
          <span className="circle circle-2"></span>
          <span className="circle circle-3"></span>
          <span className="circle circle-4"></span>
          <span className="circle circle-5"></span>
          <span className="circle circle-6"></span>
          <span className="circle circle-7"></span>
          <span className="circle circle-8"></span>
        </div>
      </div>
      {children}
    </>
  );
};

export default IntroScreen;
