import { action, makeObservable, observable, computed } from 'mobx'

interface Forecast {
    location?: {
        name: string,
        region: string,
        country: string
    },
    current?: {
        temp_c: string,
        wind_kph: number,
        cloud: number
    }
    forecast?: {
        forecastday?: Array<any>
    }
}

interface WeatherTypes {
    weather: Forecast,
    getForecast: Forecast | string,
    setForecast: (val: Forecast) => void
}

class Weather implements WeatherTypes {
    weather: Forecast = {}

    constructor() {
        makeObservable(this, {
            weather: observable,
            getForecast: computed,
            setForecast: action,
        })
    }

    get getForecast() {
        return Object.keys(this.weather).length === 0 ? 'Прогноз погоды' : this.weather
    }

    setForecast(value: object) {
        this.weather = value
    }
}

export const weather = new Weather();