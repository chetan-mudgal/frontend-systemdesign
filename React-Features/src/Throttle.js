import React, { useState, useEffect, useCallback, useRef } from "react";

// =====================================
// CUSTOM THROTTLE HOOKS
// =====================================

/**
 * useThrottle Hook
 * Limits how often a value can update. Once it updates, it won't update again
 * until the specified time period has elapsed.
 *
 * @param {any} value - The value to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {any} - The throttled value
 */
function useThrottle(value, limit) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
}

/**
 * useThrottledCallback Hook
 * Returns a throttled version of the callback that only executes
 * at most once per specified time period.
 *
 * @param {Function} callback - The callback function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} - The throttled callback function
 */
function useThrottledCallback(callback, limit) {
  const lastRan = useRef(Date.now());
  const timeoutRef = useRef(null);

  const throttledCallback = useCallback(
    (...args) => {
      const now = Date.now();

      if (now - lastRan.current >= limit) {
        // Execute immediately if enough time has passed
        callback(...args);
        lastRan.current = now;
      } else {
        // Schedule execution for when the limit period expires
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          callback(...args);
          lastRan.current = Date.now();
        }, limit - (now - lastRan.current));
      }
    },
    [callback, limit]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledCallback;
}

// =====================================
// EXAMPLE 1: THROTTLED SCROLL TRACKING
// =====================================

function ThrottledScrollExample() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollCount, setScrollCount] = useState(0);
  const [throttledScrollCount, setThrottledScrollCount] = useState(0);

  const handleThrottledScroll = useThrottledCallback(() => {
    setScrollPosition(window.scrollY);
    setThrottledScrollCount((prev) => prev + 1);
  }, 200);

  useEffect(() => {
    const handleScroll = () => {
      setScrollCount((prev) => prev + 1);
      handleThrottledScroll();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleThrottledScroll]);

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #4CAF50",
        borderRadius: "5px",
        margin: "10px",
        position: "sticky",
        top: "10px",
        backgroundColor: "white",
        zIndex: 100,
      }}
    >
      <h2>📜 Throttled Scroll Tracking</h2>
      <p>
        <strong>Concept:</strong> Track scroll position efficiently (updates at
        most every 200ms)
      </p>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "15px",
          borderRadius: "4px",
        }}
      >
        <p>
          <strong>Current Scroll Position:</strong> {Math.round(scrollPosition)}
          px
        </p>
        <p>
          <strong>Total scroll events fired:</strong> {scrollCount}
        </p>
        <p>
          <strong>Throttled handler executed:</strong> {throttledScrollCount}{" "}
          times
        </p>
        <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
          <strong>Efficiency:</strong>{" "}
          {scrollCount > 0
            ? `${Math.round(
                (1 - throttledScrollCount / scrollCount) * 100
              )}% reduction in executions`
            : "Scroll to see stats"}
        </p>
      </div>

      <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
        <p>
          💡 <strong>Note:</strong> Scroll down to see the difference! The
          scroll event fires constantly, but our throttled handler only executes
          every 200ms.
        </p>
      </div>
    </div>
  );
}

// =====================================
// EXAMPLE 2: THROTTLED BUTTON CLICKS
// =====================================

function ThrottledButtonExample() {
  const [clickCount, setClickCount] = useState(0);
  const [throttledClicks, setThrottledClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(null);

  const handleThrottledClick = useThrottledCallback(() => {
    setThrottledClicks((prev) => prev + 1);
    setLastClickTime(new Date().toLocaleTimeString());
  }, 1000);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    handleThrottledClick();
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #2196F3",
        borderRadius: "5px",
        margin: "10px",
      }}
    >
      <h2>🖱️ Throttled Button Clicks</h2>
      <p>
        <strong>Concept:</strong> Prevent rapid-fire button clicks (max 1 per
        second)
      </p>

      <button
        onClick={handleClick}
        style={{
          padding: "15px 30px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "15px",
        }}
      >
        Click Me Rapidly!
      </button>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "15px",
          borderRadius: "4px",
        }}
      >
        <p>
          <strong>Total button clicks:</strong> {clickCount}
        </p>
        <p>
          <strong>Throttled actions executed:</strong> {throttledClicks}
        </p>
        {lastClickTime && (
          <p>
            <strong>Last throttled action:</strong> {lastClickTime}
          </p>
        )}
      </div>

      <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
        <p>
          💡 <strong>Use Case:</strong> Prevent users from accidentally
          submitting forms multiple times, or prevent spam clicking on action
          buttons.
        </p>
      </div>
    </div>
  );
}

// =====================================
// EXAMPLE 3: THROTTLED MOUSE MOVE TRACKING
// =====================================

