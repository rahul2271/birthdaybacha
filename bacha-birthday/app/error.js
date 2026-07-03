"use client";

export default function Error({ error, reset }) {
  return (
    <div
      style={{
        padding: "3rem 1.5rem",
        color: "#f7f5f2",
        background: "#0b0b10",
        minHeight: "100vh",
        fontFamily: "monospace",
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>Something broke — here&apos;s why:</h2>
      <pre style={{ whiteSpace: "pre-wrap", color: "#d9aedb", fontSize: "0.9rem" }}>
        {error?.message}
        {"\n\n"}
        {error?.stack}
      </pre>
      <button
        onClick={() => reset()}
        style={{
          marginTop: "2rem",
          padding: "0.6rem 1.2rem",
          background: "#4fc4c9",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
