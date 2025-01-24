import { createBrowserRouter, RouterProvider } from "react-router-dom"
import GamePage from "./components/GamePage"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"

function App() {

  const appRouter = createBrowserRouter(
    [
      {
        path: '/',
        element: <GamePage />
      },
      {
        path: '/signin',
        element: <SignIn />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
    ]
  )
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
