import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState("");
  return (
    <div className="container">
      <h1>TODO list</h1>
      <div className="input-continer">
        <input
          type="text"
          name="input-box"
          placeholder="Type a task here"
          className="input-box"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={() => {
            let str = value.trim();
            if(!str) return;
            setTasks((prev) => [...prev, { text: str, isCompleted: false }]);
            setValue("");
          }}
        >
          Add
        </button>
      </div>
      <ul className="tasks-container">
        {tasks.map((task, index) => (
          <li className="task-row" key={index}>
            <input
              type="checkbox"
              name="task-checkbox"
              checked={task.isCompleted}
              onChange={() =>
                setTasks((prev) =>
                  prev.map(
                    (t, i) =>
                      i === index ? { ...t, isCompleted: !t.isCompleted } : t // do not shallow copy states, always create new object that is being updated. react treats states as immutable.
                  )
                )
              }
            />
            <span
              className="tasks-text"
              style={{ textDecoration: task.isCompleted ? "line-through" : "" }}
            >
              {task.text}
            </span>
            <button
              onClick={() => {
                setTasks((prev) => prev.filter((t, i) => i !== index));
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
