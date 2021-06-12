import { makeObservable, observable, action } from 'mobx'

class Weather {
    weather: Array<any> = []

    constructor() {
        makeObservable(this, {
            weather: observable,
            addForecast: action
        })
    }

    addForecast(value: Array<any>) {
        this.weather = []
        this.weather.push(value)
    }
}


export default Weather