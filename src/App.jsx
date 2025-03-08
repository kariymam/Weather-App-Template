import HomeScreen from "./screen/HomeScreen"
import ForecastScreen from "./screen/ForecastScreen";
import { Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeScreen/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
