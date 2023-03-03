import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const SemiGauge = ({
  value,
  max,
  mainDivisions = 10,
  subDivisions = 50,
  enableSubDivisionValues = true,
}: {
  value: number;
  max?: number;
  mainDivisions?: number;
  subDivisions?: number;
  enableSubDivisionValues?: boolean;
}) => {
  const TOTAL_NUMBER_OF_DIVISIONS = 180;
  const maximum = max || 100;

  const mainContainer = useRef<HTMLDivElement>(null);
  const arrowEl = useRef<HTMLDivElement>(null);

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

  useLayoutEffect(() => {
    if (arrowEl) {
      gsap.to(arrowEl.current, {
        rotateZ: `${(TOTAL_NUMBER_OF_DIVISIONS * value) / maximum}deg`,
        duration: 2,
        ease: "elastic.out(0.6, 0.3)",
      });
    }
  }, [value, arrowEl]);

  return (
    <div
      ref={mainContainer}
      className="relative w-full h-full pointer-events-none"
    >
      {width && (
        <>
          {/* arrow cover */}
          <div className="w-full absolute -bottom-3 inset-x-0 flex justify-center">
            <div className="w-6 h-6 z-[300] rounded-full">
              <div className="w-full h-full p-1 rounded-full bg-gray-800">
                <div className="w-full h-full bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="relative inset-0">
            {/* border */}
            <div
              style={{ width, height: width / 2 }}
              className="absolute bottom-[2px] flex items-end justify-center"
            >
              <div className="z-[80] w-[100%] h-[100%] relative rounded-t-full border-gray-500 border-4 border-b-0"></div>
            </div>

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
              className="z-[200] absolute bottom-[-2px] flex items-end justify-center"
            >
              <div className="w-[65%] relative rounded-t-full">
                <div
                  ref={arrowEl}
                  style={{
                    clipPath: `polygon(0 0, 50% 0, 50% 100%, 0% 100%)`,
                  }}
                  className={`relative w-full h-1 mt-1 bg-gray-800 bottom-0 rounded-full transition-all duration-100`}
                ></div>
              </div>
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
                        <div className="absolute inset-y-0 left-0 w-[7%] bg-gray-400 rounded-full z-50"></div>
                        <div className="absolute inset-y-0 right-0 w-[7%] bg-gray-400 rounded-full z-50"></div>
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
                        <div className="absolute inset-y-0 left-0 w-[3%] bg-gray-300 rounded-full z-50"></div>
                        <div className="absolute inset-y-0 right-0 w-[3%] bg-gray-300 rounded-full z-50"></div>
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
                  {Array.from(
                    { length: mainDivisions + 1 },
                    (_, i) => i + 1
                  ).map((_, idx) => (
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
                  ))}
                </div>
              </div>
            </div>

            {/* sub scale */}
            {enableSubDivisionValues && (
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
                                  (TOTAL_NUMBER_OF_DIVISIONS / subDivisions) *
                                  idx
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
                                    ((TOTAL_NUMBER_OF_DIVISIONS /
                                      subDivisions) *
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
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SemiGauge;
