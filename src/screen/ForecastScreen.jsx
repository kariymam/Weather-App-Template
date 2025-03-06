import { useEffect } from "react";
import { userForecast } from "../store/index.js";
import { formatDate } from "../utils/utils.js";

const ForecastScreen = ({ props }) => {
  const { fetchData, forecastDataArray } = userForecast();
  useEffect(() => {
    if (props) {
      fetchData(props);
    }
  }, [props, fetchData]);

  if (props && forecastDataArray.length === 1) {
    const {
      forecast: weeklyAPI,
      forecastData: weeklyData,
      forecastHourly: hourlyAPI,
      forecastHourlyData: hourlyData,
    } = forecastDataArray[0];
    return (
      <div>
       <h3>Night</h3>
            {weeklyData.properties.periods.filter((_, i) => i % 2 === 0).map((item, index) => (
                <>
                    <p>{item.name}</p>
                    <p>{formatDate(item.startTime)}</p>
                    <p>{item.temperature}</p>
                    <p>{item.detailedForecast}</p>
                </>
            ))}
      </div>
    );
  }
};

export default ForecastScreen;
