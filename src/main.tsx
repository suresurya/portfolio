import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import MouseTracker from "./components/MouseTracker.tsx"
import { ThemeProvider } from "./components/ThemeProvider"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <MouseTracker />
      <App />
    </ThemeProvider>
  </StrictMode>
)
