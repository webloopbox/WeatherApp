import { useEffect } from "react";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";
import Search from "./components/Search";
import TemperatureCard from "./components/TemperatureCard";
import IntroScreen from "./components/IntroScreen";
import { GlobalContextProvider } from "./useGlobalContext";

const App = () => {
  useEffect(() => {
    const images = document.getElementsByTagName("img");
    Array.from(images).forEach((img) => img.setAttribute("draggable", "false"));
  }, []);

  return (
    <div id="app">
      <GlobalContextProvider>
        <IntroScreen>
          <LeftBar />
          <Search />
          <RightBar />
          <TemperatureCard />
        </IntroScreen>
      </GlobalContextProvider>
    </div>
  );
};
export default App;
