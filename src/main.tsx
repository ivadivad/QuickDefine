import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// pega a div do index.html
const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

// renderiza o React
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);