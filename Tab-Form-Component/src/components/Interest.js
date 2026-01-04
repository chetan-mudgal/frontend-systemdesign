import { useState, useEffect } from "react";

export default function Interest({ nextClickHandler, onChangeHandler, form }) {
  const [cricket, setCricket] = useState(form.cricket ?? false);
  const [javascript, setJavascript] = useState(form.javascript ?? false);
  const [react, setReact] = useState(form.react ?? false);

  useEffect(() => {
    onChangeHandler({ cricket, javascript, react });
  }, [cricket, javascript, react]);
  return (
    <form className="form">
      <div className="form-row">
        <input
          type="checkbox"
          required
          checked={cricket}
          onChange={(e) => setCricket(e.target.checked)}
        />
        <label>Cricket</label>
      </div>

      <div className="form-row">
        <input
          type="checkbox"
          required
          checked={javascript}
          onChange={(e) => setJavascript(e.target.checked)}
        />
        <label>Javascript</label>
      </div>

      <div className="form-row">
        <input
          type="checkbox"
          required
          checked={react}
          onChange={(e) => setReact(e.target.checked)}
        />
        <label>React</label>
      </div>
      <div className="navigation-button">
        <button type="button" onClick={() => nextClickHandler(0)}>
          Prev
        </button>
        <button type="button" onClick={() => nextClickHandler(2)}>
          Next
        </button>
      </div>
    </form>
  );
}
