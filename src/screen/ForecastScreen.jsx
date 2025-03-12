import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedVideo } from "@cloudinary/react";
import { useEffect } from "react";
import { userForecast } from "../store/index.js";
import {
  getWeeklyForecast,
  getTodaysForecast,
  getHourlyForecast,
} from "../utils/utils.js";
import { Card } from "@/components/ui/card.jsx";
import HourlyForecastChart from "@/component/HourlyTempChart.jsx";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Grid } from "@/component/Grid.jsx";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dvf7zwben",
  },
});

const ForecastScreen = ({ header, props, msgs }) => {
  const { setData, forecastDataArray, setLoading, isLoading } = userForecast();

  useEffect(() => {
    if (props) {
      const fetchData = async (url) => {
        setLoading(); // Set loading state
        try {
          const urls = [url.forecast, url.forecastHourly];
          const responses = await Promise.all(urls.map((url) => fetch(url)));
          const errors = responses.filter((response) => !response.ok);

          if (errors.length > 0) {
            throw errors.map(
              (response) => new Error(`Failed to fetch: ${response.statusText}`)
            );
          }

          const data = await Promise.all(
            responses.map((response) => response.json())
          );
          const [forecastData, forecastHourlyData] = data;

          const payload = {
            forecast: url.forecast,
            forecastHourly: url.forecastHourly,
            forecastData,
            forecastHourlyData,
          };
          setData(payload); // Update state and clear loading
        } catch (errors) {
          setLoading(errors); // Set error state and clear loading
          console.error("Fetch errors:", errors);
        }
      };
      fetchData(props);
    }
  }, [props, setData, setLoading]);

  if (!props || (!props && isLoading) || (props && isLoading)) {
    return (
      // Loading screen
      <>
        <Grid>
          <Grid.Left>{msgs}</Grid.Left>
          <Grid.Right></Grid.Right>
        </Grid>
      </>
    );
  }

  if (props && forecastDataArray.length >= 1 && !isLoading) {
    const { forecastData: weeklyData, forecastHourlyData: hourlyData } =
      forecastDataArray[0];
    const weekly = getWeeklyForecast(weeklyData);
    const today = getTodaysForecast(hourlyData, weekly[0].shortForecast);
    const hourly = getHourlyForecast(hourlyData);
    return (
      <>
        <div className={`absolute w-screen overflow-hidden h-full bg-(--color-link-water-950) -z-10`}>
          <AdvancedVideo
            className="w-screen h-full object-cover opacity-50"
            width="1920"
            height="1080"
            cldVid={cld
              .video(`${today.media}`)
              .quality("auto")}
            autoPlay
            loop
            muted
            playsinline
          />
        </div>
        <Grid>
          <Grid.Left>
            <h3 className="text-white">{header}</h3>
            <hr></hr>
            <div className="py-9">
              <h3 className="text-7xl text-white">{today.temperature}°</h3>
              <h4 className="text-4xl text-white">
                {weekly[0].detailedForecast}
              </h4>
              <div className="text-white">
                <h3>Weather Details</h3>
                <a href={`${today.forecast.icon}`}>Source</a>
              </div>
            </div>
          </Grid.Left>
          <Grid.Right className="md:col-span-2">
            <div>
              <h3 className="text-white">7-day forecast</h3>
              <hr></hr>
            </div>
          </Grid.Right>
          <div className="w-screen md:translate-x-[-36px] col-span-2">
            <ScrollArea className={`w-full h-full whitespace-nowrap`}>
              <div id="weekday_forecast" className="flex items-center justify-center space-x-4 p-4 ml-5">
                {weekly
                  .filter((_, i) => i % 2 === 0)
                  .map((day, i) => {
                    const [bgColor, textColor] = day.cardBackground;
                    return (
                      <Card
                        className={`min-w-80 max-w-xs ${bgColor} ${textColor} h-full min-h-[320px] transition-all hover:drop-shadow-sm backdrop-blur-sm`}
                      >
                        <div className="grid grid-cols-2 grid-rows-3 px-6">
                          <header>
                            <h3 className={`${i === 0 ? "font-semibold" : ""}`}>
                              {day.name}{" "}
                              <span className="opacity-75">| {day.date}</span>
                            </h3>
                          </header>
                          <div className="col-span-2 m-auto text-center">
                            <span className="text-4xl icon">{day.icon}</span>
                            <div className="flex items-center gap-4 w-full">
                              <p>High</p>
                              <h3 className="temperature">{day.temperature}</h3>
                            </div>
                            <div className="flex items-center gap-4 w-full">
                              <p>Low</p>
                              <h3>{weekly.filter((_, i) => i % 2 !== 0)[i].temperature} </h3>
                            </div>
                          </div>
                          <footer className="flex col-span-2">
                            <p className="mt-auto break-words text-wrap">{day.shortForecast}</p>
                          </footer>
                        </div>
                      </Card>
                    );
                  })}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </Grid>
        <Grid>
          <div className="col-span-2">
            <h3>Hourly forecast</h3>
            <hr></hr>
            <Card>
              <HourlyForecastChart data={hourly}></HourlyForecastChart>
            </Card>
          </div>
        </Grid>
      </>
    );
  }
};

export default ForecastScreen;
