import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('New York')
  const handleChange = (e) => {
    setCity(e.target.value)
  }

  useEffect(() => {
    const getData = async () => {
      const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${import.meta.env.VITE_WEATHER_API_ACCESS_KEY}&q=${city}`;
      try {
        const res = await fetch(url)
        if(!res.ok) {
          throw new Error(`Response status: ${res.status}`)
        }
        const json = await res.json()
        console.log(json)
        const data = {
          key: json[0].Key
        }
        console.log(data)
      } catch(error) {
        console.error(error)
      }
    }

    getData();
  }, [city])
  return (
    <div className="App">
      <label htmlFor='city'>
        <input 
          type='text'
          id='city'
          name='city'
          value={city}
          onChange={handleChange}/>
      </label>
    </div>
  );
}

export default App;
