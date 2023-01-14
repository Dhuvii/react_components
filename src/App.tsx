import Calender from "./components/calendars/Calender";
import { HorizontalCalendar } from "./components/calendars/HorizontalCalendar";
import Gauge from "./components/gauge/Gauge";
import SemiGauge from "./components/gauge/SemiGauge";

function App() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xl">
        <SemiGauge />

        {/* <Gauge /> */}
      </div>
    </div>
  );
}

export default App;
