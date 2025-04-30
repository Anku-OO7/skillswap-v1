import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer position="top-center"/>
  </AuthProvider>
  </React.StrictMode>
);