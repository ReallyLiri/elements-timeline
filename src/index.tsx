import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "react-tooltip/dist/react-tooltip.css";
import "react-range-slider-input/dist/style.css";
import { Tooltips } from "./components/Tooltips";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
    <Tooltips />
  </React.StrictMode>,
);
