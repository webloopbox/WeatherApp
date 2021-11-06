import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../context'


const Search = () => {

    const [city, setCity] = useState('')
    const [background, setBackground] = useState('')

    const {setCurrentData, setForecast, setIntroInvisibility, active_form, is_ready,setError, error_message} = useGlobalContext()

    const handleSubmit = (e) => {
        e.preventDefault()
        const url = `https://api.openweathermap.org/data/2.5/forecast?cnt=20&q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        const getData = async () => {
            if(city) {

                var timer1;
                var timer2;


                try {

                    if(is_ready) {
                        setIntroInvisibility(false)
                    }

                    
                    const response = await fetch(url)
                    if(response.ok) {
                        const weatherData = await response.json()
                        // console.log(weatherData);

                        setError(false)

                        // CITY
                        const city = weatherData.city.name

                        // TEMPERATURE
                        const fTemp = weatherData.list[0].main.temp
                        const cTemp = fTemp - 273.15;
                        const temp = cTemp >=0 ? Math.floor(cTemp) + "°C" : Math.ceil(cTemp) + "°C"

                        // HUMIDITY
                        const humidity = weatherData.list[0].main.humidity + "%"

                        // AIR PRESSURE
                        const air_pressure = weatherData.list[0].main.pressure + " hPa"

                        // WIND SPEED
                        const wind_speed = Math.floor(weatherData.list[0].wind.speed * 18/5) + " km/h"

                        // WEATHER CONDITION
                        const weather_condition = weatherData.list[0].weather[0].main

                        // RAIN
                        const rain_checked = weatherData.list[0].rain && weatherData.list[0].rain['3h']
                        const rain = rain_checked ? rain_checked+'mm' : 'brak opadów';

                        // WEATHER ICON
                        const weather_icon = weatherData.list[0].weather[0].icon

                        // FORECAST CARDS
                        const forecast = []
                        for(let i=1;i<=7;i++) {
                            let time = weatherData.list[i].dt_txt;
                            let hour = time.substring(11,time.length-3)
                            // console.log(hour);
                            const fTemp = weatherData.list[i].main.temp
                            const cTemp = fTemp - 273.15;
                            const temperature = cTemp >=0 ? Math.floor(cTemp) + "°C" : Math.ceil(cTemp) + "°C"

                            const feelLike = weatherData.list[i].main.feels_like
                            const cFeelLike= feelLike - 273.15;
                            const feel = cFeelLike >=0 ? Math.floor(cFeelLike) + "°C" : Math.ceil(cFeelLike) + "°C"
                            forecast.push({hour,temperature,feel})
                        }

                       

                        
                        
                        setTimeout(()=>{
                            setCurrentData([city, temp, humidity, air_pressure, wind_speed, weather_condition, rain, weather_icon])
                            setForecast(forecast)
                        }, 300)

                        

                        setTimeout(() => {
                            if(is_ready) {
                                setIntroInvisibility(true)
                            }
                        }, 600)

                    } else {
                        throw new Error("Something went wrong")
                    }
                    
                    
                } catch(err) {
                    setError("Nie znaleziono miasta!")
                    console.log(err);
                }

                //  // SET IMAGE
                //  const image_response = await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${process.env.REACT_APP_IMAGES_API_KEY}`)
                //  const image = await image_response.json()
                // //  console.log(image);
                //  const place_image = image.results[0] && image.results[0].urls.regular;

                //  if(place_image) {
                //     setBackground(place_image)
                //  } else {
                //     setBackground("https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80")
                //  }

                 

            }
        }
        getData()
    }

    // useEffect(() => {
    //     document.body.style.backgroundImage = `url(${background})`
    // },[background])

    return <div className='search-wrapper'>
        <div className={`search-bg ${active_form ? 'intro-open' : ''}`}>
        <form action="" className="search-form">
            
            <input type="text" value={city} placeholder="Wyszukaj miasto..." onChange={(e) => setCity(e.target.value)}/>
            <button type="submit" onClick={handleSubmit}><i className="fas fa-search"></i></button>
            
        </form>
        </div>
        {(error_message) ? <h2 className="error-message">{error_message}</h2> : ''}
    </div>
}

export default Search