import { useState } from "react";
import { topics } from "./data";
export default function App() {
  const allfalseState = topics.map((i) => false);
  const [open, setOpen] = useState(allfalseState);
  return (
    <div className="container">
      {topics.map((item, index) => (
        <div className="box-root">
          <div
            className="box-item"
            onClick={() =>
              setOpen((prev) => {
                let newState = [...allfalseState];
                newState[index] = !prev[index];
                return newState;
              })
            }
          >
            <span className="text">{item.title}</span>
            <span className="accordian">{open[index] ? "-" : "+"}</span>
          </div>
          {open[index] && (
            <div className="box-item-sub">
              <span className="sub-text">{item.description}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
