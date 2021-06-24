import React, { useState } from 'react'
import { WEATHER_API_KEY } from '../../api/apiKeys'
import './styles/Weather.scss'

interface IWeather {
    location: {
        name: string,
        region: string,
        country: string
    },
    current: {
        temp_c: number,
        condition: {
            icon: string
        }
    }
}

// TODO styles and render logic 
export function Weather() {
    const [weather, setWeather] = useState<IWeather | null>(null)
    
    if (weather === null && 'geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { latitude, longitude }: { latitude: number, longitude: number } = coords
            fetch(`http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${latitude + ',' + longitude}&days=5&aqi=no&alerts=yes`)
                .then(result => result.json())
                .then(data => {
                    setWeather(data)
                })
        })
    }

    return weather ? (
        <div className="weather">
            <div className="weather__header">
                <p>{weather.location.name},&nbsp;</p>
                <p>{weather.location.region},&nbsp;</p>
                <p>{weather.location.country}</p>
            </div>
            <div className="weather__body">
                <h1>{weather.current.temp_c}&nbsp;c.</h1>
            </div>
        </div>
    ) : (
        <div className="notWeather">
            <h1>Подождите...</h1>
        </div>
    )
}