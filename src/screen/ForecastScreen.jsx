import { useEffect } from "react";
import { userForecast } from "../store/index.js";
import { formatDate, formatTime, cardColor } from "../utils/utils.js";
import { Card } from "@/components/ui/card.jsx";
import HourlyForecastChart from "@/component/HourlyTempChart.jsx";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Grid } from "@/component/Grid.jsx";

const getWeeklyForecast = (weeklyData) => {
  const [...weeklyForecast] = weeklyData.properties.periods;
  return {
    forecast: weeklyForecast,
  };
};

const getTodaysForecast = (weeklyData) => {
  const today = weeklyData.properties.periods[0];
  const todaysTemperature = today.temperature;
  const [todaysTempColor, todaysTempTextColor] = cardColor(today.temperature);
  return {
    forecast: today,
    temperature: `${todaysTemperature}F`,
    tempColor: todaysTempColor,
    tempTextColor: todaysTempTextColor,
  };
};

const getHourlyForecast = (hourlyData) => {
  const arr = [];
  const periods = hourlyData.properties.periods.slice(0, 19);
  for (const {
    startTime,
    temperature,
    probabilityOfPrecipitation: { value: percentage },
  } of periods) {
    const obj = {
      time: formatTime(startTime),
      temperature: temperature,
      precipitation: percentage,
    };
    arr.push(obj);
  }
  return arr;
};

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
            {today.tempColor}
          </Grid.Left>
          <Grid.Right>
            <h3>7-day forecast</h3>
            <hr className="pb-4"></hr>
            <ScrollArea
              className={`w-svw md:w-full whitespace-nowrap rounded-md border`}
            >
              <div className="flex w-max h-[50vh] space-x-4 p-4">
                {weekly.forecast
                  .filter((_, i) => i % 2 === 0)
                  .map((day, i) => {
                    const [bgColor, textColor] = cardColor(day.temperature);
                    return (
                      <Card className={`min-w-80 ${bgColor} ${textColor}`}>
                        <h3>{day.temperature}</h3>
                        <p>{day.shortForecast}</p>
                        <p>
                          {day.name} {formatDate(day.startTime)}
                        </p>
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
