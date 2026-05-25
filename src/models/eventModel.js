import { mockEvents } from "../data/mockEvents";

const STORAGE_KEY = "idb_admin_events";

/**
 * Carrega eventos do localStorage ou usa o mock como fallback.
 */
function loadEvents() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    /* fallback to mock */
  }
  return [...mockEvents];
}

/**
 * Persiste eventos no localStorage.
 */
function saveEvents(events) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

/**
 * Retorna todos os eventos.
 */
export function getAllEvents() {
  return loadEvents();
}

/**
 * Busca um evento pelo ID.
 */
export function getEventById(id) {
  const events = loadEvents();
  return events.find((e) => e.id === Number(id)) || null;
}

/**
 * Cria um novo evento.
 */
export function createEvent(eventData) {
  const events = loadEvents();
  const newId = events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1;

  const newEvent = {
    id: newId,
    slug: eventData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    totalParticipantes: 0,
    totalVoluntarios: 0,
    speakers: [],
    schedule: [],
    galeria: [],
    featured: false,
    category: "Encontro",
    image: "/images/galeria/idb-jovem-one.jpg",
    ...eventData,
  };

  events.unshift(newEvent);
  saveEvents(events);
  return newEvent;
}

/**
 * Atualiza um evento existente.
 */
export function updateEvent(id, updates) {
  const events = loadEvents();
  const index = events.findIndex((e) => e.id === Number(id));
  if (index === -1) return null;

  events[index] = { ...events[index], ...updates };
  saveEvents(events);
  return events[index];
}

/**
 * Remove um evento pelo ID.
 */
export function deleteEvent(id) {
  const events = loadEvents();
  const filtered = events.filter((e) => e.id !== Number(id));
  if (filtered.length === events.length) return false;
  saveEvents(filtered);
  return true;
}

/**
 * Atualiza a programação de um evento.
 */
export function updateEventSchedule(eventId, schedule) {
  return updateEvent(eventId, { schedule });
}
