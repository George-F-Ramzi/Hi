import LandingPage from "./pages/landingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login, { LoginAction } from "./components/login";
import Register, { RegisterAction } from "./components/register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
      children: [
        {
          path: "/login",
          element: <Login />,
          action: LoginAction,
        },
        {
          path: "/join",
          element: <Register />,
          action: RegisterAction,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
