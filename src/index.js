import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Context } from "./utils/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));

console.log(process.env.REACT_APP_API_URL);

root.render(
  <BrowserRouter>
    <Context>
      <App />
    </Context>
  </BrowserRouter>
);
