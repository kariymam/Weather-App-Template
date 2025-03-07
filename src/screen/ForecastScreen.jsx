import { useEffect } from "react";
import { userForecast } from "../store/index.js";
import { formatDate, cardColor } from "../utils/utils.js";
import Card from "../component/Card.jsx";

const ForecastScreen = ({ header, props, msgs }) => {
  const { fetchData, forecastDataArray } = userForecast();

  useEffect(() => {
    if (props) {
      fetchData(props);
    }
  }, [props, fetchData]);

  if (!props) {
    return <div>{msgs}</div>;
  }

  if (props && forecastDataArray.length >= 1) {
    const {
      forecast: weeklyAPI,
      forecastData: weeklyData,
      forecastHourly: hourlyAPI,
      forecastHourlyData: hourlyData,
    } = forecastDataArray[0];
    console.log(forecastDataArray);
    return (
      <>
        <h2>{header}</h2>
        <div className="grid gap-4 pr-4 pl-4">
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
      </>
    );
  }
};

export default ForecastScreen;
