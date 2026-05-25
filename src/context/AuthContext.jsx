import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const ADMIN_USER = "idbjovem";
const ADMIN_PASS = "idbjovem";
const STORAGE_KEY = "idb_auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (usuario, senha) => {
    if (usuario === ADMIN_USER && senha === ADMIN_PASS) {
      const userData = { usuario, role: "admin" };
      setUser(userData);
      return { success: true };
    }
    return { success: false, error: "Usuário ou senha inválidos" };
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
