const msg = {
  initial: {
    empty: "Nothing to see here yet",
    loading: "Loading"
  },
  errors: {
    server: "Server error",
  },
};

const weatherIconsList = [
  {
    word: [
      "Clear",
      "Fair",
    ],
    emoji: '☀️'
  },
  {
    word: "Partly Sunny",
    emoji: '🌤️'
  },
  {
    word: "Partly Cloudy",
    emoji: '⛅️'
  },
  {
    word: "Mostly Cloudy",
    emoji: '🌥️'
  },
  {
    word: "Overcast",
    emoji: '☁️'
  },
  {
    word: [
      "Snow",
      "Snow Showers",
      "Thunderstorm Snow",
      "Light Snow",
      "Heavy Snow"
    ],
    emoji: '🌨️'
  },
  {
    word: ["Ice Pellets", "Hail", "Snow Pellets"],
    emoji: '❄️'
  },
  {
    word: "Windy",
    emoji: '🌬️'
  },
  {
    word: "Thunderstorm",
    emoji: '⛈️'
  },
  {
    word: ["Rain", "Rain Showers"],
    emoji: '🌧️'
  }
]
export { msg };
