import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Geocoder } from "@mapbox/search-js-react";
import ForecastScreen from "./ForecastScreen";
import { msg } from "../data/index";
import "../colors.css";

function HomeScreen() {
  const [inputValue, setInputValue] = useState("");
  const [h1, setH1] = useState("Peachtree City, Georgia, USA");
  const [coordinates, setCoordinates] = useState({
    latitude: 33.748547,
    longitude: -84.391502,
  });
  const [forecastProperties, setForecastProperties] = useState();
  const [status, setStatus] = useState(msg.initial.empty);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const getCoordinates = (value) => {
    setInputValue("");
    setH1(value.properties.full_address);
    setCoordinates(value.properties.coordinates);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    if (coordinates.latitude && coordinates.longitude) {
      const getData = async () => {
        const url = `https://api.weather.gov/points/${coordinates.latitude},${coordinates.longitude}`;
        setStatus(msg.initial.loading);
        try {
          const res = await fetch(url, { signal });
          if (!res.ok) {
            setStatus(msg.errors.server);
            throw new Error(`Response status: ${res.status}`);
          }
          if (res.ok) {
            const json = await res.json();
            setForecastProperties(json.properties);
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
    <div>
      <header className="px-9">
        <NavLink to="/"><span className="pr-9">Weather App</span></NavLink>
        <Geocoder
          id="city"
          value={inputValue}
          options={{
            country: "US",
            worldview: "us",
            types: "place",
          }}
          theme={{
            border: "none",
            variables: {
              unit: "min(5vw, 1em)",
              boxShadow: "none",
              colorBackgroundActive: "var(--primary)",
              borderRadius: "1rem"
            },
          }}
          onChange={handleChange}
          onRetrieve={getCoordinates}
          accessToken={import.meta.env.VITE_GEOCODING_KEY}
        />
        <nav id="contact" className="pl-9">
          <ul className="flex flex-nowrap items-end gap-4">
            <li>
            <a href="https://github.com/kariymam/Weather-App-Template" target="_blank" rel="noreferrer">Github</a>
            </li>
            <li>
              About
            </li>
          </ul>
        </nav>
      </header>
      <hr></hr>
      <div>
      <ForecastScreen
        header={h1}
        props={forecastProperties}
        msgs={status}
      ></ForecastScreen>
      </div>
      <footer className="p-9"> Credits </footer>
    </div>
  );
}

export default HomeScreen;
