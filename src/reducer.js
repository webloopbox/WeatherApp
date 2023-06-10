export const reducer = (state, action) => {
  if (action.type === "CURRENT_DATA") {
    const [
      city,
      temp,
      humidity,
      airPressure,
      windSpeed,
      weatherCondition,
      rain,
      weatherIcon,
    ] = action.payload;
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
  if (action.type === "FORECAST_DATA") {
    // console.log(action.payload);
    return { ...state, forecastData: action.payload };
  }
  if (action.type === "INTRO_SCREEN") {
    return { ...state, introHideStatus: action.payload };
  }
  if (action.type === "FORM") {
    return { ...state, activeForm: action.payload };
  }
  if (action.type === "LOADING") {
    return { ...state, activeLoading: action.payload };
  }
  if (action.type === "READY") {
    return { ...state, isReady: action.payload };
  }
  if (action.type === "ERROR_CITY") {
    return { ...state, errorMessage: action.payload };
  }

  throw new Error("no matching action type");
};
