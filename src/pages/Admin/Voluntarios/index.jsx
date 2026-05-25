import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";
import { fetchAllEvents, formatDate } from "../../../controllers/eventController";

/* ── Card de Evento ── */
function EventCard({ event }) {
  const dateObj = event.date ? new Date(event.date) : null;
  const day = dateObj ? dateObj.getDate().toString().padStart(2, "0") : "--";
  const month = dateObj
    ? dateObj.toLocaleDateString("pt-BR", { month: "2-digit" })
    : "--";
  const time = dateObj
    ? dateObj.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    : "--:--";

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      {/* Imagem */}
      <div className="aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={event.image || "/images/galeria/idb-jovem-one.jpg"}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Conteúdo */}
      <div className="p-4 space-y-2.5">
        <h3 className="font-bold text-[#FF6D2C] text-base truncate">
          {event.title}
        </h3>

        <div className="flex items-center gap-4 text-xs text-[#1E1E1E]/50">
          <span className="flex items-center gap-1">
            <MapPin size={13} />
            {event.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} />
            {day}/{month} - {time}
          </span>
        </div>

        <Link
          to={`/admin/voluntarios/${event.id}`}
          className="inline-block mt-1 text-xs font-bold bg-[#FF6D2C] text-white px-4 py-2 rounded-md hover:bg-[#e65c18] transition-colors shadow-sm"
        >
          Voluntários Inscritos
        </Link>
      </div>
    </div>
  );
}

/* ── Página: Listagem de Eventos com Voluntários ── */
export default function AdminVoluntarios() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const all = fetchAllEvents();
    setEvents(all);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <h1
        className="font-black text-[#1E1E1E]"
        style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
      >
        Voluntários
      </h1>

      {/* Grid de eventos */}
      {events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <p className="text-sm text-[#1E1E1E]/40">
            Nenhum evento cadastrado.
          </p>
        </div>
      )}
    </div>
  );
}
