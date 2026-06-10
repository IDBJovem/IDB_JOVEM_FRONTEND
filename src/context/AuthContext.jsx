import { createContext, useContext, useState } from "react";
import axios from "axios";
import { TOKEN_KEY } from "../services/api";

const AuthContext = createContext(null);

const KEYCLOAK_URL = import.meta.env.VITE_KEYCLOAK_URL;
const REALM = import.meta.env.VITE_KEYCLOAK_REALM;
const CLIENT_ID = import.meta.env.VITE_KEYCLOAK_CLIENT_ID;

/* Papéis (realm roles do Keycloak) que dão acesso à área administrativa */
const ADMIN_ROLES = ["admin", "superadmin"];

/* Decodifica o payload de um JWT sem dependência externa */
function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/* Monta o usuário a partir das claims do JWT; retorna null se expirado/inválido */
function userFromToken(token) {
  const claims = decodeToken(token);
  if (!claims) return null;
  if (claims.exp && claims.exp * 1000 <= Date.now()) return null;
  const roles = claims.realm_access?.roles || [];
  return {
    nome: claims.name || claims.preferred_username || "",
    email: claims.email || "",
    roles,
    isAdmin: roles.some((r) => ADMIN_ROLES.includes(r)),
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    const u = userFromToken(token);
    if (!u) localStorage.removeItem(TOKEN_KEY);
    return u;
  });

  /* Login via Keycloak (Resource Owner Password Credentials) */
  const login = async (usuario, senha) => {
    try {
      const body = new URLSearchParams({
        username: usuario,
        password: senha,
        client_id: CLIENT_ID,
        grant_type: "password",
      });
      const { data } = await axios.post(
        `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`,
        body,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      const token = data.access_token;
      const u = userFromToken(token);
      if (!u) {
        return { success: false, error: "Não foi possível validar a sessão." };
      }
      if (!u.isAdmin) {
        return { success: false, error: "Usuário sem permissão de administrador." };
      }

      localStorage.setItem(TOKEN_KEY, token);
      setUser(u);
      return { success: true };
    } catch (error) {
      const desc = error?.response?.data?.error_description;
      const msg =
        desc === "Invalid user credentials"
          ? "Usuário ou senha inválidos"
          : desc || "Erro ao fazer login. Tente novamente.";
      return { success: false, error: msg };
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = !!user?.isAdmin;

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
