import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

const BarProgress = ({ percentage = 0 }: { percentage: number }) => {
  const containerEl = useRef<HTMLDivElement>(null);
  const barEl = useRef<HTMLDivElement>(null);
  const progressEl = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(0);
  const [bars, setBars] = useState(0);
  const [currentBarPosition, setCurrentBarPosition] = useState(0);

  useEffect(() => {
    let win_on_resize: any;
    if (containerEl && containerEl.current) {
      setWidth(() => calculateWidth(containerEl));
      win_on_resize = window.addEventListener("resize", () =>
        setWidth(() => calculateWidth(containerEl))
      );
    }

    return () => {
      window.removeEventListener("resize", win_on_resize);
    };
  }, [containerEl]);

  useEffect(() => {
    if (width && barEl && barEl) {
      setBars(() => calculateNumberOfBars(width, 3, 3));
    }
  }, [width, barEl]);

  function calculateWidth(
    containerEl: React.RefObject<HTMLDivElement>
  ): number {
    if (containerEl && containerEl.current) {
      const client = containerEl.current.getBoundingClientRect();
      return client.right - client.left;
    }
    return 0;
  }

  function calculateNumberOfBars(
    containerWidth: number,
    barWidth: number = 4,
    gap: number = 4
  ): number {
    return containerWidth / (barWidth + gap);
  }

  function calculatePercentage(percentage: number = 0) {
    return (bars * percentage) / 100;
  }

  function calculateCurrentBarPosition() {
    const firstBar = document.getElementsByClassName("firstBar");
    const bar = document.getElementsByClassName("current");
    const firstBarclient = firstBar.item(0)?.getBoundingClientRect();
    const client = bar.item(0)?.getBoundingClientRect();
    if (client && firstBarclient) {
      setCurrentBarPosition(() =>
        Math.max(client.right - firstBarclient.left, 0)
      );
    }
  }

  useEffect(() => {
    calculateCurrentBarPosition();
  }, [percentage]);

  useLayoutEffect(() => {
    gsap.to(progressEl.current, {
      width: Math.max(currentBarPosition - 6, 0),
      duration: 1,
      ease: "elastic.out(1, 0.4)",
    });
  }, [currentBarPosition]);

  return (
    <>
      <div
        ref={containerEl}
        className="relative w-full h-14 flex items-end justify-start gap-[3px] bg-white"
      >
        <div className="absolute -top-[25px] inset-x-0">
          <div
            ref={progressEl}
            className={`relative h-[3.5px] rounded-full bg-blue-500 ${
              percentage <= 0 && "opacity-0"
            }`}
          >
            {percentage >= 1 && (
              <div className="absolute inset-y-0 -right-[6px] w-1 h-1 rounded-full bg-blue-500 flex justify-center">
                <p className="mt-2 text-xs text-gray-500 font-medium">
                  {percentage}
                </p>
              </div>
            )}
          </div>
          {/* {percentage > 0 && (
          )} */}
        </div>

        {Array.from({ length: Math.round(bars) }, (_, i) => i + 1).map(
          (bar) => (
            <div
              ref={barEl}
              id={`${bar}`}
              className={`relative w-[3px] shadow rounded-sm transition-all duration-300 ${
                bar === 1 && "firstBar"
              } ${
                bar <= Math.round(calculatePercentage(percentage))
                  ? "bg-blue-500"
                  : "bg-gray-300 "
              } ${
                Math.round(calculatePercentage(percentage)) === bar
                  ? "current h-[100%]"
                  : "h-[80%]"
              }`}
            >
              {Math.round(calculatePercentage(percentage)) === bar && (
                <div className="absolute z-0 -top-5 inset-x-0 flex items-center justify-center transition-all duration-300"></div>
              )}
            </div>
          )
        )}
      </div>
    </>
  );
};

export default BarProgress;
