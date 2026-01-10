import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { ThemeToggleButton } from "./components/ThemeToggleButton";
import { TransitionExample } from "./components/TransitionExample";
import { SuspenseExample } from "./components/SuspenseExample";
import { CombinedExample } from "./components/CombinedExample";
import { KeyTakeaways } from "./components/KeyTakeaways";
import DebounceDemo from "./Debounce";
import ThrottleDemo from "./Throttle";

// Step 4: Wrap your app with the Provider
export default function App() {
  return (
    // <ThemeProvider>
    //   <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
    //     <Header />
    //     <Content />
    //     <ThemeToggleButton />

    //     <hr style={{ margin: "30px 0", border: "1px solid #ccc" }} />

    //     <div>
    //       <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
    //         🎓 React Advanced Features Demo
    //       </h1>

    //       {/* useTransition Example */}
    //       <TransitionExample />

    //       {/* Suspense Example */}
    //       <SuspenseExample />

    //       {/* Combined Example */}
    //       <CombinedExample />

    //       {/* Key Takeaways */}
    //       <KeyTakeaways />
    //     </div>
    //   </div>
    // </ThemeProvider>

    // <DebounceDemo />

    <ThrottleDemo />
  );
}
