import { useEffect } from "react";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import Search from "./Search";
import TemperatureCard from "./TemperatureCard";
import IntroScreen from "./IntroScreen";
import { AppProvider } from "./context";
import useFetch from "./useFetch";

const App = () => {
  useEffect(() => {
    const images = document.getElementsByTagName("img");
    Array.from(images).forEach((img) => {
      img.setAttribute("draggable", false);
    });
  }, []);

  return (
    <div id="app">
      <AppProvider>
        <IntroScreen>
          <LeftBar />
          <Search />
          <RightBar />
          <TemperatureCard />
        </IntroScreen>
      </AppProvider>
    </div>
  );
};
export default App;
