import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../context'
import countryList from './list'


const Search = () => {

    const [city, setCity] = useState('')
    const [background, setBackground] = useState('')
    const [imageAuthor, setImageAuthor] = useState('')
    const [authorLink, setAuthorLink] = useState('')

    const {setCurrentData, setForecast, setIntroInvisibility, active_form, is_ready,setError, error_message, current_city_data} = useGlobalContext()

    const handleSubmit = (e) => {
        e.preventDefault()
        const url = `https://api.openweathermap.org/data/2.5/forecast?cnt=10&q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        const getData = async () => {
            if(city) {

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
                        let weather_condition = weatherData.list[0].weather[0].main
                        
                        switch (weather_condition) {
                            case 'Clouds':
                                weather_condition = "Pochmurnie"
                              break;
                            case 'Drizzle':
                                weather_condition = "Mżawka"
                              break;
                            case 'Thunderstorm':
                                weather_condition = "Burza z piorunami"
                              break;
                            case 'Rain':
                                weather_condition = "Deszcz"
                              break;
                            case 'Snow':
                                weather_condition = "Śnieg"
                              break;
                            case 'Mist':
                                weather_condition = "Mgła"
                              break;
                            case 'Clear':
                                weather_condition = "Bezchmurnie"
                            default:
                              console.log(`EN`)
                          }
                          

                        // RAIN
                        const rain_checked = weatherData.list[0].rain && weatherData.list[0].rain['3h']
                        const rain = rain_checked ? rain_checked+'mm' : 'brak opadów';

                        // WEATHER ICON
                        const weather_icon = weatherData.list[0].weather[0].icon

                        // FORECAST CARDS
                        const forecast = []
                        for(let i=1;i<10;i++) {
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

                        
                        setCurrentData([city, temp, humidity, air_pressure, wind_speed, weather_condition, rain, weather_icon])
                        setForecast(forecast)

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

                 // SET IMAGE
                 const image_response = await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${process.env.REACT_APP_IMAGES_API_KEY}`);
                 const image = await image_response.json();
                 
                (function() {
                    if(image.results[0]) {
                        for(let outer=0; outer<image.results.length; outer++) {
                            let current_index_tags = image.results[outer].tags
                            const place_image = image.results[outer] && image.results[outer].urls.regular;
       
                            for(let inner=0;inner<current_index_tags.length;inner++) {

                            for(let cl=0; cl<countryList.length; cl++) {
                                if((countryList[cl].name_pl == current_index_tags[inner].title) || (countryList[cl].name_en == current_index_tags[inner].title) || (countryList.includes(current_index_tags[inner].title))) {
                                    
                                    const image_author = `${image.results[outer].user.first_name} ${image.results[outer].user.last_name}`
                                    const author_link = image.results[outer].user.links.html

                                    console.log(author_link);
                                    console.log(image_author);
                                    
                                    setImageAuthor(image_author)
                                    setAuthorLink(author_link)
                                    setBackground(place_image)
                                    return 0;
                                    }
                            }



                            }
                        }

                       }
                       setBackground("https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80")

                })()
                
                 

                 

            }
        }
        getData()
    }

    useEffect(() => {
        if(imageAuthor&&authorLink&&current_city_data.city) {
            document.body.style.backgroundImage = `url(${background})`
            document.getElementById("image-author").innerHTML = imageAuthor
            document.getElementById("image-author").href = authorLink
        }
       
    },[background])

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