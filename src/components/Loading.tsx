import { useEffect, useRef, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();

  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (percent < 100 || hasTriggeredRef.current) return;

    hasTriggeredRef.current = true;

    const timer1 = setTimeout(() => {
      setLoaded(true);
    }, 600);

    const timer2 = setTimeout(() => {
      setIsLoaded(true);
    }, 1600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [percent]);

  useEffect(() => {
    if (!isLoaded) return;

    let cancelled = false;

    import("./utils/initialFX").then((module) => {
      if (cancelled) return;

      setClicked(true);

      const timer = setTimeout(() => {
        try {
          if (module.initialFX) {
            module.initialFX();
          }
        } catch (error) {
          console.error('Error in initialFX:', error);
        } finally {
          setIsLoading(false);
        }
      }, 900);

      return () => clearTimeout(timer);
    }).catch((error) => {
      console.error('Error loading initialFX:', error);
      if (!cancelled) {
        setClicked(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 900);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [isLoaded, setIsLoading]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/" className="loader-title" data-cursor="disable">
          AS
        </a>

        <div className={`loaderGame ${clicked ? "loader-out" : ""}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>

      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee>
            <span> Web Developer </span>
            <span> Software Engineer </span>
            <span> UI Builder </span>
            <span> Problem Solver </span>
          </Marquee>
        </div>

        <div
          className={`loading-wrap ${clicked ? "loading-clicked" : ""}`}
          onMouseMove={handleMouseMove}
        >
          <div className="loading-hover"></div>

          <div className={`loading-button ${loaded ? "loading-complete" : ""}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{Math.min(percent, 100)}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>

            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent = 0;
  let interval: ReturnType<typeof setInterval>;

  interval = setInterval(() => {
    if (percent <= 50) {
      const rand = Math.round(Math.random() * 5);
      percent += rand;
      if (percent > 50) percent = 50;
      setLoading(percent);
    } else {
      clearInterval(interval);

      interval = setInterval(() => {
        percent += Math.round(Math.random());
        if (percent > 91) percent = 91;
        setLoading(percent);

        if (percent >= 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    percent = 100;
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);

      interval = setInterval(() => {
        if (percent < 100) {
          percent += 1;
          setLoading(percent);
        } else {
          clearInterval(interval);
          resolve(percent);
        }
      }, 12);
    });
  }

  return { loaded, percent, clear };
};