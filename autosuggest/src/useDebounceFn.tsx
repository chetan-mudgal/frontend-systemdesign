import { useEffect, useState } from "react";

// Debounce the input value
export default function useDebounceInput(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      console.log("Clearing timeout", handler);
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
