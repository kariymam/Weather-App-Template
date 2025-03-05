import { create } from 'zustand'

const userForecast = create((set) => ({
    forecastDataArray: [],
    fetchData: async (url) => {
        const forecast = await fetch(url.forecast)
        const forecastHourly = await fetch(url.forecastHourly)
        const forecastData = await forecast.json()
        const forecastHourlyData = await forecastHourly.json()
        const payload = {
            forecast: url.forecast,
            forecastHourly: url.forecastHourly,
            forecastData,
            forecastHourlyData
        }

        set((state) => ({ forecastDataArray: [payload, ...state.forecastDataArray] }))
    },
}))

export { userForecast }