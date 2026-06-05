import { api } from "./api";

/* Imagem padrão usada enquanto a API não fornece imagem de evento */
const DEFAULT_EVENT_IMAGE = "/images/galeria/idb-jovem-one.jpg";

/* ------------------------------------------------------------------ */
/* Helpers de formatação                                              */
/* ------------------------------------------------------------------ */

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* Slug com o id embutido → permite extrair o id de volta na rota :slug */
function makeSlug(id, nome) {
  return `${id}-${slugify(nome)}`;
}

/* Extrai o id numérico de um slug (`12-encontro-...`) ou de um id puro */
export function parseEventId(slugOrId) {
  const match = String(slugOrId ?? "").match(/^\d+/);
  return match ? Number(match[0]) : null;
}

export function formatDate(isoDate) {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function extractDayMonth(isoDate) {
  if (!isoDate) return { day: "--", month: "---" };
  const d = new Date(isoDate);
  const day = d.getDate().toString().padStart(2, "0");
  const month = d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
  return { day, month: month.charAt(0).toUpperCase() + month.slice(1) };
}

function formatTime(isoDate) {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function formatTimeRange(start, end) {
  const s = formatTime(start);
  const e = formatTime(end);
  if (s && e) return `${s} - ${e}`;
  return s || e || "";
}

/* ISO → valor de <input type="datetime-local"> (YYYY-MM-DDTHH:MM, hora local) */
export function toInputDateTime(isoDate) {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

export function isFutureEvent(isoDate) {
  if (!isoDate) return false;
  const eventDate = new Date(isoDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate >= today;
}

/* ------------------------------------------------------------------ */
/* Adapters API <-> front                                             */
/* ------------------------------------------------------------------ */

/* API (português) → front (inglês) */
function adaptEvent(apiEvent) {
  if (!apiEvent) return null;
  return {
    id: apiEvent.evento_id,
    title: apiEvent.nome,
    slug: makeSlug(apiEvent.evento_id, apiEvent.nome),
    description: apiEvent.descricao || "",
    date: apiEvent.data_inicio,
    endDate: apiEvent.data_fim,
    time: formatTimeRange(apiEvent.data_inicio, apiEvent.data_fim),
    location: apiEvent.nome_local || "",
    latitude: apiEvent.local_latitude,
    longitude: apiEvent.local_longitude,
    linkGaleria: apiEvent.link_galeria || "",
    linkFormularioVoluntarios: apiEvent.formulario_link || "",
    calendarioEventoId: apiEvent.calendario_evento_id || null,
    /* Campos ainda não fornecidos pela API de evento → defaults seguros */
    image: DEFAULT_EVENT_IMAGE,
    category: "Evento",
    featured: false,
    totalParticipantes: 0,
    totalVoluntarios: 0,
    speakers: [],
    schedule: [],
    galeria: [],
    palestrantes: "",
    bandas: "",
  };
}

/* front (formulário) → API (corpo do POST/PUT) */
function toApiEvent(form) {
  const toIso = (v) => (v ? `${v}:00`.slice(0, 19) : null);
  return {
    nome: form.title,
    descricao: form.description || null,
    local_latitude: Number(form.latitude),
    local_longitude: Number(form.longitude),
    data_inicio: toIso(form.date),
    data_fim: toIso(form.endDate),
    link_galeria: form.linkGaleria || null,
    formulario_link: form.linkFormularioVoluntarios || null,
  };
}

/* Atividade API → "schedule" do front (suporta as telas pública e admin) */
function adaptActivity(apiAct) {
  const { day, month } = extractDayMonth(apiAct.horario_inicio);
  return {
    id: apiAct.atividade_id,
    eventId: apiAct.evento_id,
    name: apiAct.nome,
    activity: apiAct.nome,
    description: apiAct.descricao || "",
    start: apiAct.horario_inicio,
    end: apiAct.horario_termino,
    time: formatTime(apiAct.horario_inicio),
    startTime: formatTime(apiAct.horario_inicio),
    endTime: formatTime(apiAct.horario_termino),
    day,
    month,
  };
}

/* schedule do front → corpo da atividade. `eventDate` = data base (ISO) */
function toApiActivity(form, eventDate) {
  const dia = (eventDate ? String(eventDate) : new Date().toISOString()).slice(0, 10);
  const combinar = (hora) => (hora ? `${dia}T${hora}:00` : null);
  return {
    nome: form.name,
    descricao: form.description || null,
    horario_inicio: combinar(form.start || form.time),
    horario_termino: combinar(form.end || form.start || form.time),
  };
}

/* Mensagem de erro amigável vinda do back ou do axios */
function getErrorMessage(error, fallback) {
  return error?.response?.data?.detail || error?.message || fallback;
}

/* ------------------------------------------------------------------ */
/* Eventos                                                            */
/* ------------------------------------------------------------------ */

export async function fetchAllEvents() {
  const { data } = await api.get("/evento/");
  return data.map(adaptEvent);
}

export async function searchEvents(termo) {
  const { data } = await api.get("/evento/buscar", { params: { termo } });
  return data.map(adaptEvent);
}

export async function fetchEventById(slugOrId) {
  const id = parseEventId(slugOrId);
  if (!id) return null;
  const { data } = await api.get(`/evento/${id}`);
  return adaptEvent(data);
}

export async function getGroupedEvents() {
  const all = await fetchAllEvents();
  const proximos = all.filter((e) => isFutureEvent(e.date));
  const anteriores = all.filter((e) => !isFutureEvent(e.date));
  return { proximos, anteriores };
}

export async function handleCreateEvent(data) {
  if (!data.title || !data.title.trim()) {
    return { success: false, error: "Nome do evento é obrigatório." };
  }
  if (!data.date || !data.endDate) {
    return { success: false, error: "Datas de início e término são obrigatórias." };
  }
  if (data.latitude === "" || data.longitude === "" || data.latitude == null || data.longitude == null) {
    return { success: false, error: "Latitude e longitude são obrigatórias." };
  }
  try {
    const { data: created } = await api.post("/evento/", toApiEvent(data));
    return { success: true, event: adaptEvent(created) };
  } catch (error) {
    return { success: false, error: getErrorMessage(error, "Erro ao criar evento.") };
  }
}

export async function handleUpdateEvent(slugOrId, data) {
  if (!data.title || !data.title.trim()) {
    return { success: false, error: "Nome do evento é obrigatório." };
  }
  const id = parseEventId(slugOrId);
  try {
    const { data: updated } = await api.put(`/evento/${id}`, toApiEvent(data));
    return { success: true, event: adaptEvent(updated) };
  } catch (error) {
    return { success: false, error: getErrorMessage(error, "Erro ao atualizar evento.") };
  }
}

export async function handleDeleteEvent(slugOrId) {
  const id = parseEventId(slugOrId);
  try {
    await api.delete(`/evento/${id}`);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: getErrorMessage(error, "Erro ao excluir evento.") };
  }
}

/* ------------------------------------------------------------------ */
/* Atividades (programação / schedule)                                */
/* ------------------------------------------------------------------ */

export async function fetchActivities(eventId) {
  const id = parseEventId(eventId);
  const { data } = await api.get(`/evento/${id}/atividade`);
  return data.map(adaptActivity);
}

export async function handleCreateActivity(eventId, data, eventDate) {
  const id = parseEventId(eventId);
  if (!data.name || !data.name.trim()) {
    return { success: false, error: "Nome da atividade é obrigatório." };
  }
  try {
    const { data: created } = await api.post(
      `/evento/${id}/atividade`,
      toApiActivity(data, eventDate)
    );
    return { success: true, data: adaptActivity(created) };
  } catch (error) {
    return { success: false, error: getErrorMessage(error, "Erro ao criar atividade.") };
  }
}

export async function handleUpdateActivity(activityId, data, eventDate) {
  try {
    const { data: updated } = await api.put(
      `/evento/atividade/${activityId}`,
      toApiActivity(data, eventDate)
    );
    return { success: true, data: adaptActivity(updated) };
  } catch (error) {
    return { success: false, error: getErrorMessage(error, "Erro ao atualizar atividade.") };
  }
}

export async function handleDeleteActivity(activityId) {
  try {
    await api.delete(`/evento/atividade/${activityId}`);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: getErrorMessage(error, "Erro ao excluir atividade.") };
  }
}
