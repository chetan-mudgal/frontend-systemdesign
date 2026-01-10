import { useState, useTransition, Suspense } from "react";

/**
 * This example shows how useTransition and Suspense can work together
 * for an even better user experience
 */
export function CombinedExample() {
  const [tab, setTab] = useState("home");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (newTab) => {
    // Wrap tab change in transition to keep UI responsive
    startTransition(() => {
      setTab(newTab);
    });
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #FF5722",
        borderRadius: "5px",
        margin: "10px",
      }}
    >
      <h2>🚀 Combined: useTransition + Suspense</h2>
      <p>
        <strong>Concept:</strong> Smooth tab switching with lazy-loaded content
      </p>

      <div style={{ marginBottom: "20px" }}>
        {["home", "profile", "settings"].map((tabName) => (
          <button
            key={tabName}
            onClick={() => handleTabChange(tabName)}
            style={{
              padding: "10px 20px",
              margin: "0 5px",
              backgroundColor: tab === tabName ? "#FF5722" : "#ccc",
              color: tab === tabName ? "white" : "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
          </button>
        ))}
        {isPending && (
          <span style={{ marginLeft: "10px", color: "#ff9800" }}>
            ⏳ Switching tabs...
          </span>
        )}
      </div>

      <div
        style={{
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "5px",
          minHeight: "100px",
        }}
      >
        {tab === "home" && (
          <div>
            <h3>🏠 Home</h3>
            <p>Welcome to the home tab!</p>
          </div>
        )}
        {tab === "profile" && (
          <div>
            <h3>👤 Profile</h3>
            <p>Your profile information would go here.</p>
          </div>
        )}
        {tab === "settings" && (
          <Suspense fallback={<div>⏳ Loading settings...</div>}>
            <div>
              <h3>⚙️ Settings</h3>
              <p>Settings loaded successfully!</p>
            </div>
          </Suspense>
        )}
      </div>

      <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
        <p>
          💡 <strong>Note:</strong> useTransition prevents janky tab switches,
          while Suspense handles lazy loading gracefully.
        </p>
      </div>
    </div>
  );
}
