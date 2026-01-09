import { useRef, useState } from "react";

export default function App() {
  const [state, setState] = useState(0);
  // 0=> start, 1=> pause, 2=> running
  const [timer, setTimer] = useState(0);
  const ref = useRef(null);

  function resetTimer() {
    setState(0);
    setTimer(0);
    clearInterval(ref.current);
  }

  function runTimer() {
    if (state === 2) {
      setState(1);
      clearInterval(ref.current);
      return;
    }

    let counter = timer;

    const intervalId = setInterval(() => {
      setTimer((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          clearInterval(intervalId);
          setState(0);
          return 0;
        }
      });
    }, 1000);
    setState(2);
    ref.current = intervalId;
    return intervalId;
  }

  function changeTimer(value, isHour, isMinute, isSecond) {
    let local = value.trim();
    if (local === "") {
      // If input is cleared, set that part to zero
      if (isHour) setTimer((timer) => timer % 3600);
      if (isMinute)
        setTimer((timer) => Math.floor(timer / 3600) * 3600 + (timer % 60));
      if (isSecond) setTimer((timer) => timer - (timer % 60));
      return;
    }
    let num = Number(local);

    if (isNaN(num)) {
      return;
    }

    if (isHour && num >= 0 && num < 24) {
      setTimer((timer) => 3600 * num + (timer % 3600));
    }
    if (isMinute && num >= 0 && num < 60) {
      setTimer(
        (timer) => 60 * num + Math.floor(timer / 3600) * 3600 + (timer % 60)
      );
    }
    if (isSecond && num >= 0 && num < 60) {
      setTimer((timer) => num + timer - (timer % 60));
    }
  }

  const displayHours = Math.floor(timer / 3600);
  const displayMinutes = Math.floor((timer % 3600) / 60);
  const displaySeconds = timer % 60;

  console.log(state);
  return (
    <div className="container">
      <h1>Countdown Timer</h1>
      <div className="timer">
        <div className="input-container">
          <div className="text">Hours</div>
          <input
            name="input-box"
            type="text"
            className="input-box"
            placeholder="00"
            value={displayHours}
            onChange={(e) => changeTimer(e.target.value, true, false, false)}
            disabled={state !== 0}
            min={0}
            max={23}
          />
        </div>
        <div className="divider">:</div>
        <div className="input-container">
          <div className="text">Minutes</div>
          <input
            name="input-box"
            type="text"
            className="input-box"
            placeholder="00"
            value={displayMinutes}
            onChange={(e) => changeTimer(e.target.value, false, true, false)}
            disabled={state !== 0}
            min={0}
            max={59}
          />
        </div>
        <div className="divider">:</div>
        <div className="input-container">
          <div className="text">Seconds</div>
          <input
            name="input-box"
            type="text"
            className="input-box"
            placeholder="00"
            value={displaySeconds}
            onChange={(e) => changeTimer(e.target.value, false, false, true)}
            disabled={state !== 0}
            min={0}
            max={59}
          />
        </div>
      </div>
      <div className="button-group">
        {state !== 2 ? (
          <button className="start-button" onClick={runTimer}>
            {state === 0 ? "Start" : "Continue"}
          </button>
        ) : (
          <button className="pause-button" onClick={runTimer}>
            pause
          </button>
        )}
        <button className="reset-button" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
}
