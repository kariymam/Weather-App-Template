import { useState, useEffect } from "react";
import { Geocoder } from "@mapbox/search-js-react";
import ForecastScreen from "./screen/ForecastScreen";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState('')
  const [coordinates, setCoordinates] = useState();
  const [forecastProperties, setForecastProperties] = useState()
  const getCoordinates = async (value) => {
    setInputValue(value.properties.full_address)
    setCoordinates(value.properties.coordinates);
  };

  useEffect(() => {
    const getData = async () => {
      if (!coordinates) {
        return
      } else {
        const url = `https://api.weather.gov/points/${coordinates.latitude},${coordinates.longitude}`;
        try {
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
          }
          if (res.ok) {
            const json = await res.json();
            setForecastProperties(json.properties)
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    getData();

  }, [coordinates]);

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
      <ForecastScreen props={forecastProperties}></ForecastScreen>
    </div>
  );
}

export default App;
