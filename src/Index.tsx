/**
 * Ponto de entrada do app React
 * Inclui CSS global e renderiza o <App />
 */

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.css";

const root = createRoot(document.getElementById("root")!);
root.render(<React.StrictMode><App /></React.StrictMode>);
