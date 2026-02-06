import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContext.Provider value={{ user: null }}>
      <App />
    </AuthContext.Provider>
  </React.StrictMode>
);
