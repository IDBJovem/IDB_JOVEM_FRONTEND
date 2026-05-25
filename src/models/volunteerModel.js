import { mockVolunteers } from "../data/mockVolunteers";

const STORAGE_KEY = "idb_admin_volunteers";

/**
 * Carrega voluntários do localStorage ou usa o mock como fallback.
 */
function loadVolunteers() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    /* fallback to mock */
  }
  return [...mockVolunteers];
}

/**
 * Persiste voluntários no localStorage.
 */
function saveVolunteers(volunteers) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(volunteers));
}

/**
 * Retorna todos os voluntários.
 */
export function getAllVolunteers() {
  return loadVolunteers();
}

/**
 * Retorna voluntários filtrados por eventId.
 */
export function getVolunteersByEventId(eventId) {
  const volunteers = loadVolunteers();
  return volunteers.filter((v) => v.eventId === Number(eventId));
}

/**
 * Busca um voluntário pelo ID.
 */
export function getVolunteerById(id) {
  const volunteers = loadVolunteers();
  return volunteers.find((v) => v.id === Number(id)) || null;
}

/**
 * Atualiza o status de um voluntário.
 */
export function updateVolunteerStatus(id, status) {
  const volunteers = loadVolunteers();
  const index = volunteers.findIndex((v) => v.id === Number(id));
  if (index === -1) return null;

  volunteers[index] = { ...volunteers[index], status };
  saveVolunteers(volunteers);
  return volunteers[index];
}
