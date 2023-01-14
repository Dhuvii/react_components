import { useEffect, useRef, useState } from "react";

const SemiGauge = () => {
  const main_divisions = 8;
  const sub_divisions = 40;
  const mainContainer = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState<null | number>(null);

  useEffect(() => {
    let wor: any;
    if (mainContainer) {
      calculateSize(mainContainer);
      wor = window.addEventListener("resize", () =>
        calculateSize(mainContainer)
      );
    }

    return () => {
      window.removeEventListener("resize", wor);
    };
  }, [mainContainer]);

  function calculateSize(containerEl: React.RefObject<HTMLDivElement>) {
    if (containerEl && containerEl.current) {
      const client = containerEl.current.getBoundingClientRect();
      setWidth((pv) => client.right - client.left);
    }
  }

  return (
    <div ref={mainContainer} className="w-full h-full">
      {width && (
        <div className="relative inset-0">
          <div
            style={{ height: `${(width + 10) / 2}px` }}
            className="w-full aspect-square relative overflow-hidden"
          >
            <div className="">
              {Array.from({ length: main_divisions }, (_, i) => i + 1).map(
                (pos, idx) => (
                  <div
                    key={Math.random() * main_divisions * 10000}
                    style={{
                      rotate: `${(180 / main_divisions) * idx}deg`,
                      bottom: 0,
                      height: `${3}px`,
                      width: `${100}%`,
                    }}
                    className="absolute z-50 rounded-full"
                  >
                    <div className="w-full h-full relative">
                      <div className="absolute inset-y-0 left-0 w-10 bg-gray-500 rounded-full z-50"></div>
                      <div className="absolute inset-y-0 right-0 w-10 bg-gray-500 rounded-full z-50"></div>
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
                      bottom: `${0}`,
                      left: `${(width * (100 - 100)) / 200}px`,
                      height: `${2}px`,
                      width: `${100}%`,
                    }}
                    className={`absolute z-30 rounded-full `}
                  >
                    <div className="w-full h-full relative">
                      <div className="absolute inset-y-0 left-0 w-5 bg-gray-500 rounded-full z-50"></div>
                      <div className="absolute inset-y-0 right-0 w-5 bg-gray-500 rounded-full z-50"></div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* inner */}
          <div
            style={{ width, height: width / 2 }}
            className="absolute bottom-0 flex items-end justify-center"
          >
            <div className="w-[80%] h-[80%] relative rounded-t-full">
              <div className="absolute inset-x-0 bottom-1">
                {Array.from(
                  { length: main_divisions + 1 },
                  (_, i) => i + 1
                ).map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      rotate: `${(180 / main_divisions) * idx}deg`,
                      height: `${3}px`,
                      width: `${100}%`,
                    }}
                    className="absolute top-[50%] w-full h-[3px] z-[100]"
                  >
                    <div className="relative inset-0 w-full h-full flex items-center justify-center">
                      <div
                        style={{
                          rotate: `-${(180 / main_divisions) * idx}deg`,
                        }}
                        className="absolute left-0 "
                      >
                        <span className="text-sm text-gray-700">
                          {((180 / main_divisions) * idx * 100) / 180}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SemiGauge;
