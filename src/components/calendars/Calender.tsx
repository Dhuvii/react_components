import React, { useEffect, useState } from "react";

const Calender = () => {
  const date = new Date();
  const [year, setYear] = useState<number>(date.getFullYear());
  const [month, setMonth] = useState<number>(date.getMonth());
  const [today, setToday] = useState<number>(date.getDate());
  const [days, setDays] = useState<number[]>([]);
  const [start_inactive_days_list, setStart_inactive_days_list] = useState<
    number[]
  >([]);

  let first_day_of_month = new Date(year, month, 1).getDay(); // getting first day of month
  let last_date_of_month = new Date(year, month + 1, 0).getDate(); // getting last date of month
  let last_date_of_last_month = new Date(year, month, 0).getDate(); // getting last date of previous month

  useEffect(() => {
    const d: number[] = [];
    const s_i_d: number[] = [];
    for (let index = first_day_of_month - 1; index > 0; index--) {
      s_i_d.push(last_date_of_last_month - index + 1);
    }
    for (let index = 1; index <= last_date_of_month; index++) {
      d.push(index);
    }
    setDays(d);
    setStart_inactive_days_list(s_i_d);
  }, [year, month]);

  const day_list = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const month_list = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    // <div className="w-72">
    //   <div className="grid grid-cols-7 grid-rows-4 items-center justify-center">
    //     {day_list.map((day_name) => (
    //       <span>{day_name.slice(0, 3)}</span>
    //     ))}
    //     {days.map((day) => (
    //       <span>{day}</span>
    //     ))}
    //   </div>
    // </div>
    <div className="w-full max-w-2xl rounded-md border shadow bg-[#21242B] border-[#4D515C]">
      <div className="w-full flex items-start justify-between">
        {/* months and year */}
        <div className="">
          <ul className="w-44 py-3 flex flex-col items-start justify-start border-r border-[#4D515C]">
            {/*  */}
            {month_list.map((mon, idx: number) => (
              <li
                key={idx}
                className={`w-full py-3 px-6 text-sm text-white ${
                  idx === month && "border-r-2 "
                }`}
              >
                <button onClick={() => setMonth(idx)}>{mon}</button>
              </li>
            ))}
          </ul>
        </div>

        {/* calendar */}
        <div className="w-full flex flex-col items-center justify-center">
          {/* days list */}
          <div className="w-[90%] p-5 grid grid-cols-7 place-items-center border-b border-[#4D515C]">
            {day_list.map((day, idx) => (
              <h3 key={idx} className="text-sm text-[#939BAD] uppercase">
                {day.slice(0, 2)}
              </h3>
            ))}
          </div>
          <div className="w-[90%] p-5 grid grid-cols-7 grid-rows-4 gap-y-6 place-items-center">
            {start_inactive_days_list.map((day, idx) => (
              <span key={idx} className="text-base text-[#414754]">
                {day}
              </span>
            ))}

            {days.map((day, idx) => (
              <span key={idx} className="text-base text-[#737A8C]">
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* actions */}
      <div className=""></div>
    </div>
  );
};

export default Calender;