function ThrottledMouseMoveExample() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [moveCount, setMoveCount] = useState(0);
  const [throttledMoveCount, setThrottledMoveCount] = useState(0);
  const containerRef = useRef(null);

  const handleThrottledMove = useThrottledCallback((clientX, clientY) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: Math.round(clientX - rect.left),
        y: Math.round(clientY - rect.top),
      });
      setThrottledMoveCount((prev) => prev + 1);
    }
  }, 100);

  const handleMouseMove = (e) => {
    setMoveCount((prev) => prev + 1);
    handleThrottledMove(e.clientX, e.clientY);
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #9C27B0",
        borderRadius: "5px",
        margin: "10px",
      }}
    >
      <h2>🎯 Throttled Mouse Move Tracking</h2>
      <p>
        <strong>Concept:</strong> Track mouse position efficiently (updates
        every 100ms)
      </p>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        style={{
          backgroundColor: "#E1BEE7",
          padding: "20px",
          borderRadius: "4px",
          minHeight: "200px",
          marginBottom: "10px",
          cursor: "crosshair",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: mousePosition.x,
            top: mousePosition.y,
            width: "20px",
            height: "20px",
            backgroundColor: "#9C27B0",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>
          Move your mouse in this area
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "15px",
          borderRadius: "4px",
        }}
      >
        <p>
          <strong>Mouse Position:</strong> X: {mousePosition.x}, Y:{" "}
          {mousePosition.y}
        </p>
        <p>
          <strong>Total mousemove events:</strong> {moveCount}
        </p>
        <p>
          <strong>Throttled updates:</strong> {throttledMoveCount}
        </p>
        <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
          <strong>Efficiency:</strong>{" "}
          {moveCount > 0
            ? `${Math.round(
                (1 - throttledMoveCount / moveCount) * 100
              )}% reduction`
            : "Move mouse to see stats"}
        </p>
      </div>

      <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
        <p>
          💡 <strong>Use Case:</strong> Drawing apps, drag-and-drop, game
          controls, or any intensive mouse tracking.
        </p>
      </div>
    </div>
  );
}

// =====================================
// EXAMPLE 4: THROTTLED API CALLS (Live Search)
// =====================================

function ThrottledSearchExample() {
  const [searchTerm, setSearchTerm] = useState("");
  const [apiCallCount, setApiCallCount] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = useThrottledCallback((term) => {
    if (!term) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setApiCallCount((prev) => prev + 1);

    // Simulate API call
    setTimeout(() => {
      const mockResults = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        title: `${term} - Result ${i + 1}`,
        description: `This is a search result for "${term}"`,
      }));
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 300);
  }, 500);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    performSearch(value);
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
      <h2>🔍 Throttled Live Search</h2>
      <p>
        <strong>Concept:</strong> Instant search feedback with controlled API
        calls (max 1 per 500ms)
      </p>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Type to search (updates at most every 500ms)..."
        style={{
          padding: "12px",
          fontSize: "16px",
          width: "100%",
          border: "2px solid #FF5722",
          borderRadius: "4px",
          marginBottom: "10px",
        }}
      />

      <div
        style={{
          backgroundColor: "#FFEBEE",
          padding: "10px",
          borderRadius: "4px",
          marginBottom: "10px",
        }}
      >
        <p>
          <strong>Current input:</strong> {searchTerm || "(empty)"}
        </p>
        <p>
          <strong>API calls made:</strong> {apiCallCount}
        </p>
        {isSearching && <p style={{ color: "#FF9800" }}>⏳ Searching...</p>}
      </div>

      {searchResults.length > 0 && (
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "15px",
            borderRadius: "4px",
          }}
        >
          <strong>Search Results:</strong>
          <div style={{ marginTop: "10px" }}>
            {searchResults.map((result) => (
              <div
                key={result.id}
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  marginBottom: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              >
                <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                  {result.title}
                </div>
                <div style={{ fontSize: "14px", color: "#666" }}>
                  {result.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
        <p>
          💡 <strong>Note:</strong> Unlike debounce (which waits for typing to
          stop), throttle provides immediate feedback while limiting API calls!
        </p>
      </div>
    </div>
  );
}

// =====================================
// EXAMPLE 5: THROTTLED WINDOW RESIZE
// =====================================

function ThrottledResizeExample() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [resizeCount, setResizeCount] = useState(0);
  const [throttledCount, setThrottledCount] = useState(0);

  const handleThrottledResize = useThrottledCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    setThrottledCount((prev) => prev + 1);
  }, 250);

  useEffect(() => {
    const handleResize = () => {
      setResizeCount((prev) => prev + 1);
      handleThrottledResize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleThrottledResize]);

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #00BCD4",
        borderRadius: "5px",
        margin: "10px",
      }}
    >
      <h2>📐 Throttled Window Resize</h2>
      <p>
        <strong>Concept:</strong> Responsive layout updates with controlled
        recalculations
      </p>

      <div
        style={{
          backgroundColor: "#B2EBF2",
          padding: "15px",
          borderRadius: "4px",
        }}
      >
        <p>
          <strong>Window Size:</strong> {dimensions.width} x {dimensions.height}
        </p>
        <p>
          <strong>Resize events fired:</strong> {resizeCount}
        </p>
        <p>
          <strong>Throttled handler executed:</strong> {throttledCount} times
        </p>
        <p style={{ fontSize: "12px", color: "#006064", marginTop: "10px" }}>
          Throttle ensures smooth performance during resize while keeping layout
          updates responsive
        </p>
      </div>

      <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
        <p>
          💡 <strong>Use Case:</strong> Resize your browser window - updates
          happen during resize (not after), but at a controlled rate!
        </p>
      </div>
    </div>
  );
}

