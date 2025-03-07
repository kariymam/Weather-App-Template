import { useState, useEffect } from "react";
import { Geocoder } from "@mapbox/search-js-react";
import ForecastScreen from "./screen/ForecastScreen";
import { msg } from "./data/index"
import './colors.css'
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState('')
  const [h1, setH1] = useState('')
  const [coordinates, setCoordinates] = useState({});
  const [forecastProperties, setForecastProperties] = useState()
  const [status, setStatus] = useState(msg.errors.empty);

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const getCoordinates = (value) => {
    setInputValue(value.properties.full_address)
    setH1(value.properties.full_address)
    setCoordinates(value.properties.coordinates);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    if (coordinates.latitude && coordinates.longitude) {
      const getData = async () => {
          const url = `https://api.weather.gov/points/${coordinates.latitude},${coordinates.longitude}`;
          setStatus(msg.initial.loading)
          try {
            const res = await fetch(url, { signal });
            if (!res.ok) {
              setStatus(msg.errors.server)
              throw new Error(`Response status: ${res.status}`);
            }
            if (res.ok) {
              const json = await res.json();
              setForecastProperties(json.properties)
            }
          } catch (error) {
            if (error.name !== "AbortError") {
              setStatus(msg.errors.server);
              console.error(error);
            }
          }
      };
      getData();
    }

    return () => {
      abortController.abort();
    };

  }, [coordinates]);

  return (
    <div className="App">
      <header>
        <div className="flex items-start test">
          <h2>Weather App</h2>
        </div>
        <Geocoder
          id="city"
          value={inputValue}
          options={{
            country: 'US',
            worldview: 'us',
            types: 'place',
          }}
          onChange={handleChange}
          onRetrieve={getCoordinates}
          accessToken={import.meta.env.VITE_GEOCODING_KEY}
        />
      </header>
      <ForecastScreen header={h1} props={forecastProperties} msgs={status}></ForecastScreen>
    </div>
  );
}

export default App;
