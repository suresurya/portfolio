import Main from "./components/Main"
import Resume from "./components/Resume"
import Projects from "./components/Projects"
import { createBrowserRouter , RouterProvider } from "react-router"
import Body from "./components/Body"
import Contact from "./components/Contact"
import Portfolio from "./components/projects/Portfolio"
import SamuraiGame from "./components/projects/SamuraiGame"
import RestaurantLanding from "./components/projects/RestaurantLanding"
import DSA from "./components/projects/DSA"

const router = createBrowserRouter([
  {
    path:"/",
    element:<Main/>,
    children:[
      {
        index:true,
        element:<Body/>
      },
      {
        path:"projects",
        element:<Projects/>,
        children:[
          { path:"portfolio", element:<Portfolio/> },
          { path:"samurai-game", element:<SamuraiGame/> },
          { path:"restaurant-landing", element:<RestaurantLanding/> },
          { path:"dsa", element:<DSA/> },
        ]
      },
      {
        path:"resume",
        element:<Resume/>
      },
      {
        path:"contact",
        element:<Contact/>
      }
    ]
  },
])


const App = () => {

  return (
   
   < RouterProvider  router={router}/>
  )
}

export default App