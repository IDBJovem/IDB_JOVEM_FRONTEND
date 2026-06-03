import { mockEvents } from "../data/mockEvents";

const STORAGE_KEY = "idb_admin_events";

function loadEvents() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
  }
  return [...mockEvents];
}

function saveEvents(events) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export function getAllEvents() {
  return loadEvents();
}

export function getEventById(id) {
  const events = loadEvents();
  return events.find((e) => e.id === Number(id)) || null;
}

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

export function updateEvent(id, updates) {
  const events = loadEvents();
  const index = events.findIndex((e) => e.id === Number(id));
  if (index === -1) return null;

  events[index] = { ...events[index], ...updates };
  saveEvents(events);
  return events[index];
}

export function deleteEvent(id) {
  const events = loadEvents();
  const filtered = events.filter((e) => e.id !== Number(id));
  if (filtered.length === events.length) return false;
  saveEvents(filtered);
  return true;
}

export function updateEventSchedule(eventId, schedule) {
  return updateEvent(eventId, { schedule });
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
  const day = d.getDate().toString();
  const month = d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
  return { day, month: month.charAt(0).toUpperCase() + month.slice(1) };
}

export function toInputDate(isoDate) {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  return d.toISOString().split("T")[0];
}

export function isFutureEvent(isoDate) {
  if (!isoDate) return false;
  const eventDate = new Date(isoDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate >= today;
}


export function getGroupedEvents() {
  const all = getAllEvents();
  const proximos = all.filter((e) => isFutureEvent(e.date));
  const anteriores = all.filter((e) => !isFutureEvent(e.date));
  return { proximos, anteriores };
}

export function fetchAllEvents() {
  return getAllEvents();
}

export function fetchEventById(id) {
  return getEventById(id);
}

export function handleCreateEvent(data) {
  if (!data.title || !data.title.trim()) {
    return { success: false, error: "Nome do evento é obrigatório." };
  }
  if (!data.date) {
    return { success: false, error: "Data é obrigatória." };
  }
  if (!data.location || !data.location.trim()) {
    return { success: false, error: "Local é obrigatório." };
  }

  const event = createEvent({
    ...data,
    date: new Date(data.date).toISOString(),
    endDate: data.endDate ? new Date(data.endDate).toISOString() : new Date(data.date).toISOString(),
  });

  return { success: true, event };
}

export function handleUpdateEvent(id, data) {
  if (!data.title || !data.title.trim()) {
    return { success: false, error: "Nome do evento é obrigatório." };
  }

  const updated = updateEvent(id, {
    ...data,
    date: data.date ? new Date(data.date).toISOString() : undefined,
    endDate: data.endDate ? new Date(data.endDate).toISOString() : undefined,
  });

  if (!updated) {
    return { success: false, error: "Evento não encontrado." };
  }

  return { success: true, event: updated };
}

export function handleDeleteEvent(id) {
  const deleted = deleteEvent(id);
  return { success: deleted, error: deleted ? null : "Evento não encontrado." };
}

export function handleUpdateSchedule(eventId, schedule) {
  const updated = updateEventSchedule(eventId, schedule);
  if (!updated) {
    return { success: false, error: "Evento não encontrado." };
  }
  return { success: true, event: updated };
}
