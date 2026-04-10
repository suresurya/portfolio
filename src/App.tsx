import { Suspense, lazy, useState, type ReactNode } from "react"
import { createBrowserRouter , RouterProvider } from "react-router"
import ErrorPage from "./components/Error"
import LoadingScreen from "./components/LoadingScreen"

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

const routeLoadingFallback = (
  <div className="min-h-[40vh] grid place-items-center text-sm text-[color:var(--color-text-subtle)]">
    Loading page...
  </div>
)

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

  return (
   <>
    {showLoading && <LoadingScreen onComplete={() => setShowLoading(false)} />}
    <RouterProvider router={router} />
   </>
  )
}

export default App