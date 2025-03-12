import { create } from 'zustand'

const userForecast = create((set, get) => ({
    forecastDataArray: new Set(),
    isLoading: false,
    error: null,
    setLoading: (errors) => {
        if (errors) {
            set({ error: errors, isLoading: false });
        } else {
            set({ isLoading: true, error: null }); // Set loading state
        }
    },
    setData: (payload) => {
        set((state) => ({ forecastDataArray: [payload, state.forecastDataArray], isLoading: false })); // Update state and clear loading
    }
}));

/**
 * Check for duplications:
 * Check if the array has an object
 * Search the array for an object with the same forecast url as url.forecast.
 * 
 */

export { userForecast }