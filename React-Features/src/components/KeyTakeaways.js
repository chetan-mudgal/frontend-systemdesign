export function KeyTakeaways() {
  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        backgroundColor: "#E3F2FD",
        borderRadius: "5px",
        border: "2px solid #2196F3",
      }}
    >
      <h3>📚 Key Takeaways:</h3>
      <ul style={{ lineHeight: "1.8" }}>
        <li>
          <strong>useTransition:</strong> Marks state updates as non-urgent,
          keeping UI responsive during expensive operations
        </li>
        <li>
          <strong>Suspense:</strong> Declaratively handles loading states for
          lazy-loaded components and async operations
        </li>
        <li>
          <strong>Together:</strong> Create smooth, responsive UIs with
          excellent perceived performance
        </li>
        <li>
          <strong>React 18+:</strong> These features work best with concurrent
          rendering in React 18 and above
        </li>
      </ul>
    </div>
  );
}
