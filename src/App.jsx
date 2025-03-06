import { useState, useEffect, useRef } from "react";
import { Geocoder } from "@mapbox/search-js-react";
import ForecastScreen from "./screen/ForecastScreen";
import { msg } from "./data/index"
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState('')
  const [coordinates, setCoordinates] = useState({});
  const [forecastProperties, setForecastProperties] = useState()
  const [status, setStatus] = useState(msg.errors.empty);

  const getCoordinates = (value) => {
    setCoordinates(value.properties.coordinates);
  };

  useEffect(() => {
    if (coordinates.latitude && coordinates.longitude) {
      const getData = async () => {
          const url = `https://api.weather.gov/points/${coordinates.latitude},${coordinates.longitude}`;
          setStatus(msg.initial.loading)
          try {
            const res = await fetch(url);
            if (!res.ok) {
              setStatus(msg.errors.server)
              throw new Error(`Response status: ${res.status}`);
            }
            if (res.ok) {
              setStatus(msg.initial.loading)
              const json = await res.json();
              setForecastProperties(json.properties)
            }
          } catch (error) {
            setStatus(msg.errors.server)
            console.error(error);
          }
      };
      getData();
    }

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
        onChange={e => setInputValue(e.target.value)}
        onRetrieve={getCoordinates}
        accessToken={import.meta.env.VITE_GEOCODING_KEY}
      />
      <label htmlFor="start">Start date:</label>
      <input type="date" id="start" name="trip-start" />
      {/* Component here that takes forecastURL as a prop */}
      <ForecastScreen props={forecastProperties} msgs={status}></ForecastScreen>
    </div>
  );
}

export default App;
