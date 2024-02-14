import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";

// Use createRoot to render your application
const root = createRoot(document.getElementById("root")); // Pass the root element as an argument
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


