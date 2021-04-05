import React from "react";
import { render } from "react-dom";

import App from "./App";

if (process.env.NODE_ENV !== "development") {
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
} else {
  render(<App />, document.getElementById("root"));
}
