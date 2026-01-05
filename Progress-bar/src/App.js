import { useEffect, useState } from "react";
export default function App() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => setProgress(50), 500);
  }, []);

  return (
    <>
      <div className="container">
        <div
          className="progress-bar"
          style={{
            // width: `${progress}%`,
            transform: `translateX(${progress - 100}%)`,
            color: "black",
          }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemax={100}
          aria-valuemin={0}
        >
          {progress}%
        </div>
      </div>
      <button
        className="button2"
        onClick={() =>
          setProgress((prev) => {
            if (prev == 0) {
              return 0;
            }
            return prev - 10;
          })
        }
      >
        -10%
      </button>
      <button
        className="button1"
        onClick={() =>
          setProgress((prev) => {
            if (prev == 100) {
              return 100;
            }
            return prev + 10;
          })
        }
      >
        +10%
      </button>
    </>
  );
}
