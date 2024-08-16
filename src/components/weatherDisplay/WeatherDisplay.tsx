import { motion } from "framer-motion"
import { WeatherSchema } from "../../hooks/useWeather"
import styles from "./WeatherDisplay.module.css"

type WeatherDisplayProps = {
    weather: WeatherSchema
}

export default function WeatherDisplay({ weather }: WeatherDisplayProps) {
    return (
        <motion.div
            className={styles.weather}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <h2>Weather in {weather.name}</h2>
            <p className={styles.temp}>{+weather.main.temp.toFixed() >= 20 ? '☀' : '❄'} {''}{(weather.main.temp).toFixed()}&deg;C</p>
            <div className={styles.minMax}>
                <p><span>Min temp:</span> {''}{(weather.main.temp_min).toFixed()}&deg;C</p>
                <p><span>Max temp:</span> {''}{(weather.main.temp_max).toFixed()}&deg;C</p>
            </div>
        </motion.div>
    )
}
