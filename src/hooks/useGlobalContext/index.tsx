import { useReducer, useContext, ReactNode } from "react";
import { AppContext, defaultState } from "./context";
import { reducer } from "./reducer";
import { GlobalContextActions } from "./models/useGlobalContext.enum";
import { CurrentCityData, ForecastData } from "./models/useGlobalContext.model";

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const setCurrentData = (data: CurrentCityData) => {
    dispatch({ type: GlobalContextActions.setCurrentData, payload: data });
  };

  const setForecast = (data: ForecastData[]) => {
    dispatch({ type: GlobalContextActions.setForecastData, payload: data });
  };

  const setIntroInvisibility = (data: boolean) => {
    dispatch({ type: GlobalContextActions.setIntroScreen, payload: data });
  };

  const setForm = (data: boolean) => {
    dispatch({ type: GlobalContextActions.setForm, payload: data });
  };

  const setLoading = (data: boolean) => {
    dispatch({ type: GlobalContextActions.setLoading, payload: data });
  };

  const setReady = (data: boolean) => {
    dispatch({ type: GlobalContextActions.setReady, payload: data });
  };

  const setError = (data: string) => {
    dispatch({ type: GlobalContextActions.setError, payload: data });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
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

export const useGlobalContext = () => {
  return useContext(AppContext);
};
