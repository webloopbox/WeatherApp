import React, { useContext, useReducer } from 'react'
import { reducer } from './reducer'

const AppContext = React.createContext()

const defaultState = {
    current_city_data: {
        city: '',
        temp: '',
        humidity: '',
        air_pressure: '',
        chance_of_rain: '',
        wind_speed: '',
        weather_condition: '',
        rain: '',
        weather_icon: ''
    },
    forecast_data: '',
    intro_hide_status: false,
    active_form: true,
    active_loading: false,
    is_ready: false,
    error_message: ''
}

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const showCity = (city) => {
        dispatch({ type: "FIND_CITY", payload: city })
    }

    const setCurrentData = (data) => {
        dispatch({ type: "CURRENT_DATA", payload: data })
    }

    const setForecast = (data) => {
        dispatch({ type: "FORECAST_DATA", payload: data })
    }

    const setIntroInvisibility = (data) => {
        dispatch({ type: "INTRO_SCREEN", payload: data })
    }
    const setForm = (data) => {
        dispatch({ type: "FORM", payload: data })
    }
    const setLoading = (data) => {
        dispatch({ type: "LOADING", payload: data })
    }
    const setReady = (data) => {
        dispatch({ type: "READY", payload: data })
    }
    const setError = (data) => {
        dispatch({ type: "ERROR_CITY", payload: data })
    }


    return <AppContext.Provider value={{ ...state, showCity, setCurrentData, setForecast, setIntroInvisibility, setForm, setLoading, setReady, setError }} >
        {children}
    </AppContext.Provider>
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export {
    AppContext,
    AppProvider,
    useGlobalContext
}