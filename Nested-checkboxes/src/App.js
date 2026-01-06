import { useEffect, useState } from "react";
import { checkBoxData } from "./data";
function List({ items, isParentChecked, parentCheckCallback }) {
  const [checks, setChecks] = useState(items.map((item) => false));
  useEffect(() => {
    if (isParentChecked) {
      // console.log("isParentChecked", isParentChecked);
      setChecks(items.map((item) => true));
    }
  }, [isParentChecked]);

  useEffect(() => {
    if (checks.length > 0 && checks.every((check) => check === true)) {
      console.log(checks);
      parentCheckCallback();
    }
  }, checks);

  function markParentChecked(index) {
    setChecks((prev) => {
      const newState = [...prev];
      newState[index] = true;
      // console.log("setChecks", newState);
      return newState;
    });
  }
  return (
    items &&
    items.map((item, index) => (
      <div className="list-container">
        <div className="list-child">
          <input
            key={index}
            type="checkbox"
            checked={checks[index]}
            onChange={() =>
              setChecks((prev) => {
                const newState = [...prev];
                newState[index] = !prev[index];
                return newState;
              })
            }
          />
          {item.name}
        </div>
        <List
          items={item.children}
          isParentChecked={checks[index]}
          parentCheckCallback={() => markParentChecked(index)}
        />
      </div>
    ))
  );
}
export default function App() {
  const [data, setData] = useState(checkBoxData);
  return (
    <div className="container">
      <List
        items={data}
        isParentChecked={false}
        parentCheckCallback={() => {}}
      />
    </div>
  );
}
