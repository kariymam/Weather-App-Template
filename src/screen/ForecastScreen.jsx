import { useEffect } from "react";
import { userForecast } from "../store/index.js";
import { formatDate } from "../utils/utils.js";
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

  const cardColor = (num) => {
    const colorMap = [
      {
        range: [0, 10],
        color: "bg-(--color-link-water-500)",
        text: "text-(--color-link-water-50)",
      },
      {
        range: [10, 20],
        color: "bg-(--color-link-water-300)",
        text: "text-(--color-link-water-950)",
      },
      {
        range: [20, 30],
        color: "bg-(--color-link-water-200)",
        text: "text-(--color-link-water-950)",
      },
      {
        range: [30, 40],
        color: "bg-(--color-link-water-100)",
        text: "text-(--color-link-water-950)",
      },
      {
        range: [40, 50],
        color: "bg-(--color-link-water-50)",
        text: "text-(--color-link-water-950)",
      },
      {
        range: [50, 60],
        color: "bg-(--color-light-apricot-50)",
        text: "text-(--color-light-apricot-950)",
      },
      {
        range: [60, 70],
        color: "bg-(--color-light-apricot-100)",
        text: "text-(--color-light-apricot-950)",
      },
      {
        range: [70, 80],
        color: "bg-(--color-light-apricot-200)",
        text: "text-(--color-light-apricot-950)",
      },
      {
        range: [80, 90],
        color: "bg-(--color-light-apricot-300)",
        text: "text-(--color-light-apricot-950)",
      },
      {
        range: [90, 100],
        color: "bg-(--color-light-apricot-500)",
        text: "text-(--color-light-apricot-50)",
      },
    ];

    for (const { range, color, text } of colorMap) {
      if (num >= range[0] && num < range[1]) {
        return [color, text];
      }
    }

    return "base-blue-dark"; // Default color
  };

  if (props && forecastDataArray.length === 1) {
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
