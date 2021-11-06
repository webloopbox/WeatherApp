import React from 'react'
import { useGlobalContext } from '../context'

import humidityIcon from '../assets/icons8-humidity-100.png'
import pressureIcon from '../assets/icons8-pressure-100.png'
import rainIcon from '../assets/icons8-rain-100.png'
import windIcon from '../assets/icons8-wind-100.png'

const LeftBar = () => {

   const {current_city_data,intro_hide_status,is_ready} = useGlobalContext()
   // console.log(current_city_data);

    return <div className={`rightbar  ${(!intro_hide_status && is_ready) ? 'invisible' : ''} `}>
        <div className='right-bar-item'>
           <div className="right-bar-icon">
            <img src={humidityIcon} alt="" /> 
           </div>
           <h6>Wilgotność</h6>
           <p>{current_city_data.humidity}</p>
        </div>
        <div className='right-bar-item'>
           <div className="right-bar-icon">
            <img src={pressureIcon} alt="" /> 
           </div>
           <h6>Ciśnienie powietrza</h6>
           <p>{current_city_data.air_pressure}</p>
        </div>
        <div className='right-bar-item'>
           <div className="right-bar-icon">
            <img src={rainIcon} alt="" /> 
           </div>
           <h6>Opady deszczu</h6>
           <p>{ current_city_data.rain }</p>
        </div>
        <div className='right-bar-item'>
           <div className="right-bar-icon">
            <img src={windIcon} alt="" /> 
           </div>
           <h6>Prędkość wiatru</h6>
           <p>{current_city_data.wind_speed}</p>
        </div>
    </div>
}

export default LeftBar