import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import "react-tooltip/dist/react-tooltip.css";
import "react-range-slider-input/dist/style.css";
import { Tooltips } from "./components/Tooltips";
import { TourProvider } from "@reactour/tour";
import { tourSteps } from "./components/Tour";
import { PANE_COLOR_ALT } from "./data/colors";
import { Sep24Page } from "./sep24/Sep24Page";
import {Nov24Page} from "./nov24/Nov24Page";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={
          <TourProvider
            steps={tourSteps}
            styles={{
              maskArea: (base) => ({ ...base, rx: 8 }),
              popover: (base) => ({
                ...base,
                "--reactour-accent": PANE_COLOR_ALT,
                borderRadius: "0.5rem"
              })
            }}
          >
            <App />
          </TourProvider>
        } />
        <Route path={"/sep24"} element={<Sep24Page />} />
        <Route path={"/nov24"} element={<Nov24Page />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    <Tooltips />
  </React.StrictMode>
);
