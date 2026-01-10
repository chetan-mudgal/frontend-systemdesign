import { useState, useTransition } from "react";

/**
 * useTransition Hook:
 * - Allows you to mark state updates as "transitions" (non-urgent updates)
 * - Returns [isPending, startTransition]
 * - isPending: boolean indicating if transition is in progress
 * - startTransition: function to wrap non-urgent state updates
 *
 * Use Cases:
 * - Heavy computations that would otherwise freeze the UI
 * - Filtering large lists
 * - Search operations
 * - Keeping UI responsive during expensive operations
 */
export function TransitionExample() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  // Generate a large list based on input (expensive operation)
  const handleChange = (e) => {
    const value = e.target.value;

    // Update input immediately (urgent update - keeps input responsive)
    setInput(value);

    // Wrap expensive operation in startTransition (non-urgent update)
    startTransition(() => {
      // This creates a large list - expensive operation
      const newList = [];
      for (let i = 0; i < 10000; i++) {
        newList.push(`${value} - Item ${i}`);
      }
      setList(newList);
    });
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
      <h2>🔄 useTransition Example</h2>
      <p>
        <strong>Concept:</strong> Keep UI responsive during expensive state
        updates
      </p>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Type to filter (try typing fast)..."
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "300px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        {isPending && (
          <span style={{ marginLeft: "10px", color: "#ff9800" }}>
            ⏳ Updating list...
          </span>
        )}
      </div>

      <div
        style={{
          maxHeight: "200px",
          overflow: "auto",
          backgroundColor: "#f5f5f5",
          padding: "10px",
          borderRadius: "4px",
        }}
      >
        <p>
          <strong>Generated items:</strong> {list.length}
        </p>
        {list.slice(0, 50).map((item, index) => (
          <div key={index} style={{ padding: "2px 0" }}>
            {item}
          </div>
        ))}
        {list.length > 50 && <p>... and {list.length - 50} more items</p>}
      </div>

      <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
        <p>
          💡 <strong>Note:</strong> Without useTransition, typing would feel
          laggy because React would try to update the massive list immediately.
          With useTransition, the input remains responsive!
        </p>
      </div>
    </div>
  );
}
