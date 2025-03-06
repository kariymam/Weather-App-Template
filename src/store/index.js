import { create } from 'zustand'

const userForecast = create((set) => ({
    forecastDataArray: [] || '',
    fetchData: async (url) => {
        try {
        const urls = [
            url.forecast,
            url.forecastHourly
        ]

        const requests = urls.map((v) => fetch(v));
        const responses = await Promise.all(requests);
        const errors = responses.filter((response) => !response.ok);

        if (errors.length > 0) {
            throw errors.map((response) => Error(response.statusText));
        }

        const json = responses.map((response) => response.json());
        const [...data] = await Promise.all(json);
        const [forecastData, forecastHourlyData] = data

        const payload = {
           forecast: url.forecast,
            forecastHourly: url.forecastHourly,
            forecastData,
            forecastHourlyData
        }

        set((state) => ({ forecastDataArray: [payload] }))

        } catch (errors) {
            errors.forEach((error) => console.error(error));
        }
    },
}))

export { userForecast }