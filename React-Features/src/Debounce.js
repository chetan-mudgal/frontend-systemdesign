import React, { useState, useEffect, useCallback, useRef } from "react";

// =====================================
// CUSTOM DEBOUNCE HOOK
// =====================================

/**
 * useDebounce Hook
 * Delays updating a value until after a specified delay period has elapsed
 * since the last time the value changed.
 *
 * @param {any} value - The value to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {any} - The debounced value
 */
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer if value changes before delay completes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// =====================================
// DEBOUNCED CALLBACK HOOK
// =====================================

/**
 * useDebouncedCallback Hook
 * Returns a memoized debounced version of the callback function
 *
 * @param {Function} callback - The callback function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} - The debounced callback function
 */
function useDebouncedCallback(callback, delay) {
  const timeoutRef = useRef(null);

  const debouncedCallback = useCallback(
    (...args) => {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

// =====================================
// EXAMPLE 1: DEBOUNCED SEARCH INPUT
// =====================================

function DebouncedSearchExample() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Simulate API call when debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);

      // Simulate API call
      setTimeout(() => {
        const mockResults = [
          `Result 1 for "${debouncedSearchTerm}"`,
          `Result 2 for "${debouncedSearchTerm}"`,
          `Result 3 for "${debouncedSearchTerm}"`,
          `Result 4 for "${debouncedSearchTerm}"`,
          `Result 5 for "${debouncedSearchTerm}"`,
        ];
        setSearchResults(mockResults);
        setIsSearching(false);
      }, 500);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #4CAF50",
        borderRadius: "5px",
        margin: "10px",
      }}
    >
      <h2>🔍 Debounced Search Example</h2>
      <p>
        <strong>Concept:</strong> Search API is called only after user stops
        typing for 500ms
      </p>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Type to search..."
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "100%",
          border: "2px solid #4CAF50",
          borderRadius: "4px",
          marginBottom: "10px",
        }}
      />

      <div style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>
        <p>
          <strong>Current input:</strong> {searchTerm || "(empty)"}
        </p>
        <p>
          <strong>Debounced value (used for search):</strong>{" "}
          {debouncedSearchTerm || "(empty)"}
        </p>
      </div>

      {isSearching && (
        <div style={{ padding: "10px", color: "#FF9800" }}>🔄 Searching...</div>
      )}

      {searchResults.length > 0 && (
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          <strong>Search Results:</strong>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
        <p>
          💡 <strong>Note:</strong> Notice how the search only executes after
          you stop typing for 500ms. This prevents excessive API calls!
        </p>
      </div>
    </div>
  );
}

// =====================================
// EXAMPLE 2: DEBOUNCED WINDOW RESIZE
// =====================================

function DebouncedResizeExample() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [resizeCount, setResizeCount] = useState(0);
  const [debouncedResizeCount, setDebouncedResizeCount] = useState(0);

  // Debounced resize handler
  const handleResize = useDebouncedCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    setDebouncedResizeCount((prev) => prev + 1);
  }, 300);

  useEffect(() => {
    const handleImmediateResize = () => {
      setResizeCount((prev) => prev + 1);
      handleResize();
    };

    window.addEventListener("resize", handleImmediateResize);

    return () => {
      window.removeEventListener("resize", handleImmediateResize);
    };
  }, [handleResize]);

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #2196F3",
        borderRadius: "5px",
        margin: "10px",
      }}
    >
      <h2>📏 Debounced Window Resize Example</h2>
      <p>
        <strong>Concept:</strong> Expensive operations only run after resize
        stops
      </p>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "15px",
          borderRadius: "4px",
          marginBottom: "10px",
        }}
      >
        <p>
          <strong>Current Window Size:</strong> {windowSize.width} x{" "}
          {windowSize.height}
        </p>
        <p>
          <strong>Total resize events fired:</strong> {resizeCount}
        </p>
        <p>
          <strong>Debounced handler executed:</strong> {debouncedResizeCount}{" "}
          times
        </p>
      </div>

      <div style={{ fontSize: "14px", color: "#666" }}>
        <p>
          💡 <strong>Note:</strong> Resize your browser window and watch the
          counters. The resize event fires many times, but our debounced handler
          only executes after you stop resizing!
        </p>
        <p>
          🎯 <strong>Benefit:</strong> This prevents expensive recalculations or
          API calls during continuous resize events.
        </p>
      </div>
    </div>
  );
}

// =====================================
// EXAMPLE 3: DEBOUNCED FORM VALIDATION
// =====================================

