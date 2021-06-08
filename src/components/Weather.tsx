import React  from 'react'
import './styles/Weather.scss'
// import { GOOGLE_GEOCODE_KEY } from "../api/api";

// const getDailyForecast = async (latitude: number, longitude: number): Promise<any> => {
//     const url = encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_GEOCODE_KEY}`)
//     try {
//         const response = await fetch(url);
//         const someData = await response.json()
//         console.log(someData)
//         return response
//     } catch (e) {
//
//     }
// }


export function Weather() {
    // const [weather, setWeather] = useState<Array<number | null>>([])
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            // setWeather([position.coords.latitude, position.coords.longitude])
            // getDailyForecast(position.coords.latitude, position.coords.longitude)
            console.log(position)
        })
    }

    return (
        <section className="weather-container">
            <h1>Hello weather</h1>
        </section>
    )
}