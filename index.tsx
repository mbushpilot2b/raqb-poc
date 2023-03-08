
import React, {Component} from "react";
import ReactDOM from "react-dom";
const Demo = React.lazy(() => import("./demo"));
import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom";

const rootElement = window.document.getElementById("root");

ReactDOM.render((
  <HashRouter>
    <Routes>
      <Route path="*" element={<React.Suspense fallback={<>...</>}><Demo /></React.Suspense>} />
    </Routes>
  </HashRouter>
), rootElement);
