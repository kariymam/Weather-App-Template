import { useEffect } from "react";
import { userForecast } from "../store/index.js";
import { formatDate, cardColor } from "../utils/utils.js";
import Card from "../component/Card.jsx";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
      <div>{msgs}</div>
    );
  }

  if (props && forecastDataArray.length >= 1 && !isLoading) {
    const {
      forecast: weeklyAPI,
      forecastData: weeklyData,
      forecastHourly: hourlyAPI,
      forecastHourlyData: hourlyData,
    } = forecastDataArray[0];
    console.log(forecastDataArray);
    return (
      <>
          <hr></hr>
        <div className="grid md:grid-cols-2 gap-4 pr-4 pl-4">
          <div>
            <h2>{header}</h2>
          </div>
          <div>
            <h3>7-day forecast</h3>
            <ScrollArea className="w-svw md:w-full whitespace-nowrap rounded-md border">
              <div className="flex w-max h-[50vh] space-x-4 p-4">
                {weeklyData.properties.periods
                  .filter((_, i) => i % 2 === 0)
                  .map((day, i) => (
                    <Card background={cardColor(day.temperature)}>
                      <h3>{day.temperature}</h3>
                      <p>{day.shortForecast}</p>
                      <p>
                        {day.name} {formatDate(day.startTime)}
                      </p>
                    </Card>
                  ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </>
    );
  }
};

export default ForecastScreen;
