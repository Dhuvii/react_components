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
    <div className="w-full h-full">
      <div
        ref={cont}
        className="w-full h-full aspect-square relative overflow-hidden"
      >
        {width && (
          <div className="absolute inset-0">
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
                  className="absolute z-50 rounded-full"
                >
                  <div className="w-full h-full relative">
                    <div className="absolute inset-x-0 top-0 h-10 bg-gray-500 rounded-full z-50"></div>
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gray-500 rounded-full z-50"></div>
                  </div>
                </div>
              )
            )}

            {Array.from({ length: sub_divisions }, (_, i) => i + 1).map(
              (pos, idx) => (
                <div
                  key={Math.random() * sub_divisions * 10000}
                  style={{
                    rotate: `${(180 / sub_divisions) * idx}deg`,
                    left: `${(width - 2) / 2}px`,
                    top: `${(width * (100 - 100)) / 200}px`,
                    width: `${2}px`,
                    height: `${100}%`,
                  }}
                  className={`absolute z-30 rounded-full `}
                >
                  <div className="w-full h-full relative">
                    <div className="absolute inset-x-0 top-0 h-5 bg-gray-500 rounded-full z-50"></div>
                    <div className="absolute inset-x-0 bottom-0 h-5 bg-gray-500 rounded-full z-50"></div>
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* cut out */}
        {/* <div className="absolute z-[60] inset-x-0 h-[49.65%] bg-white bottom-0 rounded-b-full"></div> */}
      </div>
    </div>
  );
};

export default Gauge;
