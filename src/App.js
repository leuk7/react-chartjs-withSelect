import "./App.css";
import ChartWithSelect from "./components/ChartWithSelect";
import { DATAMONTHS } from "./libs/monthsData";

function App() {
  return (
    <div className="App">
      <ChartWithSelect dataMonths={DATAMONTHS} />
    </div>
  );
}

export default App;
