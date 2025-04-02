import { Navigate, createBrowserRouter } from "react-router-dom";
import Users from "../../features/user/pages/Users";
import NewPlaces from "../../features/places/pages/NewPlaces";
import App from "../layout/App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Users /> },
      { path: "/places/new", element: <NewPlaces /> },
      {
        path: "not-found",
        element: <h1>Not Found</h1>,
      },
      {
        path: "*",
        element: <Navigate replace to="/not-found" />,
      },
    ],
  },
]);
