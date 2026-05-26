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
