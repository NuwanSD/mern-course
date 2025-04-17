import { useCallback, useState } from "react";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user_id, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        user_id: user_id,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
