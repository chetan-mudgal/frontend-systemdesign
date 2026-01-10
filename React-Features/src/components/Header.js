import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function Header() {
  // Use useContext to access the theme
  const { theme } = useContext(ThemeContext);

  return (
    <header
      style={{
        padding: "20px",
        backgroundColor: theme === "light" ? "#f0f0f0" : "#333",
        color: theme === "light" ? "#333" : "#f0f0f0",
      }}
    >
      <h1>useContext Example - Theme Switcher</h1>
    </header>
  );
}
