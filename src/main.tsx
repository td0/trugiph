import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </StrictMode>
);
