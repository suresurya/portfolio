import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import MouseTracker from "./components/MouseTracker.tsx"
import { ThemeProvider } from "./components/ThemeProvider"
import ErrorBoundary from "./components/ErrorBoundary.tsx"

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary
    fallback={
      <main className="min-h-screen grid place-items-center p-6 text-center text-[color:var(--color-text-main)] bg-[color:var(--color-bg)]">
        <div className="max-w-lg space-y-3">
          <h1 className="text-2xl sm:text-3xl font-semibold">Something went wrong</h1>
          <p className="text-sm sm:text-base text-[color:var(--color-text-subtle)]">
            Please refresh the page. If this keeps happening, reach out using the contact section.
          </p>
        </div>
      </main>
    }
    onError={(error) => {
      console.error("App root error", error)
    }}
  >
    <ThemeProvider>
      <MouseTracker />
      <App />
    </ThemeProvider>
  </ErrorBoundary>
)
