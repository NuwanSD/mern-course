import { Navigate, createBrowserRouter } from "react-router-dom";

import App from "../layout/App";
import Users from "../../features/user/pages/Users";
import NewPlaces from "../../features/places/pages/NewPlaces";
import UserPlaces from "../../features/places/pages/UserPlaces";
import UpdatePlace from "../../features/places/pages/UpdatePlace";
import Auth from "../../features/user/pages/Auth";
import RequireAuth from "./RequireAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "/places/new", element: <NewPlaces /> },
          { path: "/places/:place_id", element: <UpdatePlace /> },
        ],
      },
      { path: "/", element: <Users /> },
      { path: "/:user_id/places", element: <UserPlaces /> },
      { path: "/auth", element: <Auth /> },
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
