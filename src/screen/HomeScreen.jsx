import { useState, useEffect } from "react";
import { fetchGridData } from "../weather.service"
import { NavLink } from "react-router-dom";
import { Geocoder } from "@mapbox/search-js-react";
import ForecastScreen from "./ForecastScreen";
import { msg } from "../data/index";
import "../colors.css";

const MAPBOX_API_KEY =  import.meta.env.VITE_GEOCODING_KEY

function HomeScreen() {
  const [inputValue, setInputValue] = useState("");
  const [h1, setH1] = useState("Peachtree City, Georgia, USA");
  const [coordinates, setCoordinates] = useState({});
  const [forecastProperties, setForecastProperties] = useState();
  const [status, setStatus] = useState(msg.initial.empty);

  const getCoordinates = (value) => {
    setInputValue("");
    setH1(value.properties.full_address);
    setCoordinates(value.properties.coordinates);
  };

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   const { signal } = abortController;

  //   if (coordinates.latitude && coordinates.longitude) {
  //     const getData = async () => {
  //       const url = `https://api.weather.gov/points/${coordinates.latitude},${coordinates.longitude}`;
  //       setStatus(msg.initial.loading);
  //       try {
  //         const res = await fetch(url, { signal });
  //         if (!res.ok) {
  //           setStatus(msg.errors.server);
  //           throw new Error(`Response status: ${res.status}`);
  //         }
  //         if (res.ok) {
  //           const json = await res.json();
  //           setForecastProperties(json.properties);
  //         }
  //       } catch (error) {
  //         if (error.name !== "AbortError") {
  //           setStatus(msg.errors.server);
  //           console.error(error);
  //         }
  //       }
  //     };
  //     getData();
  //   }

  //   return () => {
  //     abortController.abort();
  //   };
  // }, [coordinates]);

  useEffect(() => {
    const getData = async () => {
      const json = await fetchGridData(coordinates)
      setForecastProperties(json.properties)
    }
    getData()
  }, [coordinates])

  return (
    <div className="flex flex-col">
      <header id="mainHeader" className="md:px-9">
        <NavLink to="/">
          <span className="pr-9">Weather App</span>
        </NavLink>
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
              borderRadius: "1rem",
              fontFamily: "var(--font-family)"
            },
          }}
          onRetrieve={getCoordinates}
          accessToken={MAPBOX_API_KEY}
        />
        <nav id="contact" className="md:pl-9">
          <ul className="flex flex-nowrap items-end gap-9">
            <li>
              <a
                href="https://github.com/kariymam/Weather-App-Template"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li>About</li>
          </ul>
        </nav>
      </header>
      <hr></hr>
      <div className="h-full">
        <ForecastScreen
          header={h1}
          props={forecastProperties}
          msgs={status}
        ></ForecastScreen>
      </div>
      <footer className="md:px-9"> Credits</footer>
      <div className="spectrum">
        <div className="bg-(--color-link-water-500)"></div>
        <div className="bg-(--color-link-water-300)"></div>
        <div className="bg-(--color-link-water-200)"></div>
        <div className="bg-(--color-link-water-100)"></div>
        <div className="bg-(--color-link-water-50)"></div>
        <div className="bg-(--color-light-apricot-50)"></div>
        <div className="bg-(--color-light-apricot-100)"></div>
        <div className="bg-(--color-light-apricot-200)"></div>
        <div className="bg-(--color-light-apricot-300)"></div>
        <div className="bg-(--color-light-apricot-500)"></div>
      </div>
    </div>
  );
}

export default HomeScreen;
