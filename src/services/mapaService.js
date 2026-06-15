import { api } from "./api";

export async function fetchEndereco(latitude, longitude) {
  if (latitude == null || longitude == null) return null;
  try {
    const { data } = await api.get("/mapa/endereco", {
      params: { latitude, longitude },
    });
    return data?.nome_local || null;
  } catch {
    return null;
  }
}

export async function buscarLocais(termo) {
  const q = (termo || "").trim();
  if (q.length < 3) return [];
  try {
    const params = new URLSearchParams({
      q,
      format: "json",
      limit: "5",
      "accept-language": "pt-BR",
      addressdetails: "0",
    });
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?${params.toString()}`,
      { headers: { Accept: "application/json" } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data || []).map((item) => ({
      nome: item.display_name,
      latitude: Number(item.lat),
      longitude: Number(item.lon),
    }));
  } catch {
    return [];
  }
}
