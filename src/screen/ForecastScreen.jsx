import { userForecast } from "../store/index.js"

const ForecastScreen = () => {
    const { forecastDataArray } = userForecast()
    if (forecastDataArray.length > 0) {
        const weeklyForecast = forecastDataArray[0].forecastData.properties.periods
        return (
            <div>
            {weeklyForecast.map((item, index) => (
                <>
                    <p>{item.name}</p>
                    <p>{item.startTime}</p>
                    <p>{item.temperature}</p>
                </>
            ))}
    
            </div>
        )
    }
}

export default ForecastScreen