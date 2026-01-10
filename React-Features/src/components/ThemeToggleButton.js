import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        margin: "20px",
        padding: "10px 20px",
        backgroundColor: theme === "light" ? "#007bff" : "#0056b3",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      Toggle to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}
