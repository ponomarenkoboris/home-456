import React, { useState, useEffect } from 'react'
import { WEATHER_API_KEY } from '../../api/apiKeys'
import { IWeather } from './weatherTypes'
import './styles/Weather.scss'

// TODO complete styles and render logic 
export function Weather() {
    const [weather, setWeather] = useState<IWeather | null>(null)
    const [celsius, setCelsius] = useState<boolean>(true)

    useEffect(() => {
        let isMounted = true
        if ('geolocation' in navigator && !weather) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude }: { latitude: number, longitude: number } = coords
                localStorage.setItem('user_position', JSON.stringify({ latitude, longitude }))
                fetch(`http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${latitude + ',' + longitude}&days=5&aqi=yes&alerts=yes`)
                    .then(result => result.json())
                    .then(data => {
                        isMounted && setWeather(data)
                    })
            })
        }
        return () => { isMounted = false }
    })

    const changeTemp = (e: React.SyntheticEvent) => {
        if ((e.target as Element).textContent === 'F') setCelsius(false)
        if ((e.target as Element).textContent === 'C') setCelsius(true)
    }

    return weather ? (
        <div className="weather">
            <div className="weather__current">
                <div className="current__location">
                    <p>{weather.location.country}</p>
                    <p>{weather.location.region}</p>
                    <p>{weather.location.name}</p>
                </div>
                <div className="current__forecast">
                    <div className="temp__wrapper">
                        <p>{celsius ? weather.current.temp_c : weather.current.temp_f}</p>
                        <div className="temp__selectors" onClick={changeTemp}>
                            <p style={celsius ? { color: '#000' } : { color: '#e9e9e9' }}>&deg;C</p>
                            /
                            <p style={!celsius ? { color: '#000' } : { color: '#e9e9e9' }}>&deg;F</p>
                        </div>
                    </div>
                    <div className="forecast__image">
                        <img src={weather.current.condition.icon} alt="Current weather" />
                        <p>{weather.current.condition.text}</p>
                    </div>
                    <div>
                        {weather.forecast.forecastday.map(day => (
                            <p key={day.date}>{day.date}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="noWeather">
            <h1>Подождите...</h1>
        </div>
    )
}