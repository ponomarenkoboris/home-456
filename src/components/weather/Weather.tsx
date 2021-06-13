import React, { useState } from 'react'
import './styles/Weather.scss'
import { WEATHER_API_KEY } from '../../api/apiKeys'
import { weather } from '../../store/weather';

const getDailyForecast = async (latitude: number, longitude: number ): Promise<undefined> => {    
    console.log('getDailyForecast --> ', latitude);
    
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${latitude + ',' + longitude}&days=5&aqi=yes&alerts=yes`)
        const data = await response.json()
        // if (data.code !== 200) throw 'Something went wrong'       
        // TODO debbug (лог выводится 2 раза)
        if (data) weather.setForecast(data)
    } catch (error) {
        return error.message
    }
}

export function Weather() {
    const [, setIsReady] = useState<boolean>(false)

    if (!localStorage.getItem('user_position')) {
        console.log('condition success [!localStorage.getItem(\'user_position\')]');
        
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                localStorage.setItem('user_position', JSON.stringify({ latitude: coords.latitude, longitude: coords.longitude }))
                getDailyForecast(coords.latitude, coords.longitude)
                    .then(() => setIsReady(true))
            });
        }
    }


    if (localStorage.getItem('user_position') && typeof weather.getForecast === 'string') {
        const coords = localStorage.getItem('user_position')
        console.log('condition success [localStorage.getItem(\'user_position\') && typeof weather.getForecast === \'string\']');
        
        if (typeof coords === 'string') {
            const { latitude, longitude } = JSON.parse(coords)
            getDailyForecast(latitude, longitude)
                .then(() => setIsReady(true))
        }
    }

    return (
        <section className="weather-container">
            {typeof weather.getForecast === 'object' ? (
                <div className="location-wrapper">
                    <h1 className="location_name">{weather.getForecast.location?.name}</h1>
                    <h2 className="locaiotn_region">{weather.getForecast.location?.region}</h2>
                    <h3 className="location_country">{weather.getForecast.location?.country}</h3>
                </div>
            ) : ''}
            {/* {typeof weather.getForecast === 'object' && weather.getForecast.location?.name}
            {typeof weather.getForecast === 'object' && weather.getForecast.current?.temp_c} */}
        </section>
    )
}