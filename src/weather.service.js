const BASE_URL = 'https://api.weather.gov/points/'
const headers = {
    accept: "application/geo+json",
    "user-agent": "chic-swan-8ad817.netlify.app"
}

export function createCoordinatesURL(coordinates) {
  if (
    !coordinates ||
    Object.values(coordinates).includes(undefined) ||
    Object.values(coordinates).every((num) => num === 0)
  ) {
    coordinates = { latitude: 33.7508, longitude: -84.389854 };
  }

  return `${BASE_URL}${coordinates.latitude},${coordinates.longitude}`;
}

// First API Call to /points
export async function fetchGridData(coordinates) {
    let coordinatesResponse = await fetch(createCoordinatesURL(coordinates), {
        headers
      })
    const res = await coordinatesResponse.json()
    return [res.properties.forecast, res.properties.forecastHourly]
}