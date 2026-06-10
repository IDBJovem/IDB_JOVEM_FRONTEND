import { api } from "./api";

/* ------------------------------------------------------------------ */
/* Adapters API <-> front                                             */
/* ------------------------------------------------------------------ */

/* API → front */
function adaptAdmin(apiAdmin) {
  if (!apiAdmin) return null;
  return {
    id: apiAdmin.admin_id,
    nome: apiAdmin.nome,
    email: apiAdmin.email,
    keycloakId: apiAdmin.keycloak_id,
  };
}

/* front (formulário) → API */
function toApiAdmin(form) {
  return {
    nome: form.nome,
    email: form.email,
    keycloak_id: form.keycloakId ?? form.keycloak_id,
  };
}

function getErrorMessage(error, fallback) {
  return error?.response?.data?.detail || error?.message || fallback;
}

/* ------------------------------------------------------------------ */
/* Admin (rotas protegidas — exigem JWT Keycloak)                     */
/* ------------------------------------------------------------------ */

export async function fetchAdmins() {
  const { data } = await api.get("/admin/");
  return data.map(adaptAdmin);
}

export async function fetchAdminById(adminId) {
  const { data } = await api.get(`/admin/${adminId}`);
  return adaptAdmin(data);
}

export async function handleCreateAdmin(form) {
  if (!form.nome?.trim() || !form.email?.trim() || !(form.keycloakId || form.keycloak_id)) {
    return { success: false, error: "Nome, e-mail e Keycloak ID são obrigatórios." };
  }
  try {
    const { data } = await api.post("/admin/", toApiAdmin(form));
    return { success: true, admin: adaptAdmin(data) };
  } catch (error) {
    return { success: false, error: getErrorMessage(error, "Erro ao criar administrador.") };
  }
}

export async function handleDeleteAdmin(adminId) {
  try {
    await api.delete(`/admin/${adminId}`);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: getErrorMessage(error, "Erro ao excluir administrador.") };
  }
}
