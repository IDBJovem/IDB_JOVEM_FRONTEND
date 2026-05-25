import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Users, CheckCircle, Clock, ExternalLink } from "lucide-react";
import { fetchEventById } from "../../../controllers/eventController";
import {
  fetchVolunteersByEvent,
  handleUpdateStatus,
  getVolunteerStats,
} from "../../../controllers/volunteerController";
import StatusBadge from "../components/StatusBadge";

/* ── Card de estatística ── */
function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col items-center gap-2 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-2">
        <Icon size={20} className={color} />
        <span className={`text-sm font-bold ${color}`}>{label}</span>
      </div>
      <span
        className={`font-black ${color}`}
        style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
      >
        {value}
      </span>
    </div>
  );
}

/* ── Página: Detalhes de Voluntários de um Evento ── */
export default function AdminVoluntarioDetails() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [volunteers, setVolunteers] = useState([]);
  const [stats, setStats] = useState({ total: 0, aprovados: 0, pendentes: 0, reprovados: 0 });
  const [event, setEvent] = useState(null);

  const loadData = useCallback(() => {
    const ev = fetchEventById(eventId);
    setEvent(ev);
    const vols = fetchVolunteersByEvent(eventId);
    setVolunteers(vols);
    const s = getVolunteerStats(eventId);
    setStats(s);
  }, [eventId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onStatusChange = (volunteerId, newStatus) => {
    const result = handleUpdateStatus(volunteerId, newStatus);
    if (result.success) {
      loadData();
    }
  };

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <p className="text-lg font-semibold text-[#1E1E1E]/60 mb-4">Evento não encontrado.</p>
        <button
          onClick={() => navigate("/admin/voluntarios")}
          className="text-sm font-bold text-[#FF6D2C] hover:underline"
        >
          Voltar para Voluntários
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1
          className="font-black text-[#1E1E1E]"
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)" }}
        >
          Voluntários
        </h1>
        <button
          onClick={() => navigate("/admin/voluntarios")}
          className="w-10 h-10 rounded-full bg-[#FF6D2C] hover:bg-[#e65c18] flex items-center justify-center transition-colors shadow-md"
          title="Voltar"
        >
          <ChevronLeft size={22} className="text-white" />
        </button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={Users}
          label="Total de Inscritos"
          value={stats.total}
          color="text-[#FF6D2C]"
        />
        <StatCard
          icon={CheckCircle}
          label="Aprovados"
          value={stats.aprovados}
          color="text-[#22C55E]"
        />
        <StatCard
          icon={Clock}
          label="Pendentes"
          value={stats.pendentes}
          color="text-[#F5C518]"
        />
      </div>

      {/* Tabela de Voluntários */}
      <div className="bg-[#FF6D2C] rounded-2xl shadow-sm overflow-hidden">
        {/* Cabeçalho da tabela */}
        <div className="grid grid-cols-[1fr_1fr_140px_130px] px-6 py-4">
          <span className="text-white font-bold text-sm italic">Nome</span>
          <span className="text-white font-bold text-sm italic">Email</span>
          <span className="text-white font-bold text-sm italic">Status</span>
          <span className="text-white font-bold text-sm italic">Formulário</span>
        </div>

        {/* Linhas */}
        <div className="bg-white rounded-b-2xl">
          {volunteers.length > 0 ? (
            volunteers.map((vol, index) => (
              <div
                key={vol.id}
                className={`grid grid-cols-[1fr_1fr_140px_130px] px-6 py-4 items-center transition-colors hover:bg-gray-50/70 ${
                  index < volunteers.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <span className="text-sm text-[#1E1E1E] font-medium truncate pr-3">
                  {vol.name}
                </span>
                <span className="text-sm text-[#1E1E1E]/70 truncate pr-3">
                  {vol.email}
                </span>
                <div>
                  <StatusBadge
                    status={vol.status}
                    onChange={(newStatus) => onStatusChange(vol.id, newStatus)}
                  />
                </div>
                <div>
                  <a
                    href={event.linkFormularioVoluntarios || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold border-2 border-[#FF6D2C] text-[#FF6D2C] px-3 py-1.5 rounded-md hover:bg-[#FF6D2C] hover:text-white transition-colors"
                  >
                    <ExternalLink size={12} />
                    Abrir Formulário
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-10 text-center">
              <p className="text-sm text-[#1E1E1E]/40">
                Nenhum voluntário inscrito neste evento.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
