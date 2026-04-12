import { Suspense, lazy, useCallback, useState, type ReactNode } from "react"
import { createBrowserRouter , RouterProvider } from "react-router"
import ErrorPage from "./components/Error"
import LoadingScreen from "./components/LoadingScreen"
import PageSkeleton from "./components/PageSkeleton"
import { Toaster } from "sonner"

const Main = lazy(() => import("./components/Main"))
const Resume = lazy(() => import("./components/Resume"))
const Projects = lazy(() => import("./components/Projects"))
const Body = lazy(() => import("./components/Body"))
const Contact = lazy(() => import("./components/Contact"))
const Portfolio = lazy(() => import("./components/projects/Portfolio"))
const SamuraiGame = lazy(() => import("./components/projects/SamuraiGame"))
const RestaurantLanding = lazy(() => import("./components/projects/RestaurantLanding"))
const DSA = lazy(() => import("./components/projects/DSA"))
const IQAC = lazy(() => import("./components/projects/IQAC"))
const SurePrompt = lazy(() => import("./components/projects/SurePrompt"))
const HeatmapView = lazy(() => import("./components/projects/HeatmapView"))
const Checkstyle = lazy(() => import("./components/projects/Checkstyle"))
const Registrar = lazy(() => import("./components/projects/Registrar"))
const WeatherFlow = lazy(() => import("./components/projects/WeatherFlow"))

const routeLoadingFallback = <PageSkeleton />

const withSuspense = (element: ReactNode) => (
  <Suspense fallback={routeLoadingFallback}>{element}</Suspense>
)

const router = createBrowserRouter([
  {
    path:"/",
    element: withSuspense(<Main/>),
    errorElement: <ErrorPage />,
    children:[
      {
        index:true,
        element: withSuspense(<Body/>)
      },
      {
        path:"projects",
        element: withSuspense(<Projects/>),
        children:[
          { path:"portfolio", element: withSuspense(<Portfolio/>) },
          { path:"samurai-game", element: withSuspense(<SamuraiGame/>) },
          { path:"restaurant-landing", element: withSuspense(<RestaurantLanding/>) },
          { path:"dsa", element: withSuspense(<DSA/>) },
          { path:"iqac", element: withSuspense(<IQAC/>) },
          { path:"sure-prompt", element: withSuspense(<SurePrompt />) },
          { path:"heatmap-view", element: withSuspense(<HeatmapView />) },
          { path:"checkstyle", element: withSuspense(<Checkstyle />) },
          { path:"registrar", element: withSuspense(<Registrar />) },
          { path:"weather-flow", element: withSuspense(<WeatherFlow />) },
        ]
      },
      {
        path:"resume",
        element: withSuspense(<Resume/>)
      },
      {
        path:"contact",
        element: withSuspense(<Contact/>)
      },
      {
        path: "*",
        element: <ErrorPage />
      }
    ]
  },
])


const App = () => {
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        document.title = "Come back soon! | Sure Surya"
      } else {
        document.title = "Sure Surya | Java Developer Portfolio"
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [])

  const handleLoadingComplete = useCallback(() => {
    setShowLoading(false);
  }, []);

  return (
   <>
    <Toaster position="top-right" richColors />
    {showLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
    <RouterProvider router={router} />
   </>
  )
}

export default App