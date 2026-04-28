import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(error: Error, info: React.ErrorInfo) { console.error("App render error:", error, info); }
  render() {
    if (this.state.error) {
      return React.createElement("div",
        { style: { padding: 24, fontFamily: "monospace", color: "#b00020", whiteSpace: "pre-wrap" } },
        "App crashed: " + (this.state.error.message || String(this.state.error)) + "\n\n" + (this.state.error.stack || "")
      );
    }
    return this.props.children;
  }
}

const root = createRoot(document.getElementById("root")!);
root.render(<ErrorBoundary><App /></ErrorBoundary>);
