/** Vite 应用入口，挂载 ThemeProvider / Vite entry: mount app with theme context */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AvatarProvider } from "./context/AvatarContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AvatarProvider>
        <App />
      </AvatarProvider>
    </ThemeProvider>
  </StrictMode>,
);
