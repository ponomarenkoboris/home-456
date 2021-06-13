import { action, makeObservable, observable, computed } from 'mobx'

// TODO type Forecast
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

class Weather {
    forecast: Forecast = {}

    constructor() {
        makeObservable(this, {
            forecast: observable,
            getForecast: computed,
            setForecast: action,
        })
    }

    get getForecast() {
        return Object.keys(this.forecast).length === 0 ? 'Прогноз погоды' : this.forecast
    }

    setForecast(value: object) {
        this.forecast = value
    }
}

export const weather = new Weather();