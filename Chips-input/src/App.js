import { useState } from "react";

export default function App() {
  const [chips, setChips] = useState([]);
  const [value, setValue] = useState("");
  function removeChip(index) {
    let newChips = [...chips.slice(0, index), ...chips.slice(index + 1)];
    setChips(newChips);
  }
  function handleKeyDown(e) {
    console.log(e.key);
    if (e.key === "Enter") {
      let str = value.trim();
      if (!str) {
        return;
      }
      setChips((prev) => {
        let newChips = [...prev, { name: value }];
        return newChips;
      });
      setValue("");
    }
  }
  return (
    <div className="container">
      <h1 className="title">Chips Input</h1>
      <input
        type="text"
        className="input-box"
        placeholder="Type a tag and press enter"
        name="chip-inputs"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="chips-container">
        {chips.map((chip, index) => {
          return (
            <div key={index} className="chip">
              <div className="chip-text">{chip.name}</div>
              <button
                className="remove-button"
                onClick={(e) => removeChip(index)}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
