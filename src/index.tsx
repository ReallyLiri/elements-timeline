import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "react-tooltip/dist/react-tooltip.css";
import "react-range-slider-input/dist/style.css";
import { Tooltips } from "./components/Tooltips";
import { TourProvider } from "@reactour/tour";
import { tourSteps } from "./components/Tour";
import { PANE_COLOR_ALT } from "./data/colors";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <TourProvider
      steps={tourSteps}
      styles={{
        maskArea: (base) => ({ ...base, rx: 8 }),
        popover: (base) => ({
          ...base,
          "--reactour-accent": PANE_COLOR_ALT,
          borderRadius: "0.5rem",
        }),
      }}
    >
      <App />
    </TourProvider>
    <Tooltips />
  </React.StrictMode>,
);
