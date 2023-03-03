import { useEffect, useRef, useState } from "react";
import Calender from "./components/calendars/Calender";
import { HorizontalCalendar } from "./components/calendars/HorizontalCalendar";
import Gauge from "./components/gauge/Gauge";
import SemiGauge from "./components/gauge/SemiGauge";
import BarProgress from "./components/progress/BarProgress";

function App() {
  const [value, setValue] = useState(0);
  // useEffect(() => {
  //   let int: any;
  //   if (value < 100) {
  //     int = setInterval(() => {
  //       setValue((pv) => Math.min(100, pv + Math.floor(Math.random() * 10)));
  //     }, 300);
  //   } else {
  //     clearInterval(int);
  //   }

  //   return () => {
  //     clearInterval(int);
  //   };
  // }, []);

  const [counter, setCounter] = useState(0);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto">
        <SemiGauge value={value} max={100} />

        {/* <BarProgress percentage={value} /> */}
        {/* <div className="mt-20">
          <BarProgress percentage={30} />
        </div> */}

        <div className="mt-32 w-full">
          <input
            className="w-full"
            type="range"
            name=""
            id=""
            max={100}
            min={0}
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value))}
          />
          <h6 className="text-sm uppercase text-gray-800">{value}</h6>
        </div>
      </div>

      <Calender />
    </div>
  );
}

export default App;
