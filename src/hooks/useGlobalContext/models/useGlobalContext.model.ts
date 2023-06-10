export interface CurrentCityData {
  city: string;
  temp: string;
  humidity: string;
  airPressure: string;
  windSpeed: string;
  weatherCondition: string;
  rain: string;
  weatherIcon: string;
}

export interface ForecastData {
  feel: string;
  hour: string;
  temperature: string;
}
[];

export interface BaseAppContext {
  currentCityData: CurrentCityData;
  forecastData: ForecastData[];
  introHideStatus: boolean;
  activeForm: boolean;
  activeLoading: boolean;
  isReady: boolean;
  errorMessage: string;
}

export interface ContextProps {
  setCurrentData: (data: CurrentCityData) => void;
  setForecast: (data: ForecastData[]) => void;
  setIntroInvisibility: (data: boolean) => void;
  setForm: (data: boolean) => void;
  setLoading: (data: boolean) => void;
  setReady: (data: boolean) => void;
  setError: (data: string) => void;
}
