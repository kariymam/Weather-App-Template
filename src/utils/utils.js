import { DateTime } from "luxon";
import { weatherIconsList } from "../data/index.js";

const formatDate = (string) => {
  return DateTime.fromISO(string).toFormat("LLL dd");
};

const formatTime = (string) => {
  return DateTime.fromISO(string).toFormat("ha");
};

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

  return "bg-stone-50"; // Default color
};

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

const getWeatherIcon = (string) => {
  let icon = "" || null;

  const searchForMatch = (term) => {
    let search = `${term}*`;
    let regex = new RegExp(search, "gm");
    return regex.test(string);
  };

  for (const { word, emoji } of weatherIconsList) {
    if (Array.isArray(word)) {
      for (const key in word) {
        if (searchForMatch(word[key])) {
          icon = emoji;
        }
      }
      continue;
    } else {
      if (searchForMatch(word)) {
        icon = emoji;
      }
    }
  }

  return icon;
};

export {
  formatDate,
  formatTime,
  cardColor,
  getWeeklyForecast,
  getTodaysForecast,
  getHourlyForecast,
  getWeatherIcon,
};