function DebouncedValidationExample() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const debouncedEmail = useDebounce(email, 500);
  const debouncedUsername = useDebounce(username, 500);
  const [emailAvailable, setEmailAvailable] = useState(null);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [checking, setChecking] = useState({ email: false, username: false });

  // Check email availability
  useEffect(() => {
    if (debouncedEmail) {
      setChecking((prev) => ({ ...prev, email: true }));

      // Simulate API call
      setTimeout(() => {
        const isAvailable = debouncedEmail.includes("@");
        setEmailAvailable(isAvailable);
        setChecking((prev) => ({ ...prev, email: false }));
      }, 500);
    } else {
      setEmailAvailable(null);
    }
  }, [debouncedEmail]);

  // Check username availability
  useEffect(() => {
    if (debouncedUsername && debouncedUsername.length >= 3) {
      setChecking((prev) => ({ ...prev, username: true }));

      // Simulate API call
      setTimeout(() => {
        const isAvailable = !["admin", "user", "test"].includes(
          debouncedUsername.toLowerCase()
        );
        setUsernameAvailable(isAvailable);
        setChecking((prev) => ({ ...prev, username: false }));
      }, 500);
    } else {
      setUsernameAvailable(null);
    }
  }, [debouncedUsername]);

  const getEmailStatus = () => {
    if (checking.email) return { text: "Checking...", color: "#FF9800" };
    if (emailAvailable === null) return null;
    if (emailAvailable)
      return { text: "✓ Valid email format", color: "#4CAF50" };
    return { text: "✗ Invalid email format", color: "#F44336" };
  };

  const getUsernameStatus = () => {
    if (checking.username) return { text: "Checking...", color: "#FF9800" };
    if (usernameAvailable === null) return null;
    if (usernameAvailable)
      return { text: "✓ Username available", color: "#4CAF50" };
    return { text: "✗ Username taken", color: "#F44336" };
  };

  const emailStatus = getEmailStatus();
  const usernameStatus = getUsernameStatus();

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #9C27B0",
        borderRadius: "5px",
        margin: "10px",
      }}
    >
      <h2>✅ Debounced Form Validation Example</h2>
      <p>
        <strong>Concept:</strong> Validate input after user stops typing
      </p>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          <strong>Email:</strong>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "100%",
            border: "2px solid #9C27B0",
            borderRadius: "4px",
          }}
        />
        {emailStatus && (
          <div style={{ marginTop: "5px", color: emailStatus.color }}>
            {emailStatus.text}
          </div>
        )}
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          <strong>Username:</strong>
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username (try 'admin', 'user', or 'test')..."
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "100%",
            border: "2px solid #9C27B0",
            borderRadius: "4px",
          }}
        />
        {usernameStatus && (
          <div style={{ marginTop: "5px", color: usernameStatus.color }}>
            {usernameStatus.text}
          </div>
        )}
      </div>

      <div style={{ fontSize: "14px", color: "#666" }}>
        <p>
          💡 <strong>Note:</strong> Validation only runs after you stop typing
          for 500ms. This prevents hammering the validation API with every
          keystroke!
        </p>
      </div>
    </div>
  );
}

// =====================================
// EXAMPLE 4: DEBOUNCED AUTO-SAVE
// =====================================

function DebouncedAutoSaveExample() {
  const [content, setContent] = useState("");
  const [savedContent, setSavedContent] = useState("");
  const [saveStatus, setSaveStatus] = useState("All changes saved");
  const debouncedContent = useDebounce(content, 1000);

  // Auto-save when debounced content changes
  useEffect(() => {
    if (content !== savedContent && debouncedContent) {
      setSaveStatus("Saving...");

      // Simulate API call to save
      setTimeout(() => {
        setSavedContent(debouncedContent);
        setSaveStatus("All changes saved");
      }, 500);
    }
  }, [debouncedContent, content, savedContent]);

  const isDirty = content !== savedContent;

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #FF5722",
        borderRadius: "5px",
        margin: "10px",
      }}
    >
      <h2>💾 Debounced Auto-Save Example</h2>
      <p>
        <strong>Concept:</strong> Save changes automatically after typing stops
      </p>

      <div style={{ marginBottom: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <strong>Document Editor:</strong>
          <span
            style={{
              color: isDirty ? "#FF9800" : "#4CAF50",
              fontSize: "14px",
            }}
          >
            {saveStatus}
          </span>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start typing... Changes will auto-save after 1 second"
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "100%",
            minHeight: "150px",
            border: "2px solid #FF5722",
            borderRadius: "4px",
            fontFamily: "monospace",
            resize: "vertical",
          }}
        />
      </div>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "10px",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      >
        <p>
          <strong>Last saved content:</strong>
        </p>
        <pre
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            borderRadius: "4px",
            maxHeight: "100px",
            overflow: "auto",
          }}
        >
          {savedContent || "(nothing saved yet)"}
        </pre>
      </div>

      <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
        <p>
          💡 <strong>Note:</strong> Type something and wait 1 second. The
          content will auto-save, preventing data loss while avoiding excessive
          save operations!
        </p>
      </div>
    </div>
  );
}

// =====================================
// MAIN APP COMPONENT
// =====================================

export default function DebounceDemo() {
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
        <h1>⏱️ Debounce in React - Complete Guide</h1>
        <p style={{ fontSize: "18px", color: "#666" }}>
          Learn how to implement and use debouncing to optimize performance
        </p>
      </div>

      {/* Example 1: Debounced Search */}
      <DebouncedSearchExample />

      {/* Example 2: Debounced Resize */}
      <DebouncedResizeExample />

      {/* Example 3: Debounced Validation */}
      <DebouncedValidationExample />

      {/* Example 4: Debounced Auto-Save */}
      <DebouncedAutoSaveExample />

      {/* Key Takeaways */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#FFF3E0",
          borderRadius: "5px",
          border: "2px solid #FF9800",
        }}
      >
        <h3>📚 Key Takeaways:</h3>
        <ul style={{ lineHeight: "1.8" }}>
          <li>
            <strong>useDebounce Hook:</strong> Delays updating a value until
            after a specified delay period
          </li>
          <li>
            <strong>useDebouncedCallback Hook:</strong> Returns a debounced
            version of a callback function
          </li>
          <li>
            <strong>Use Cases:</strong> Search inputs, form validation,
            auto-save, window resize handlers, scroll events
          </li>
          <li>
            <strong>Benefits:</strong> Reduces API calls, improves performance,
            enhances user experience
          </li>
          <li>
            <strong>Best Practice:</strong> Choose appropriate delay times
            (200-500ms for search, 1000ms for auto-save)
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
          {`// useDebounce Hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Usage:
const debouncedSearchTerm = useDebounce(searchTerm, 500);`}
        </pre>
      </div>
    </div>
  );
}
