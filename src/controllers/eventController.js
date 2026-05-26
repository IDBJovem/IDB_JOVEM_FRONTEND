import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  updateEventSchedule,
} from "../models/eventModel";

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
