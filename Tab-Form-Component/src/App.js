import { useRef, useState } from "react";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Interest from "./components/Interest";

// build using configurable UI
export default function App() {
  const [selectedTab, setSelectedTab] = useState(0);
  const form = useRef({});
  function onChangeHandler(Obj) {
    form.current = {
      ...form.current,
      ...Obj,
    };
  }
  return (
    <div>
      <div className="tab-group">
        <button
          className={`tab + ${selectedTab == 0 ? "selected" : ""}`}
          onClick={() => setSelectedTab(0)}
        >
          Profile
        </button>
        <button
          className={`tab + ${selectedTab == 1 ? "selected" : ""}`}
          onClick={() => setSelectedTab(1)}
        >
          Interest
        </button>
        <button
          className={`tab + ${selectedTab == 2 ? "selected" : ""}`}
          onClick={() => setSelectedTab(2)}
        >
          Settings
        </button>
      </div>
      <div className="container">
        {selectedTab == 0 && (
          <Profile
            nextClickHandler={(i) => setSelectedTab(i)}
            onChangeHandler={onChangeHandler}
            form={form.current}
          />
        )}
        {selectedTab == 1 && (
          <Interest
            nextClickHandler={(i) => setSelectedTab(i)}
            onChangeHandler={onChangeHandler}
            form={form.current}
          />
        )}
        {selectedTab == 2 && (
          <Settings
            nextClickHandler={(i) => setSelectedTab(i)}
            onChangeHandler={onChangeHandler}
            form={form.current}
          />
        )}
      </div>
    </div>
  );
}
