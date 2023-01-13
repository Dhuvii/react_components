import React, { useEffect, useRef, useState } from "react";

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

const GenerateCalendar = ({
  generate_for_month,
  offsetY,
  parentRef,
  setMonth,
  parentMonth,
  selections,
}: {
  showMonth?: boolean;
  setMonth?: any;
  generate_for_month: number;
  offsetY: number;
  parentRef: React.MutableRefObject<null>;
  parentMonth: number;
  selections: {
    day?: number;
    range?: {
      date: number;
      type: "start" | "end" | "mid";
    }[];
  };
}) => {
  const calendar_ref = useRef(null);
  const date = new Date();
  const [year, setYear] = useState<number>(date.getFullYear());
  const [start_inactive_days_list, setStart_inactive_days_list] = useState<
    number[]
  >([]);
  const [days, setDays] = useState<number[]>([]);
  const [yPosition, setYPosition] = useState(0);

  useEffect(() => {
    let first_day_of_month = new Date(year, generate_for_month, 1).getDay(); // getting first day of month
    let last_date_of_month = new Date(
      year,
      generate_for_month + 1,
      0
    ).getDate(); // getting last date of month

    let last_date_of_last_month = new Date(
      year,
      generate_for_month,
      0
    ).getDate(); // getting last date of previous month

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
  }, [year, generate_for_month]);

  const calculateYpos = () => {
    const target: any = calendar_ref.current;
    const position = target.getBoundingClientRect();
    const yPos = position.top - offsetY + 0.5;
    return yPos;
  };

  const setPosition = () => {
    const target: any = calendar_ref.current;
    const position = target.getBoundingClientRect();
    const yPos = position.top - offsetY + 0.5;
    setYPosition(yPos);
    if (yPos < 20 && yPos > -20) {
      setMonth(generate_for_month);
    }
  };

  useEffect(() => {
    if (calendar_ref && calendar_ref.current) {
      setPosition();
    }
    if (parentRef && parentRef.current) {
      const target: any = parentRef.current;
      target.addEventListener("scroll", (e: any) => {
        setPosition();
      });
    }
  }, [calendar_ref, offsetY, parentRef]);

  return (
    <div ref={calendar_ref} className="w-[90%] p-5 ">
      <div className="w-full grid grid-cols-7 gap-y-4 place-items-center">
        {start_inactive_days_list.map((day, idx) => (
          <span key={idx} className="p-4 text-base text-[#414754]">
            {day}
          </span>
        ))}

        {days.map((day, idx) => (
          <button>
            <span key={idx} className={`p-4 text-base text-[#737A8C]`}>
              {day}
            </span>
          </button>
        ))}
      </div>

      <div className="pl-4">
        <h1 className="mt-10 font-bold text-white text-base">
          {month_list[generate_for_month + 1]}
        </h1>
      </div>
    </div>
  );
};

const Calender = () => {
  const date = new Date();
  const [month, setMonth] = useState<number>(date.getMonth());
  const calendar_container_ref = useRef(null);

  const day_list = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const [offsetY, setOffsetY] = useState(-1);

  const handleSetOffset = () => {
    const target: any = calendar_container_ref.current;
    const position = target.getBoundingClientRect();
    const offset = target.offsetTop;
    setOffsetY(offset);
  };
  useEffect(() => {
    if (calendar_container_ref && calendar_container_ref.current) {
      handleSetOffset();
    }
  }, [calendar_container_ref]);

  const handleMonthChange = (month: number) => {
    //@ts-ignore
    calendar_container_ref.current.children[month].scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full max-w-2xl rounded-md border shadow bg-[#21242B] border-[#4D515C]">
      <div className="w-full flex items-start justify-between">
        {/* months and year */}
        <div className="">
          <ul className="w-44 sticky py-3 flex flex-col items-start justify-start border-r border-[#4D515C]">
            {/*  */}
            {month_list.map((mon, idx: number) => (
              <li
                key={idx}
                className={`w-full py-3 px-6 text-sm text-white ${
                  idx === month && "border-r-2 "
                }`}
              >
                <button onClick={() => handleMonthChange(idx)}>{mon}</button>
              </li>
            ))}
          </ul>
        </div>

        {/* calendar */}
        <div className="w-full overflow-auto flex flex-col items-center justify-start">
          <div className="mt-3 w-full flex items-center justify-center">
            <h1 className="text-lg font-bold text-white">
              {month_list[month]}
            </h1>
          </div>
          {/* days list */}
          <div className="w-[90%] p-5 grid grid-cols-7 place-items-center border-b border-[#4D515C]">
            {day_list.map((day, idx) => (
              <h3 key={idx} className="text-sm text-[#939BAD] uppercase">
                {day.slice(0, 2)}
              </h3>
            ))}
          </div>

          <div
            ref={calendar_container_ref}
            onScroll={() => handleSetOffset()}
            className="w-full h-auto max-h-[27rem] pb-[9rem] overflow-y-auto scroll-m-0 snap-y"
          >
            {month_list.map((m, idx) => (
              <div
                key={idx}
                className="w-full flex flex-col items-center justify-start snap-start"
              >
                <GenerateCalendar
                  generate_for_month={idx}
                  offsetY={offsetY}
                  parentRef={calendar_container_ref}
                  setMonth={setMonth}
                  parentMonth={month}
                  selections={{
                    day: 24,
                  }}
                />
              </div>
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
