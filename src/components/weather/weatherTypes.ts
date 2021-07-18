type ConditionType = {
    icon: string,
    text: string
}

export interface IWeather {
    location: {
        name: string,
        region: string,
        country: string
    },
    current: {
        temp_c: number,
        temp_f: number,
        condition: ConditionType
    },
    forecast: {
        forecastday: [
            {
                date: string,
                astro: {
                    sunrise: string,
                    sunset: string
                },
                hour: [
                    {
                        time: string,
                        temp_c: number,
                        tmep_f: number,
                        condition: ConditionType
                    }
                ]
            }
        ]
    }
}