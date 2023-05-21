import React from "react";
import SignUp from "./screens/SignUp/Signup";
import SignIn from "./screens/SignIn/SignIn";
//import Link from "@mui/material/Link";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./screens/Home/Home";
import ProjectDetails from "./screens/ProjectDetails/ProjectDetails";
const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn/>,
  },
  {
    path: "/sign-up",
    element: <SignUp/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/details/:name",
    element: <ProjectDetails/>,
  },
])
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
