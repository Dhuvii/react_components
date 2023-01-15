import { useEffect, useRef, useState } from "react";

const SemiGauge = ({
  value,
  max,
  mainDivisions = 10,
  subDivisions = 50,
}: {
  value: number;
  max?: number;
  mainDivisions?: number;
  subDivisions?: number;
}) => {
  const TOTAL_NUMBER_OF_DIVISIONS = 180;
  const maximum = max || 100;

  const mainContainer = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState<null | number>(null);

  useEffect(() => {
    let win_on_resize: any;
    if (mainContainer) {
      calculateSize(mainContainer);
      win_on_resize = window.addEventListener("resize", () =>
        calculateSize(mainContainer)
      );
    }

    return () => {
      window.removeEventListener("resize", win_on_resize);
    };
  }, [mainContainer]);

  function calculateSize(containerEl: React.RefObject<HTMLDivElement>): void {
    if (containerEl && containerEl.current) {
      const client = containerEl.current.getBoundingClientRect();
      setWidth(() => client.right - client.left);
    }
  }

  return (
    <div ref={mainContainer} className="w-full h-full pointer-events-none">
      {width && (
        <div className="relative inset-0">
          {/* border */}
          {/* <div
            style={{ width, height: width / 2 }}
            className="absolute bottom-[2px] flex items-end justify-center"
          >
            <div className="z-[80] w-[100%] h-[100%] relative rounded-t-full border-gray-500 border-4 border-b-0"></div>
          </div> */}

          {/* inner details */}
          <div
            style={{ width, height: width / 2 }}
            className="absolute bottom-[2px] flex items-end justify-center"
          >
            <div className="z-[80] w-[60%] h-[60%] relative rounded-t-full flex flex-col items-center justify-center">
              <h3 className="text-lg tracking-wider font-bold text-gray-700">
                CPU Usage
              </h3>
              <span className="mt-3 text-sm text-gray-400">180 Units</span>
            </div>
          </div>

          {/* arrow */}
          <div
            style={{ width, height: width / 2 }}
            className="z-[200] absolute bottom-[-2px] flex items-end justify-center overflow-hidden"
          >
            <div className="w-[72%] relative rounded-t-full ">
              <div
                style={{
                  rotate: `${(TOTAL_NUMBER_OF_DIVISIONS * value) / maximum}deg`,
                  clipPath: ` polygon(0 0, 50% 0, 50% 100%, 0% 100%)`,
                }}
                className="absolute w-full h-2 bg-gray-900 bottom-0 rounded-full transition-all duration-100"
              ></div>
            </div>
          </div>

          {/* arrow cover */}
          <div
            style={{ width, height: width / 2 }}
            className="z-[200] absolute bottom-[-2px] flex items-end justify-center overflow-hidden"
          >
            <div className="w-[10%] h-[10%] relative rounded-t-full bg-white shadow-md border"></div>
          </div>

          {/* points */}
          <div
            style={{ height: `${(width + 10) / 2}px` }}
            className="w-full aspect-square relative overflow-hidden"
          >
            <div className="">
              {/* main points */}
              {Array.from({ length: mainDivisions }, (_, i) => i + 1).map(
                (pos, idx) => (
                  <div
                    key={Math.random() * mainDivisions * 10000}
                    style={{
                      rotate: `${
                        (TOTAL_NUMBER_OF_DIVISIONS / mainDivisions) * idx
                      }deg`,
                      bottom: 0,
                      height: `${3}px`,
                      width: `${100}%`,
                    }}
                    className="absolute z-50 rounded-full"
                  >
                    <div className="w-full h-full relative">
                      <div className="absolute inset-y-0 left-0 w-10 bg-gray-400 rounded-full z-50"></div>
                      <div className="absolute inset-y-0 right-0 w-10 bg-gray-400 rounded-full z-50"></div>
                    </div>
                  </div>
                )
              )}

              {/* sub points */}
              {Array.from({ length: subDivisions }, (_, i) => i + 1).map(
                (pos, idx) => (
                  <div
                    key={Math.random() * subDivisions * 10000}
                    style={{
                      rotate: `${
                        (TOTAL_NUMBER_OF_DIVISIONS / subDivisions) * idx
                      }deg`,
                      bottom: `${0}`,
                      left: `${(width * (100 - 100)) / 200}px`,
                      height: `${2}px`,
                      width: `${100}%`,
                    }}
                    className={`absolute z-30 rounded-full `}
                  >
                    <div className="w-full h-full relative">
                      <div className="absolute inset-y-0 left-0 w-4 bg-gray-300 rounded-full z-50"></div>
                      <div className="absolute inset-y-0 right-0 w-4 bg-gray-300 rounded-full z-50"></div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* main scale */}
          <div
            style={{ width, height: width / 2 }}
            className="absolute bottom-0 flex items-end justify-center"
          >
            <div className="w-[80%] h-[80%] relative rounded-t-full">
              <div className="absolute inset-x-0 bottom-1">
                {Array.from({ length: mainDivisions + 1 }, (_, i) => i + 1).map(
                  (_, idx) => (
                    <div
                      key={idx}
                      style={{
                        rotate: `${
                          (TOTAL_NUMBER_OF_DIVISIONS / mainDivisions) * idx
                        }deg`,
                        height: `${3}px`,
                        width: `${100}%`,
                      }}
                      className="absolute top-[50%] w-full h-[3px] z-[100]"
                    >
                      <div className="relative inset-0 w-full h-full flex items-center justify-center">
                        <div
                          style={{
                            rotate: `-${
                              (TOTAL_NUMBER_OF_DIVISIONS / mainDivisions) * idx
                            }deg`,
                          }}
                          className="absolute left-0 "
                        >
                          <span className="text-xs text-gray-500">
                            {Math.ceil(
                              ((TOTAL_NUMBER_OF_DIVISIONS / mainDivisions) *
                                idx *
                                maximum) /
                                TOTAL_NUMBER_OF_DIVISIONS
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* sub scale */}
          <div
            style={{ width, height: width / 2 }}
            className="absolute bottom-0 flex items-end justify-center"
          >
            <div className="w-[90%] h-[90%] relative rounded-t-full">
              <div className="absolute inset-x-0 bottom-2">
                {Array.from({ length: subDivisions }, (_, i) => i + 1).map(
                  (_, idx) => (
                    <div
                      key={idx}
                      style={{
                        rotate: `${
                          (TOTAL_NUMBER_OF_DIVISIONS / subDivisions) * idx
                        }deg`,
                        height: `${3}px`,
                        width: `${100}%`,
                      }}
                      className="absolute top-[50%] w-full h-[3px] z-[100]"
                    >
                      <div className="relative inset-0 w-full h-full flex items-center justify-center">
                        <div
                          style={{
                            rotate: `-${
                              (TOTAL_NUMBER_OF_DIVISIONS / subDivisions) * idx
                            }deg`,
                          }}
                          className="absolute left-0 "
                        >
                          {((TOTAL_NUMBER_OF_DIVISIONS / mainDivisions) *
                            (idx % (subDivisions / mainDivisions)) *
                            maximum) /
                            TOTAL_NUMBER_OF_DIVISIONS !==
                            0 && (
                            <span className="text-[6px] text-gray-400">
                              {Math.ceil(
                                ((TOTAL_NUMBER_OF_DIVISIONS / subDivisions) *
                                  idx *
                                  maximum) /
                                  TOTAL_NUMBER_OF_DIVISIONS
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SemiGauge;
