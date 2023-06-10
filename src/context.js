import React, { useContext, useReducer } from "react";
import { reducer } from "./reducer";

const AppContext = React.createContext();

const defaultState = {
  currentCityData: {
    city: "",
    temp: "",
    humidity: "",
    airPressure: "",
    chanceOfRain: "",
    windSpeed: "",
    weatherCondition: "",
    rain: "",
    weatherIcon: "",
  },
  forecastData: "",
  introHideStatus: false,
  activeForm: true,
  activeLoading: false,
  isReady: false,
  errorMessage: "",
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const showCity = (city) => {
    dispatch({ type: "FIND_CITY", payload: city });
  };

  const setCurrentData = (data) => {
    dispatch({ type: "CURRENT_DATA", payload: data });
  };

  const setForecast = (data) => {
    dispatch({ type: "FORECAST_DATA", payload: data });
  };

  const setIntroInvisibility = (data) => {
    dispatch({ type: "INTRO_SCREEN", payload: data });
  };

  const setForm = (data) => {
    dispatch({ type: "FORM", payload: data });
  };

  const setLoading = (data) => {
    dispatch({ type: "LOADING", payload: data });
  };

  const setReady = (data) => {
    dispatch({ type: "READY", payload: data });
  };

  const setError = (data) => {
    dispatch({ type: "ERROR_CITY", payload: data });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        showCity,
        setCurrentData,
        setForecast,
        setIntroInvisibility,
        setForm,
        setLoading,
        setReady,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
