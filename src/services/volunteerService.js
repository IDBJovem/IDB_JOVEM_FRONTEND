import { mockVolunteers } from "../data/mockVolunteers";

const STORAGE_KEY = "idb_admin_volunteers";

function loadVolunteers() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
  }
  return [...mockVolunteers];
}

function saveVolunteers(volunteers) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(volunteers));
}


export function getAllVolunteers() {
  return loadVolunteers();
}

export function getVolunteersByEventId(eventId) {
  const volunteers = loadVolunteers();
  return volunteers.filter((v) => v.eventId === Number(eventId));
}

export function getVolunteerById(id) {
  const volunteers = loadVolunteers();
  return volunteers.find((v) => v.id === Number(id)) || null;
}

export function updateVolunteerStatus(id, status) {
  const volunteers = loadVolunteers();
  const index = volunteers.findIndex((v) => v.id === Number(id));
  if (index === -1) return null;

  volunteers[index] = { ...volunteers[index], status };
  saveVolunteers(volunteers);
  return volunteers[index];
}

export function fetchVolunteersByEvent(eventId) {
  return getVolunteersByEventId(eventId);
}

export function handleUpdateStatus(id, status) {
  const validStatuses = ["pendente", "aprovado", "reprovado"];

  if (!validStatuses.includes(status)) {
    return { success: false, error: "Status inválido." };
  }

  const updated = updateVolunteerStatus(id, status);
  if (!updated) {
    return { success: false, error: "Voluntário não encontrado." };
  }

  return { success: true, volunteer: updated };
}

export function getVolunteerStats(eventId) {
  const volunteers = getVolunteersByEventId(eventId);
  const total = volunteers.length;
  const aprovados = volunteers.filter((v) => v.status === "aprovado").length;
  const pendentes = volunteers.filter((v) => v.status === "pendente").length;
  const reprovados = volunteers.filter((v) => v.status === "reprovado").length;

  return { total, aprovados, pendentes, reprovados };
}
