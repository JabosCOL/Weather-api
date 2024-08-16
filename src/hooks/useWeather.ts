import { useMemo, useState } from "react"
import { number, object, string, InferOutput, parse  } from "valibot"
import axios from "axios"
import { SearchState } from "../types"

const WeatherSchema = object({
    name: string(),
    main: object({
        temp: number(),
        temp_max: number(),
        temp_min: number()
    })
})

export type WeatherSchema = InferOutput<typeof WeatherSchema>

export default function useWeather() {

    const [weather, setWeather] = useState<WeatherSchema>({
        name: '',
        main: {
            temp: 0,
            temp_max: 0,
            temp_min: 0
        }
    })
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (search: SearchState) => {
        const appId = import.meta.env.VITE_API_KEY
        setLoading(true)

        try {
            const GeoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

            const {data} = await axios(GeoUrl)

            const {lat} = data[0]
            const {lon} = data[0]

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}&units=metric`
            const {data : weatherData} = await axios(weatherUrl)
            const result = parse(WeatherSchema, weatherData)
            if (result) {
                setWeather(result)
                setNotFound(false)
            }

        } catch (error) {
            setWeather({
                name: '',
                main: {
                    temp: 0,
                    temp_max: 0,
                    temp_min: 0
                }
            })
            setNotFound(true)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const hasWeatherData = useMemo(() => weather.name, [weather])

    return {
        weather,
        fetchWeather,
        hasWeatherData,
        loading,
        notFound
    }
}