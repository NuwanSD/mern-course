import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  user_id: null,
  token: null,
  login: () => {},
  logout: () => {},
});
