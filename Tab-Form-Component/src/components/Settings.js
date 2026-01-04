import { useState, useEffect } from "react";

export default function Settings({ nextClickHandler, onChangeHandler, form }) {
  const [theme, setTheme] = useState(form.theme ?? "light");

  useEffect(() => {
    onChangeHandler({ theme });
  }, [theme]);
  return (
    <form className="form">
      <div className="form-row">
        <input
          type="radio"
          name="theme"
          value="light"
          checked={theme == "light"}
          onChange={(e) => setTheme(e.target.value)}
        />
        <label>Light</label>
      </div>

      <div className="form-row">
        <input
          type="radio"
          name="theme"
          value="dark"
          checked={theme == "dark"}
          onChange={(e) => setTheme(e.target.value)}
        />
        <label>Dark</label>
      </div>
      <div className="navigation-button">
        <button type="button" onClick={() => nextClickHandler(1)}>
          Prev
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
