import { useState, useEffect } from "react";
import { Geocoder } from "@mapbox/search-js-react";
import ForecastScreen from "./screen/ForecastScreen";
import { userForecast } from "./store/index.js"
import "./App.css";

function App() {
  const [inputValue, setValue] = useState("");
  const [coordinates, setCoordinates] = useState();
  const { fetchData } = userForecast()

  const getCoordinates = async (value) => {
    setValue(value.properties.full_address)
    setCoordinates(value.properties.coordinates);
  };

  useEffect(() => {
    const getData = async () => {
      if (!inputValue || !coordinates) {
        return
      } else {
        const url = `https://api.weather.gov/points/${coordinates.latitude},${coordinates.longitude}`;
        try {
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
          }
          const json = await res.json();
          fetchData(json.properties)
        } catch (error) {
          console.error(error);
        }
      }
    };
    getData();
  }, [inputValue, coordinates, fetchData]);

  return (
    <div className="App">
      <Geocoder
        id="city"
        value={inputValue}
        options={{
          country: 'US',
          worldview: 'us'
        }}
        onRetrieve={getCoordinates}
        accessToken={import.meta.env.VITE_GEOCODING_KEY}
      />
      <label htmlFor="start">Start date:</label>
      <input type="date" id="start" name="trip-start" />
      {/* Component here that takes forecastURL as a prop */}
      <ForecastScreen></ForecastScreen>
    </div>
  );
}

export default App;
