import { GlobalContextActions } from "./useGlobalContext.enum";
import { CurrentCityData, ForecastData } from "./useGlobalContext.model";

interface SetCurrentData {
  type: GlobalContextActions.setCurrentData;
  payload: CurrentCityData;
}
interface SetForecastData {
  type: GlobalContextActions.setForecastData;
  payload: ForecastData[];
}
interface SetIntroScreen {
  type: GlobalContextActions.setIntroScreen;
  payload: boolean;
}
interface SetForm {
  type: GlobalContextActions.setForm;
  payload: boolean;
}
interface SetLoading {
  type: GlobalContextActions.setLoading;
  payload: boolean;
}
interface SetReady {
  type: GlobalContextActions.setReady;
  payload: boolean;
}
interface SetError {
  type: GlobalContextActions.setError;
  payload: string;
}

export type GlobalContextReducerAction =
  | SetCurrentData
  | SetForecastData
  | SetIntroScreen
  | SetForm
  | SetLoading
  | SetReady
  | SetError;
