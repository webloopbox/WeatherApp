import React, { useState, useEffect } from "react";

const useFetch = ({ city }) => {

    const [data, setData] = useState('')
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d990a47f2bb128c66c9fc107340dc956`

    const getData = async () => {
        const response = await fetch(url)
        console.log(response);
        const weatherData = await response.json()
        setData(weatherData)
    }

    useEffect(() => {
        getData()
    }, [])

    return { data }

}
export default useFetch