// =====================================
// COMPARISON SECTION
// =====================================

function ThrottleVsDebounceComparison() {
  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        backgroundColor: "#FFF9C4",
        borderRadius: "5px",
        border: "2px solid #FBC02D",
      }}
    >
      <h3>⚡ Throttle vs Debounce - When to Use What?</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "15px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "4px",
            border: "2px solid #4CAF50",
          }}
        >
          <h4 style={{ marginTop: 0, color: "#4CAF50" }}>
            🎯 Use THROTTLE When:
          </h4>
          <ul style={{ lineHeight: "1.8" }}>
            <li>
              You want <strong>immediate feedback</strong>
            </li>
            <li>Events fire continuously (scroll, mousemove, resize)</li>
            <li>
              You need <strong>regular updates</strong> during the action
            </li>
            <li>Examples: Progress tracking, live dashboards, game controls</li>
          </ul>
          <p
            style={{
              fontSize: "12px",
              color: "#666",
              marginTop: "10px",
              fontStyle: "italic",
            }}
          >
            "Execute at most once per X milliseconds"
          </p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "4px",
            border: "2px solid #2196F3",
          }}
        >
          <h4 style={{ marginTop: 0, color: "#2196F3" }}>
            🎯 Use DEBOUNCE When:
          </h4>
          <ul style={{ lineHeight: "1.8" }}>
            <li>
              You want to wait for <strong>user to finish</strong>
            </li>
            <li>Action happens once after inactivity</li>
            <li>
              You need the <strong>final value</strong> only
            </li>
            <li>Examples: Search autocomplete, form validation, auto-save</li>
          </ul>
          <p
            style={{
              fontSize: "12px",
              color: "#666",
              marginTop: "10px",
              fontStyle: "italic",
            }}
          >
            "Execute only after X milliseconds of inactivity"
          </p>
        </div>
      </div>
    </div>
  );
}

// =====================================
// MAIN APP COMPONENT
// =====================================

export default function ThrottleDemo() {
  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
          padding: "20px",
          backgroundColor: "#E3F2FD",
          borderRadius: "5px",
        }}
      >
        <h1>⚡ Throttle in React - Complete Guide</h1>
        <p style={{ fontSize: "18px", color: "#666" }}>
          Learn how to implement and use throttling to optimize performance
        </p>
      </div>

      {/* Example 1: Throttled Scroll */}
      <ThrottledScrollExample />

      {/* Add some scrollable content */}
      <div
        style={{
          height: "400px",
          backgroundColor: "#f0f0f0",
          margin: "20px 10px",
          padding: "20px",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ fontSize: "24px", color: "#666" }}>
          👇 Scroll down to see throttling in action 👇
        </p>
      </div>

      {/* Example 2: Throttled Buttons */}
      <ThrottledButtonExample />

      {/* Example 3: Throttled Mouse Move */}
      <ThrottledMouseMoveExample />

      {/* Example 4: Throttled Search */}
      <ThrottledSearchExample />

      {/* Example 5: Throttled Resize */}
      <ThrottledResizeExample />

      {/* Throttle vs Debounce */}
      <ThrottleVsDebounceComparison />

      {/* Key Takeaways */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#E8F5E9",
          borderRadius: "5px",
          border: "2px solid #4CAF50",
        }}
      >
        <h3>📚 Key Takeaways:</h3>
        <ul style={{ lineHeight: "1.8" }}>
          <li>
            <strong>useThrottle Hook:</strong> Limits how often a value can
            update to at most once per time period
          </li>
          <li>
            <strong>useThrottledCallback Hook:</strong> Returns a throttled
            version of a callback function
          </li>
          <li>
            <strong>Use Cases:</strong> Scroll tracking, button clicks, mouse
            movement, live search, window resize
          </li>
          <li>
            <strong>Benefits:</strong> Reduces expensive operations, maintains
            responsiveness, improves performance
          </li>
          <li>
            <strong>Key Difference:</strong> Throttle executes regularly during
            continuous events; Debounce waits for events to stop
          </li>
        </ul>
      </div>

      {/* Implementation Code */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "5px",
          border: "2px solid #666",
        }}
      >
        <h3>💻 Implementation Code:</h3>
        <pre
          style={{
            backgroundColor: "#fff",
            padding: "15px",
            borderRadius: "4px",
            overflow: "auto",
            fontSize: "14px",
          }}
        >
          {`// useThrottle Hook
function useThrottle(value, limit) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => clearTimeout(handler);
  }, [value, limit]);

  return throttledValue;
}

// Usage:
const handleThrottledScroll = useThrottledCallback(() => {
  // This will execute at most once per 200ms
  updateScrollPosition();
}, 200);`}
        </pre>
      </div>
    </div>
  );
}
