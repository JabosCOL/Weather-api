import useWeather from "./hooks/useWeather"
import styles from "./App.module.css"
import Form from "./components/form/Form"
import WeatherDisplay from "./components/weatherDisplay/WeatherDisplay"
import Spinner from "./components/spinner/Spinner"
import Alert from "./components/alert/Alert"

function App() {

	const { weather, fetchWeather, hasWeatherData, loading, notFound } = useWeather()

	return (
		<>
			<h1 className={styles.tittle}>Weather APP</h1>

			<div className={styles.container}>
				<Form
					fetchWeather={fetchWeather}
				/>
				{loading ? <Spinner />
					: hasWeatherData ? <WeatherDisplay weather={weather} />
						: notFound && <Alert seconds={4}>City not found for this country, please try again with another one.</Alert>
				}
			</div>
		</>
	)
}

export default App
