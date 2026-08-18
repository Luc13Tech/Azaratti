import { createContext, useContext, useState } from "react";
import client from "../api/client";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("azaratti_admin_token"));

  const login = async (password) => {
    const res = await client.post("/auth/login", { password });
    if (res.data.success) {
      localStorage.setItem("azaratti_admin_token", res.data.token);
      setToken(res.data.token);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("azaratti_admin_token");
    setToken(null);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin: !!token, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
