import React, { useEffect, useState } from "react";

const Month = ({ month, year }: { month: number; year: number }) => {
  const first_day_of_month = new Date(year, month, 1).getDay(); // getting first day of month
  const last_date_of_month = new Date(year, month + 1, 0).getDate(); // getting last date of month
  const last_date_of_last_month = new Date(year, month, 0).getDate(); // getting last date of previous month

  type Date = {
    day: number;
    selected: boolean;
    range: "start" | "end" | "mid" | null;
  };

  const [activeDays, setActiveDays] = useState<Date[]>([]);
  const [startInactiveDates, setStartInactiveDates] = useState<number[]>([]);
  useEffect(() => {
    const days: Date[] = [];
    const s_i_d: number[] = [];
    for (let index = first_day_of_month - 1; index > 0; index--) {
      s_i_d.push(last_date_of_last_month - index + 1);
    }
    for (let index = 1; index <= last_date_of_month; index++) {
      days.push({ day: index, selected: false, range: null });
    }
    setActiveDays(days);
    setStartInactiveDates(s_i_d);
  }, [year, month]);

  const [rangeStart, setRangeStart] = useState<null | number>(null);
  const [rangeEnd, setRangeEnd] = useState<null | number>(null);

  useEffect(() => {
    if (rangeStart) {
      const updatedDates = activeDays.map((dateObj, idx) => {
        dateObj.selected = false;
        dateObj.range = null;
        if (idx + 1 === rangeStart) {
          dateObj.selected = true;
          dateObj.range = null;
        }
        return dateObj;
      });
      setActiveDays(updatedDates);
    }
  }, [rangeStart]);

  const selectRange = (from: number, to: number) => {
    const updatedDates = activeDays.map((dateObj, idx) => {
      dateObj.selected = false;
      dateObj.range = null;
      if (from === to && from === idx + 1) {
        setRangeStart(null);
        setRangeEnd(null);
        dateObj.selected = false;
        dateObj.range = null;
      } else {
        if (idx + 1 === from) {
          dateObj.selected = true;
          dateObj.range = "start";
        }
        if (idx + 1 > from && idx < to) {
          dateObj.selected = false;
          dateObj.range = "mid";
        }
        if (idx + 1 === to) {
          dateObj.selected = false;
          dateObj.range = "end";
        }
      }
      return dateObj;
    });

    setActiveDays(updatedDates);
  };

  const handleRange = (date: number) => {
    if (!rangeStart) {
      setRangeStart(date);
    } else {
      if (date < rangeStart) return;
      setRangeEnd(date);
    }
  };

  useEffect(() => {
    if (rangeStart && rangeEnd) {
      selectRange(rangeStart, rangeEnd);
    }
  }, [rangeStart, rangeEnd]);

  return (
    <>
      <div className="grid grid-cols-7 gap-y-1 gap-x-0">
        {startInactiveDates.map((day, idx) => (
          <button className="h-12 w-12">
            <span key={idx} className="p-4 text-base text-[#414754]">
              {day}
            </span>
          </button>
        ))}

        {activeDays.map((dateObj, idx) => (
          <button
            onClick={() => handleRange(dateObj.day)}
            className="relative h-12 w-12 flex-shrink-0 text-[#737A8C]"
          >
            {/* highlight */}
            <span
              className={`absolute z-0 w-full h-full inset-0 
              ${
                (dateObj.range === "start" ||
                  (dateObj.range && (idx % 7) - 2 === 0)) &&
                "bg-white/[0.16] rounded-l-full"
              } 
              ${dateObj.range === "mid" && "bg-white/[0.16]"}
              ${
                (dateObj.range === "end" || (dateObj.range && idx % 7 === 1)) &&
                "bg-white/[0.16] rounded-r-full"
              }
              `}
            ></span>
            <div
              key={idx}
              className={`absolute inset-0 z-10 w-full h-full flex items-center justify-center ${
                dateObj.selected && "bg-white rounded-full shadow-md"
              }
              ${
                dateObj.range === "end" &&
                "border-2 border-white rounded-full text-white bg-[#21242B]"
              }
              `}
            >
              {dateObj.day}
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

const HorizontalCalendar = () => {
  return (
    <div>
      <Month month={0} year={2022} />
    </div>
  );
};

export { HorizontalCalendar, Month };
