import { lazy } from "react";

// Lazy load a component that takes time to load
// This simulates a large component or code-splitting scenario
export const HeavyComponent = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div
            style={{
              padding: "20px",
              border: "2px solid #4CAF50",
              borderRadius: "5px",
              margin: "10px",
            }}
          >
            <h3>🎉 Heavy Component Loaded!</h3>
            <p>
              This component was lazy-loaded using React.lazy() and displayed
              using Suspense.
            </p>
            <p>
              The loading fallback was shown while this component was being
              fetched.
            </p>
          </div>
        ),
      });
    }, 2000); // Simulate 2-second loading time
  });
});
