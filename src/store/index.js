import { create } from 'zustand'

const userForecast = create((set) => ({
    forecastDataArray: [],
    isLoading: false,
    error: null,
    fetchData: async (url) => {
        set({ isLoading: true, error: null }); // Set loading state
        try {
            const urls = [url.forecast, url.forecastHourly];
            const responses = await Promise.all(urls.map((url) => fetch(url)));
            const errors = responses.filter((response) => !response.ok);

            if (errors.length > 0) {
                throw errors.map((response) => new Error(`Failed to fetch: ${response.statusText}`));
            }

            const data = await Promise.all(responses.map((response) => response.json()));
            const [forecastData, forecastHourlyData] = data;

            const payload = {
                forecast: url.forecast,
                forecastHourly: url.forecastHourly,
                forecastData,
                forecastHourlyData,
            };
            set((state) => ({ forecastDataArray: [payload, ...state.forecastDataArray], isLoading: false })); // Update state and clear loading
        } catch (errors) {
            set({ error: errors, isLoading: false }); // Set error state and clear loading
            console.error('Fetch errors:', errors);
        }
    },
}));

/**
 * Check for duplications:
 * Check if the array has an object
 * Search the array for an object with the same forecast url as url.forecast.
 * 
 */

export { userForecast }