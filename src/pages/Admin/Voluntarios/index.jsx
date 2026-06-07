import { useState, useEffect } from "react";
import { fetchAllEvents } from "../../../services/eventService";
import SectionTitle from "../../../components/ui/SectionTitle";
import EmptyState from "../../../components/ui/EmptyState";
import { VolunteerEventCard } from "../../../components/card/VolunteerCard";

export default function AdminVoluntarios() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const all = fetchAllEvents();
    setEvents(all);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <SectionTitle title="Voluntários" />

      {/* Grid de eventos */}
      {events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {events.map((event) => (
            <VolunteerEventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <EmptyState message="Nenhum evento cadastrado." />
      )}
    </div>
  );
}
