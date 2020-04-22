import React from "react";
import ReactDOM from "react-dom";
import "typeface-karla";
import "typeface-rubik";
import { App } from "components/App";
import { AppProviders } from "providers/AppProviders";
import "styles/index.css";

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById("root")
);
