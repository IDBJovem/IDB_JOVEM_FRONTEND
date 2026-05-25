import {
  getVolunteersByEventId,
  updateVolunteerStatus,
} from "../models/volunteerModel";

/**
 * Busca voluntários de um evento.
 */
export function fetchVolunteersByEvent(eventId) {
  return getVolunteersByEventId(eventId);
}

/**
 * Atualiza o status de um voluntário com validação.
 */
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

/**
 * Retorna estatísticas de voluntários de um evento.
 */
export function getVolunteerStats(eventId) {
  const volunteers = getVolunteersByEventId(eventId);
  const total = volunteers.length;
  const aprovados = volunteers.filter((v) => v.status === "aprovado").length;
  const pendentes = volunteers.filter((v) => v.status === "pendente").length;
  const reprovados = volunteers.filter((v) => v.status === "reprovado").length;

  return { total, aprovados, pendentes, reprovados };
}
