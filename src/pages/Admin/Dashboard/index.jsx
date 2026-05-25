import { Link } from "react-router-dom";
import { MapPin, ChevronRight, Eye, Users } from "lucide-react";

/* ── Mock Data ── */
const PROXIMOS_EVENTOS = [
  { id: 1, title: "Nome do evento", location: "Local", day: "10", month: "Jul" },
  { id: 2, title: "Nome do evento", location: "Local", day: "10", month: "Jul" },
  { id: 3, title: "Nome do evento", location: "Local", day: "10", month: "Jul" },
  { id: 4, title: "Nome do evento", location: "Local", day: "10", month: "Jul" },
];

const EVENTOS_ANTERIORES = [
  { id: 5, title: "Nome do evento", location: "Local", day: "10", month: "Jul" },
  { id: 6, title: "Nome do evento", location: "Local", day: "10", month: "Jul" },
  { id: 7, title: "Nome do evento", location: "Local", day: "10", month: "Jul" },
  { id: 8, title: "Nome do evento", location: "Local", day: "10", month: "Jul" },
];

const PRODUTOS = [
  { id: 1, name: "Nome do Item", image: "/images/galeria/idb-jovem-one.jpg" },
  { id: 2, name: "Nome do Item", image: "/images/galeria/idb-teen-camp.jpg" },
  { id: 3, name: "Nome do Item", image: "/images/galeria/es-ne-ajo.jpg" },
  { id: 4, name: "Nome do Item", image: "/images/galeria/idb-jovem-one.jpg" },
  { id: 5, name: "Nome do Item", image: "/images/galeria/idb-teen-camp.jpg" },
  { id: 6, name: "Nome do Item", image: "/images/galeria/es-ne-ajo.jpg" },
  { id: 7, name: "Nome do Item", image: "/images/galeria/idb-jovem-one.jpg" },
  { id: 8, name: "Nome do Item", image: "/images/galeria/idb-teen-camp.jpg" },
];

/* ── Days of week for calendar ── */
const WEEK_DAYS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

function generateCalendarDays() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - dayOfWeek);

  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    days.push({
      day: d.getDate(),
      isToday: d.toDateString() === today.toDateString(),
    });
  }
  return days;
}

/* ── Event Row Component ── */
function EventRow({ event, isPast = false }) {
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

/* ── Product Card ── */
function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-0.5">
      <div className="aspect-square bg-gray-50 flex items-center justify-center p-3 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-2.5">
        <p className="text-xs font-medium text-[#1E1E1E]/80 text-center truncate">{product.name}</p>
        <div className="mt-1.5 text-center">
          <button className="text-[9px] font-bold bg-[#FF6D2C] text-white px-3 py-1 rounded-md hover:bg-[#e65c18] transition-colors">
            Detalhes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Calendar Mini Component ── */
function CalendarMini() {
  const days = generateCalendarDays();
  const hours = Array.from({ length: 10 }, (_, i) => i + 8); // 8 AM to 5 PM

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">📅</span>
        <h3 className="font-bold text-[#1E1E1E] text-lg">Calendário</h3>
      </div>

      {/* Week header */}
      <div className="grid grid-cols-7 gap-1 mb-3">
        {WEEK_DAYS.map((day, i) => (
          <div key={day} className="text-center">
            <span className="text-[10px] font-semibold text-[#1E1E1E]/40 uppercase">{day}</span>
            <div
              className={`mt-1 w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                days[i].isToday
                  ? "bg-[#FF6D2C] text-white shadow-md"
                  : "text-[#1E1E1E]/70 hover:bg-gray-100"
              }`}
            >
              {days[i].day}
            </div>
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div className="border-t border-gray-100 pt-2 space-y-0">
        {hours.map((hour) => (
          <div key={hour} className="flex items-stretch min-h-[28px] border-b border-gray-50">
            <span className="text-[10px] text-[#1E1E1E]/30 w-10 shrink-0 pt-1">{hour}:00</span>
            <div className="flex-1 grid grid-cols-7 gap-0.5">
              {WEEK_DAYS.map((_, i) => {
                // Random colored block for visual effect
                const hasEvent = Math.random() > 0.65;
                const colors = [
                  "bg-blue-200/60",
                  "bg-green-200/60",
                  "bg-purple-200/60",
                  "bg-amber-200/60",
                  "bg-pink-200/60",
                ];
                const color = colors[Math.floor(Math.random() * colors.length)];
                return (
                  <div
                    key={i}
                    className={`rounded-sm ${hasEvent ? color : ""}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Dashboard ── */
export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page title */}
      <h1
        className="font-black text-[#1E1E1E]"
        style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
      >
        Dashboard
      </h1>

      {/* Events row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximos Eventos */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[#1E1E1E] text-lg">Próximos Eventos</h2>
            <Link
              to="/admin/eventos"
              className="text-xs font-semibold text-[#FF6D2C] hover:underline flex items-center gap-0.5"
            >
              Ver todos <ChevronRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {PROXIMOS_EVENTOS.map((event) => (
              <EventRow key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* Eventos Anteriores */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[#1E1E1E] text-lg">Eventos Anteriores</h2>
            <Link
              to="/admin/eventos"
              className="text-xs font-semibold text-[#FF6D2C] hover:underline flex items-center gap-0.5"
            >
              Ver todos <ChevronRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {EVENTOS_ANTERIORES.map((event) => (
              <EventRow key={event.id} event={event} isPast />
            ))}
          </div>
        </div>
      </div>

      {/* Calendar + Products row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendário */}
        <CalendarMini />

        {/* Produtos Cadastrados */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[#1E1E1E] text-lg">Produtos Cadastrados</h2>
            <Link
              to="/admin/produtos"
              className="text-xs font-semibold text-[#FF6D2C] hover:underline flex items-center gap-0.5"
            >
              Ver todos <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {PRODUTOS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
