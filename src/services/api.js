import axios from "axios";

/* Chave única do token JWT (Keycloak) no localStorage.
   ⚠️ Coordenar: AuthContext grava/lê o token sob esta mesma chave. */
export const TOKEN_KEY = "idb_token";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

/* Interceptor de Authorization: injeta o Bearer JWT (Keycloak) em toda chamada */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* 401 → token expirado/inválido: limpa a sessão e, se estava na área admin,
   redireciona para o login. */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      if (window.location.pathname.startsWith("/admin")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
