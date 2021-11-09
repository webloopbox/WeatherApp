export const reducer = (state, action) => {

    if (action.type === "CURRENT_DATA") {
        const [city, temp, humidity, air_pressure, wind_speed, weather_condition, rain, weather_icon] = action.payload
        const newState = {
            ...state,
            current_city_data: {
                temp,
                city,
                humidity,
                air_pressure,
                wind_speed,
                weather_condition,
                rain,
                weather_icon
            }
        }
        return newState
    }
    if (action.type === "FORECAST_DATA") {

        // console.log(action.payload);
        return { ...state, forecast_data: action.payload }
    }
    if (action.type === "INTRO_SCREEN") {
        return { ...state, intro_hide_status: action.payload }
    }
    if (action.type === "FORM") {
        return { ...state, active_form: action.payload }
    }
    if (action.type === "LOADING") {
        return { ...state, active_loading: action.payload }
    }
    if (action.type === "READY") {
        return { ...state, is_ready: action.payload }
    }
    if (action.type === "ERROR_CITY") {
        return { ...state, error_message: action.payload }
    }

    throw new Error('no matching action type');
};
