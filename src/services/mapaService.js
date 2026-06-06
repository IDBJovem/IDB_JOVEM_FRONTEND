import { api } from "./api";

/* ------------------------------------------------------------------ */
/* Mapa — reverse geocoding (lat/long → endereço legível)             */
/* Endpoint público. Resposta: { nome_local: "<endereço>" }           */
/* ------------------------------------------------------------------ */

export async function fetchEndereco(latitude, longitude) {
  if (latitude == null || longitude == null) return null;
  try {
    const { data } = await api.get("/mapa/endereco", {
      params: { latitude, longitude },
    });
    return data?.nome_local || null;
  } catch {
    /* 400 (coordenadas inválidas) ou 404 (endereço não encontrado) → sem endereço */
    return null;
  }
}
