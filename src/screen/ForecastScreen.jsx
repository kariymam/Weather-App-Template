import { useEffect } from "react";
import { userForecast } from "../store/index.js";
import {
  formatDate,
  cardColor,
  getWeatherIcon,
  getWeeklyForecast,
  getTodaysForecast,
  getHourlyForecast,
} from "../utils/utils.js";
import { Card } from "@/components/ui/card.jsx";
import HourlyForecastChart from "@/component/HourlyTempChart.jsx";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Grid } from "@/component/Grid.jsx";

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

  if (!props || (!props && isLoading) || isLoading) {
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
    const today = getTodaysForecast(weeklyData);
    const hourly = getHourlyForecast(hourlyData);
    console.log(hourly);
    console.log(weekly);
    return (
      <>
        <Grid>
          <Grid.Left>
            <h3>{header}</h3>
            <hr className="pb-4"></hr>
            {today.temperature} {today.forecast.detailedForecast}
            <img
              src={today.forecast.icon}
              alt={today.forecast.shortForecast}
            ></img>
            Wind: {today.forecast.windSpeed}
            {getWeatherIcon(today.forecast.shortForecast)}
            {today.tempColor}
          </Grid.Left>
          <Grid.Right>
            <h3>7-day forecast</h3>
            <hr className="pb-4"></hr>
            <ScrollArea
              className={`w-svw md:w-full h-full whitespace-nowrap rounded-md border`}
            >
              <div className="flex w-max h-[50vh] space-x-4 p-4">
                {weekly
                  .filter((_, i) => i % 2 === 0)
                  .map((day) => {
                    const [bgColor, textColor] = cardColor(day.temperature);
                    return (
                      <Card className={`min-w-80 ${bgColor} ${textColor} min-h-[320px] hover:scale-105 hover:drop-shadow-xl transition-all`}>
                        <div className="grid grid-cols-2 grid-rows-3 px-6">
                          <header>
                            <h3>{day.name}</h3>
                          </header>
                          <div className="col-span-2 m-auto text-center">
                            <span className="text-4xl icon">{getWeatherIcon(day.shortForecast)}</span>
                            <h3 className="temperature">{day.temperature}</h3>
                          </div>
                          <footer className="flex flex-col justify-end col-span-2 w-fit pb-4">
                            <p className="break-normal">{day.shortForecast}</p>
                            <p>{formatDate(day.startTime)}</p>
                          </footer>
                        </div>
                      </Card>
                    );
                  })}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </Grid.Right>
        </Grid>
        <Grid>
          <div className="col-span-2">
            <h3>Hourly forecast</h3>
            <hr className="pb-4"></hr>
            <HourlyForecastChart data={hourly}></HourlyForecastChart>
          </div>
        </Grid>
      </>
    );
  }
};

export default ForecastScreen;
