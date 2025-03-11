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
      "Sunny"
    ],
    emoji: '☀️',
    video: 'path2tech-weather-app/qs1kgcawsbpacbetpnqr'
  },
  {
    word: "Partly Sunny",
    emoji: '🌤️',
    video: 'path2tech-weather-app/d5j25mpv6fnbzf56nlu8'
  },
  {
    word: "Partly Cloudy",
    emoji: '⛅️',
    video: 'path2tech-weather-app/pgnbxclkhvlbvkecezff'
  },
  {
    word: ["Cloudy", "Mostly Cloudy"],
    emoji: '🌥️',
    video: 'path2tech-weather-app/tfj4qamzycive0clkyjn',
  },
  {
    word: "Overcast",
    emoji: '☁️',
    video: 'path2tech-weather-app/tfj4qamzycive0clkyjn',
  },
  {
    word: [
      "Snow",
      "Snow Showers",
      "Thunderstorm Snow",
      "Light Snow",
      "Heavy Snow"
    ],
    emoji: '🌨️',
    video: 'path2tech-weather-app/j08wgjv9bapydhtkuf3c',
  },
  {
    word: ["Ice Pellets", "Hail", "Snow Pellets"],
    emoji: '❄️',
    video: '',
  },
  {
    word: "Windy",
    emoji: '🌬️',
    video: '',
  },
  {
    word: "Thunderstorm",
    emoji: '⛈️',
    video: 'path2tech-weather-app/wol9lxbltq6dots9rvb1',
  },
  {
    word: ["Rain", "Rain Showers"],
    emoji: '🌧️',
    video: 'path2tech-weather-app/yzclvykmirfpxelruxfq'
  }
]

export { msg, weatherIconsList };