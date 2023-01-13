import { useEffect, useRef, useState } from "react";

const Gauge = () => {
  const main_divisions = 8;
  const sub_divisions = 40;

  const [width, setWidth] = useState<null | number>(null);

  const cont = useRef<HTMLDivElement>(null);

  function calculateSize(cont: React.RefObject<HTMLDivElement>) {
    if (cont && cont.current) {
      const cli = cont.current.getBoundingClientRect();
      const width = cli.right - cli.left;
      setWidth(width);
    }
  }

  useEffect(() => {
    calculateSize(cont);
  }, [cont]);

  useEffect(() => {
    let wor: any;
    if (cont) {
      wor = window.addEventListener("resize", () => calculateSize(cont));
    }

    return () => {
      window.removeEventListener("resize", wor);
    };
  }, [cont]);

  return (
    <div
      ref={cont}
      className="w-full h-full aspect-square relative rounded-full "
    >
      {width && (
        <>
          <div
            style={{ transform: `translate(-50%,-50%)` }}
            className="absolute z-50 top-[50%] left-[50%] w-[90%] h-[90%] rounded-full bg-white"
          ></div>
          {Array.from({ length: main_divisions }, (_, i) => i + 1).map(
            (pos, idx) => (
              <div
                key={Math.random() * main_divisions * 10000}
                style={{
                  rotate: `${(180 / main_divisions) * idx}deg`,
                  left: `${(width - 3) / 2}px`,
                  width: `${3}px`,
                  height: `${100}%`,
                }}
                //192
                className="absolute z-50 rounded-full bg-gray-500"
              ></div>
            )
          )}

          <div
            style={{ transform: `translate(-50%,-50%)` }}
            className="absolute z-50 top-[50%] left-[50%] w-[85%] h-[85%] rounded-full bg-white"
          ></div>

          {Array.from({ length: sub_divisions }, (_, i) => i + 1).map(
            (pos, idx) => (
              <div
                key={Math.random() * sub_divisions * 10000}
                style={{
                  rotate: `${(180 / sub_divisions) * idx}deg`,
                  left: `${(width - 2) / 2}px`,
                  top: `${(width * (100 - 95)) / 200}px`,
                  width: `${2}px`,
                  height: `${95}%`,
                }}
                className={`absolute z-30 rounded-full bg-gray-400`}
              ></div>
            )
          )}
        </>
      )}
    </div>
  );
};

export default Gauge;
