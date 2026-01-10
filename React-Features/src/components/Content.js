import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function Content() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: theme === "light" ? "#fff" : "#222",
        color: theme === "light" ? "#000" : "#fff",
        minHeight: "200px",
      }}
    >
      <p>
        Current theme: <strong>{theme}</strong>
      </p>
      <p>
        This component uses useContext to access theme data without prop
        drilling!
      </p>
    </div>
  );
}
