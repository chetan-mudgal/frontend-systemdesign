import { useRef, useState } from "react";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Interest from "./components/Interest";

const config = [
  {
    name: "Profile",
    component: Profile,
  },
  {
    name: "Interest",
    component: Interest,
  },
  {
    name: "Settings",
    component: Settings,
  },
];
// build using configurable UI
export default function App() {
  const [selectedTab, setSelectedTab] = useState(0);
  const form = useRef({});
  const [errors, setErrors] = useState({});
  function onChangeHandler(Obj) {
    form.current = {
      ...form.current,
      ...Obj,
    };
  }
  const ActiveTab = config[selectedTab].component;
  return (
    <div>
      <div className="tab-group">
        {config.map((tab, index) => (
          <button
            className={`tab + ${selectedTab == index ? "selected" : ""}`}
            onClick={() => setSelectedTab(index)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="container">
        <ActiveTab
          nextClickHandler={(i) => setSelectedTab(i)}
          onChangeHandler={onChangeHandler}
          form={form.current}
          errors={errors}
        />
      </div>
    </div>
  );
}
