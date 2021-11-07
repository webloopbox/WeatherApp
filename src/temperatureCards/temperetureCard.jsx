import React, { useEffect } from 'react'
import { useGlobalContext } from '../context'
// import Zoom from 'react-reveal/Zoom';


const TemperatureCard = () => {

    const {forecast_data, intro_hide_status,is_ready} = useGlobalContext()
    


    useEffect(() => {
        
        if(is_ready) {
            const leftBtn = document.getElementsByClassName("left-btn")[0]
            const rightBtn = document.getElementsByClassName("right-btn")[0]
            const forecastWrapper = document.getElementsByClassName("forecast-wrapper")[0]
            // console.log(rightBtn);
            leftBtn.addEventListener('click', function() {
                forecastWrapper.scrollLeft -= 100;
            })
            rightBtn.addEventListener('click', function() {
                forecastWrapper.scrollLeft += 100;
            })
        }
       

    }, [is_ready])


    if(!forecast_data) {
        return <p>brak danych</p>
    }


    return (
        <div className={`forecast-wrapper   ${(!intro_hide_status && is_ready) ? 'invisible' : ''}`}>
        {forecast_data.map((item,index)=> {
            const {hour,temperature,feel} = item

            return <article className="forecast-item" key={index}>
                            <p className="hour">{hour}</p>
                            <h1>{temperature}</h1>
                            <p>Odczuwalne {feel}</p>
                        </article>
                    
            
        })}
        <div className="horizontal-nav">
            <div className="nav-bg">
                <button className="left-btn"><i className="fas fa-chevron-left"></i></button>
                <button className="right-btn"><i className="fas fa-chevron-right"></i></button>
            </div>
        </div>
        </div>
    )

 
}

export default TemperatureCard