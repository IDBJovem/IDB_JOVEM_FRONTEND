import { Link } from "react-router-dom";
import { MapPin, Pencil, Trash2 } from "lucide-react";
import { extractDayMonth } from "../../../../services/eventService";

/* Event Row para Próximos Eventos */
export function UpcomingEventRow({ event, onEdit, onDelete }) {
  const { day, month } = extractDayMonth(event.date);

  return (
    <div className="flex items-center gap-4 py-3.5 border-b border-gray-100 last:border-0 group hover:bg-gray-50/50 px-2 rounded-lg transition-colors">
      {/* Date badge */}
      <div className="flex flex-col items-center justify-center w-14 h-16 rounded-xl bg-[#FFD9B3] text-[#1E1E1E] font-bold shrink-0 shadow-sm">
        <span className="text-lg leading-tight">{day}</span>
        <span className="text-[10px] uppercase tracking-wider font-semibold">{month}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-[#1E1E1E] truncate">{event.title}</p>
        <span className="flex items-center gap-1 text-xs text-[#1E1E1E]/50 mt-0.5">
          <MapPin size={11} />
          {event.location}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => onEdit(event.id)}
          className="w-9 h-9 rounded-lg bg-green-50 hover:bg-green-100 flex items-center justify-center transition-colors group/btn"
          title="Editar"
        >
          <Pencil size={16} className="text-green-600 group-hover/btn:scale-110 transition-transform" />
        </button>
        <button
          onClick={() => onDelete(event)}
          className="w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors group/btn"
          title="Excluir"
        >
          <Trash2 size={16} className="text-red-500 group-hover/btn:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
}

/* Event Row para Eventos Anteriores */
export function PastEventRow({ event }) {
  const { day, month } = extractDayMonth(event.date);

  return (
    <div className="flex items-center gap-4 py-3.5 border-b border-gray-100 last:border-0 group hover:bg-gray-50/50 px-2 rounded-lg transition-colors">
      {/* Date badge */}
      <div className="flex flex-col items-center justify-center w-14 h-16 rounded-xl bg-[#FFD9B3]/70 text-[#1E1E1E] font-bold shrink-0 shadow-sm">
        <span className="text-lg leading-tight">{day}</span>
        <span className="text-[10px] uppercase tracking-wider font-semibold">{month}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-[#1E1E1E] truncate">{event.title}</p>
        <span className="flex items-center gap-1 text-xs text-[#1E1E1E]/50 mt-0.5">
          <MapPin size={11} />
          {event.location}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-1.5 shrink-0">
        <Link
          to={`/admin/eventos/${event.id}`}
          className="text-[11px] font-bold bg-[#FF6D2C] text-white px-4 py-1.5 rounded-md hover:bg-[#e65c18] transition-colors text-center"
        >
          Detalhes
        </Link>
        <Link
          to="/admin/voluntarios"
          className="text-[11px] font-bold bg-[#333] text-white px-4 py-1.5 rounded-md hover:bg-[#1a1a1a] transition-colors text-center"
        >
          Voluntários
        </Link>
      </div>
    </div>
  );
}
