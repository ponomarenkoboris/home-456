import React, { useState } from 'react'
import { WEATHER_API_KEY } from '../../api/apiKeys'

// TODO styles and render logic
export function Weather() {    
    const [weather, setWeather] = useState<object | null>(null)

    if (weather === null && 'geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { latitude, longitude }: { latitude: number, longitude: number } = coords
            fetch(`http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${latitude + ',' + longitude}&days=5&aqi=yes&alerts=yes`)
                .then(result => result.json())
                .then(data => {
                    setWeather(data)
                })
        })
    }

    return (
        <div className="weather">
            <h1>{weather === null ? 'Прогноз погоды' : JSON.stringify(weather)}</h1>
        </div>
    )
}