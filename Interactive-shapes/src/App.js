import { useEffect, useState, useRef, useMemo } from "react";

const SIZE = 5;
const GRID = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));

export default function App() {
  const [order, setOrder] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const debounceTimerRef = useRef(null);
  const clearTimerRef = useRef(null);

  const selectedCells = useMemo(() => {
    const set = new Set();
    order.forEach(([x, y]) => set.add(`${x}-${y}`));
    return set;
  }, [order]);

  // Start clearing shapes in reverse order
  function startClearing() {
    if (order.length === 0) {
      setInProgress(false);
      return;
    }

    setInProgress(true);
    clearTimerRef.current = setTimeout(() => {
      setOrder((prev) => {
        const newOrder = prev.slice(0, -1); // Remove last item
        if (newOrder.length === 0) {
          setInProgress(false);
        }
        return newOrder;
      });
    }, 1000);
  }

  // Debounce function - resets 5 sec timer on each click
  function resetDebounceTimer() {
    // Clear existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Clear any ongoing clearing process
    if (clearTimerRef.current) {
      clearTimeout(clearTimerRef.current);
    }

    setInProgress(false);

    // Set new 5 second debounce timer
    debounceTimerRef.current = setTimeout(() => {
      startClearing();
    }, 5000);
  }

  // Effect to handle the clearing chain
  useEffect(() => {
    if (inProgress && order.length > 0) {
      startClearing();
    }

    return () => {
      if (clearTimerRef.current) {
        clearTimeout(clearTimerRef.current);
      }
    };
  }, [order, inProgress]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current);
    };
  }, []);

  function handleClick(x, y) {
    const key = `${x}-${y}`;
    if (!selectedCells.has(key)) {
      setOrder((prev) => [...prev, [x, y]]);
      resetDebounceTimer();
    }
  }

  return (
    <div className="container">
      {GRID.map((arr, x) =>
        arr.map((_, y) => {
          const key = `${x}-${y}`;
          return (
            <div
              key={key}
              className="cell"
              style={{
                backgroundColor: selectedCells.has(key) ? "blue" : "",
              }}
              onClick={() => handleClick(x, y)}
            ></div>
          );
        })
      )}
    </div>
  );
}
