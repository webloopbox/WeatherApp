import React from 'react'
import { useGlobalContext } from '../context'


const LeftBar = () => {
    
    const {current_city_data,intro_hide_status,is_ready} = useGlobalContext()
    const icon = current_city_data.weather_icon ? `http://openweathermap.org/img/wn/${current_city_data.weather_icon}@2x.png` : ""
    return <div className={`leftbar ${(!intro_hide_status && is_ready) ? 'invisible' : ''}`}>
        <img src={icon} alt="" className='icon' />
        <h2 className='weather-condition'>{current_city_data.weather_condition}</h2>
        <h4 className='city'>{current_city_data.city}</h4>
        <h3 className='current-temperature'>{current_city_data.temp}</h3>
    </div>
}

export default LeftBar