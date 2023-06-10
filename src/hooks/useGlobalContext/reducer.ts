import { GlobalContextReducerAction } from "./models/useGlobalContext.actions";
import { GlobalContextActions } from "./models/useGlobalContext.enum";
import { BaseAppContext } from "./models/useGlobalContext.model";

export const reducer = (
  state: BaseAppContext,
  action: GlobalContextReducerAction
): BaseAppContext => {
  if (action.type === GlobalContextActions.setCurrentData) {
    const {
      city,
      temp,
      humidity,
      airPressure,
      windSpeed,
      weatherCondition,
      rain,
      weatherIcon,
    } = action.payload;
    const newState = {
      ...state,
      currentCityData: {
        temp,
        city,
        humidity,
        airPressure,
        windSpeed,
        weatherCondition,
        rain,
        weatherIcon,
      },
    };
    return newState;
  }
  if (action.type === GlobalContextActions.setForecastData) {
    return { ...state, forecastData: [...action.payload] };
  }
  if (action.type === GlobalContextActions.setIntroScreen) {
    return { ...state, introHideStatus: action.payload };
  }
  if (action.type === GlobalContextActions.setForm) {
    return { ...state, activeForm: action.payload };
  }
  if (action.type === GlobalContextActions.setLoading) {
    return { ...state, activeLoading: action.payload };
  }
  if (action.type === GlobalContextActions.setReady) {
    return { ...state, isReady: action.payload };
  }
  if (action.type === GlobalContextActions.setError) {
    return { ...state, errorMessage: action.payload };
  }

  throw new Error("no matching action type");
};
