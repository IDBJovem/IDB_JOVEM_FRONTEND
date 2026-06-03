import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { getGroupedEvents, handleDeleteEvent } from "../../../services/eventService";
import useModal from "../../../hooks/useModal";
import SectionTitle from "../../../components/ui/SectionTitle";
import EmptyState from "../../../components/ui/EmptyState";
import { UpcomingEventRow, PastEventRow } from "./components/EventRow";
import DeleteEventModal from "./components/DeleteEventModal";

/* Página principal: Listagem de Eventos */
export default function AdminEventos() {
  const navigate = useNavigate();
  const deleteModal = useModal();
  const [events, setEvents] = useState({ proximos: [], anteriores: [] });

  const loadEvents = () => {
    const grouped = getGroupedEvents();
    setEvents(grouped);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/eventos/${id}/editar`);
  };

  const handleConfirmDelete = () => {
    if (deleteModal.data) {
      handleDeleteEvent(deleteModal.data.id);
      deleteModal.close();
      loadEvents();
    }
  };

  const rightContent = (
    <Link
      to="/admin/eventos/criar"
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors shadow-sm"
    >
      Adicionar Evento
      <Plus size={18} />
    </Link>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <SectionTitle title="Eventos" rightContent={rightContent} />

      {/* Próximos Eventos */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-[#1E1E1E] text-lg mb-1">Próximos Eventos</h2>
        <hr className="border-gray-200 mb-3" />

        {events.proximos.length > 0 ? (
          <div>
            {events.proximos.map((event) => (
              <UpcomingEventRow
                key={event.id}
                event={event}
                onEdit={handleEdit}
                onDelete={(ev) => deleteModal.open(ev)}
              />
            ))}
          </div>
        ) : (
          <EmptyState message="Nenhum evento próximo cadastrado." className="border-none shadow-none p-6" />
        )}
      </div>

      {/* Eventos Anteriores */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-[#1E1E1E] text-lg mb-1">Eventos Anteriores</h2>
        <hr className="border-gray-200 mb-3" />

        {events.anteriores.length > 0 ? (
          <div>
            {events.anteriores.map((event) => (
              <PastEventRow key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <EmptyState message="Nenhum evento anterior encontrado." className="border-none shadow-none p-6" />
        )}
      </div>

      {/* Modal de exclusão */}
      <DeleteEventModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={handleConfirmDelete}
        eventTitle={deleteModal.data?.title}
      />
    </div>
  );
}
