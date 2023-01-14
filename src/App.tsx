import { useState } from "react";
import Calender from "./components/calendars/Calender";
import { HorizontalCalendar } from "./components/calendars/HorizontalCalendar";
import Gauge from "./components/gauge/Gauge";
import SemiGauge from "./components/gauge/SemiGauge";

function App() {
  const [value, setValue] = useState(10);
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xl">
        <SemiGauge value={value} max={100} />

        <div className="mt-10 w-full">
          <input
            className="w-full"
            type="range"
            name=""
            id=""
            max={100}
            min={0}
            onChange={(e) => setValue(parseInt(e.target.value))}
          />
          <h6 className="text-sm uppercase text-gray-800">{value}</h6>
        </div>
        {/* <Gauge /> */}
      </div>
    </div>
  );
}

export default App;
