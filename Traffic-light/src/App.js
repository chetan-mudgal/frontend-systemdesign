import { useEffect, useState } from "react";

export default function App() {
  const [light, setLight] = useState(0);
  useEffect(() => {
    const interval = setInterval(
      () => setLight((prev) => (prev + 1) % 3),
      2000
    );
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="container">
      <div
        className="box"
        style={{ backgroundColor: light === 0 ? "red" : "grey" }}
      ></div>
      <div
        className="box"
        style={{ backgroundColor: light === 1 ? "yellow" : "grey" }}
      ></div>
      <div
        className="box"
        style={{ backgroundColor: light === 2 ? "green" : "grey" }}
      ></div>
    </div>
  );
}
