import React, { useState, useEffect } from 'react'
import './styles/Weather.scss'
import { WEATHER_API_KEY } from '../api/api'
// import WeatherObserv from '../store/weather'
import { observer } from 'mobx-react-lite'

const getDailyForecast = async (cityName: string): Promise<Array<any> | string> => {   
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&cnt=16&appid=${WEATHER_API_KEY}`)
        const weatherData = await response.json()
        if (weatherData.code !== 200) throw weatherData
        return weatherData
    } catch (error) {
        console.error('Error, line [13: getDailyForecast]', error.message)
        return 'Sorry, something went wrong'
    }
}

export const Weather = observer(() => {
    const initialCity = 'Введите название города'
    const [cityName, setCityName] = useState<string>(localStorage.getItem('user_location') || initialCity)
    const [forecast, setForecast] = useState<Array<any> | string>([])

    useEffect(() => {
        if (cityName !== initialCity) getDailyForecast(cityName).then(data => setForecast(data)).catch(err => setForecast(err))
    }, [cityName])

    const getCity = () => {
        const city: string | null = prompt('Введите название города')
        if (typeof city === 'string' && city.trim().length > 0) {
            localStorage.setItem('user_location', city)
            setCityName(city)
        }
    }

    return (
        <section className="weather-container">
            {cityName}
            <button onClick={getCity}>Изменить город</button>
            <div>{JSON.stringify(forecast)}</div>
        </section>
    )
})