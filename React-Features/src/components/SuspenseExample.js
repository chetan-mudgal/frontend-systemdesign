import { useState, Suspense } from "react";
import { HeavyComponent } from "./HeavyComponent";

/**
 * Suspense Component:
 * - Lets you display a fallback UI while waiting for children to load
 * - Works with React.lazy() for code-splitting
 * - Works with data fetching libraries (React 18+)
 *
 * Use Cases:
 * - Code splitting (lazy loading components)
 * - Data fetching (with libraries like Relay, Next.js)
 * - Showing loading states declaratively
 * - Improving perceived performance
 */
export function SuspenseExample() {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #9C27B0",
        borderRadius: "5px",
        margin: "10px",
      }}
    >
      <h2>⏳ Suspense Example</h2>
      <p>
        <strong>Concept:</strong> Show fallback UI while components are loading
      </p>

      <button
        onClick={() => setShowComponent(!showComponent)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#9C27B0",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          marginBottom: "10px",
        }}
      >
        {showComponent ? "Hide" : "Load"} Heavy Component
      </button>

      {showComponent && (
        // Suspense wrapper with fallback UI
        <Suspense
          fallback={
            <div
              style={{
                padding: "20px",
                backgroundColor: "#FFF3E0",
                border: "2px dashed #FF9800",
                borderRadius: "5px",
                textAlign: "center",
              }}
            >
              <h3>⏳ Loading component...</h3>
              <p>This fallback is shown while the lazy component loads</p>
              <div className="spinner">🔄</div>
            </div>
          }
        >
          {/* Lazy-loaded component */}
          <HeavyComponent />
        </Suspense>
      )}

      <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
        <p>
          💡 <strong>Note:</strong> Click the button to trigger lazy loading.
          Suspense shows a loading state automatically while the component is
          being fetched!
        </p>
        <p>
          🎯 <strong>Benefits:</strong> Code splitting reduces initial bundle
          size and improves performance.
        </p>
      </div>
    </div>
  );
}
