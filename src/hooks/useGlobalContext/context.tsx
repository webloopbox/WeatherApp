import React from "react";
import {
  BaseAppContext,
  ContextProps,
  CurrentCityData,
  ForecastData,
} from "./models/useGlobalContext.model";

export const defaultState = {
  currentCityData: {
    city: "",
    temp: "",
    humidity: "",
    airPressure: "",
    windSpeed: "",
    weatherCondition: "",
    rain: "",
    weatherIcon: "",
  },
  forecastData: [],
  introHideStatus: false,
  activeForm: true,
  activeLoading: false,
  isReady: false,
  errorMessage: "",
};

export const AppContext = React.createContext<BaseAppContext & ContextProps>({
  ...(defaultState as BaseAppContext),
  setCurrentData: (data: CurrentCityData) => undefined,
  setForecast: (data: ForecastData[]) => undefined,
  setIntroInvisibility: (data: boolean) => undefined,
  setForm: (data: boolean) => undefined,
  setLoading: (data: boolean) => undefined,
  setReady: (data: boolean) => undefined,
  setError: (data: string) => undefined,
});
