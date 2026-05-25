import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

/* Event Row para o Dashboard */
export default function DashboardEventRow({ event, isPast = false }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0 group hover:bg-gray-50/50 px-2 rounded-lg transition-colors">
      {/* Date badge */}
      <div className={`flex flex-col items-center justify-center w-12 h-14 rounded-xl text-white font-bold shrink-0 ${isPast ? "bg-[#FF6D2C]/70" : "bg-[#FF6D2C]"}`}>
        <span className="text-lg leading-tight">{event.day}</span>
        <span className="text-[10px] uppercase tracking-wider">{event.month}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-[#1E1E1E] truncate">{event.title}</p>
        <span className="flex items-center gap-1 text-xs text-[#1E1E1E]/50">
          <MapPin size={11} />
          {event.location}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-1.5 shrink-0">
        <Link
          to={`/admin/eventos`}
          className="text-[10px] font-bold bg-[#FF6D2C] text-white px-3 py-1 rounded-md hover:bg-[#e65c18] transition-colors text-center"
        >
          Detalhes
        </Link>
        <Link
          to={`/admin/voluntarios`}
          className="text-[10px] font-bold border border-[#1E1E1E]/20 text-[#1E1E1E]/70 px-3 py-1 rounded-md hover:border-[#FF6D2C] hover:text-[#FF6D2C] transition-colors text-center"
        >
          {isPast ? "Voluntários" : "Gerenciar Voluntários"}
        </Link>
      </div>
    </div>
  );
}
