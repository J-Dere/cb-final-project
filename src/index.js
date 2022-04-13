import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { GlobalContext, GlobalProvider } from "./components/GlobalContext";

ReactDOM.render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
  document.getElementById("root")
);
