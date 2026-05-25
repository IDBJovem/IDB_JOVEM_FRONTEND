import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Pencil, Trash2, PlusCircle } from "lucide-react";
import { fetchEventById, handleUpdateSchedule } from "../../../controllers/eventController";
import useModal from "../../../hooks/useModal";
import DeleteActivityModal from "./components/DeleteActivityModal";

/* ── Linha de atividade ── */
function ActivityRow({ item, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0 group hover:bg-gray-50/50 px-2 rounded-lg transition-colors">
      {/* Nome */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#1E1E1E] truncate">{item.name}</p>
      </div>

      {/* Descrição */}
      <div className="flex-1 min-w-0 hidden sm:block">
        <p className="text-sm text-[#1E1E1E]/60 truncate">{item.description || "Descrição da atividade"}</p>
      </div>

      {/* Horário */}
      <div className="shrink-0">
        <span className="text-sm font-semibold text-[#1E1E1E]">{item.time || "--:--"}</span>
      </div>

      {/* Ações */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => onEdit(item)}
          className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors"
          title="Editar atividade"
        >
          <Pencil size={15} className="text-blue-600" />
        </button>
        <button
          onClick={() => onDelete(item)}
          className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
          title="Excluir atividade"
        >
          <Trash2 size={15} className="text-red-500" />
        </button>
      </div>
    </div>
  );
}

/* ── Formulário inline de atividade ── */
function ActivityInlineForm({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    time: initialData?.time || "",
    description: initialData?.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      alert("Nome da atividade é obrigatório.");
      return;
    }
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-4 mt-3 border border-gray-200 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nome da atividade"
          className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm text-[#1E1E1E] placeholder-[#1E1E1E]/40 focus:border-[#FF6D2C] focus:ring-2 focus:ring-[#FF6D2C]/20 transition-all"
          required
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descrição da atividade"
          className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm text-[#1E1E1E] placeholder-[#1E1E1E]/40 focus:border-[#FF6D2C] focus:ring-2 focus:ring-[#FF6D2C]/20 transition-all"
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm text-[#1E1E1E] focus:border-[#FF6D2C] focus:ring-2 focus:ring-[#FF6D2C]/20 transition-all"
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-red-500 hover:bg-red-600 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-green-600 hover:bg-green-700 transition-colors"
        >
          Confirmar
        </button>
      </div>
    </form>
  );
}

/* ── Página: Programação do Evento ── */
export default function AdminEventoEditSchedule() {
  const navigate = useNavigate();
  const { id } = useParams();
  const deleteModal = useModal();

  const event = fetchEventById(id);

  const [schedule, setSchedule] = useState(event?.schedule || []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <p className="text-lg font-semibold text-[#1E1E1E]/60 mb-4">Evento não encontrado.</p>
        <button
          onClick={() => navigate("/admin/eventos")}
          className="text-sm font-bold text-[#FF6D2C] hover:underline"
        >
          Voltar para Eventos
        </button>
      </div>
    );
  }

  const handleBack = () => {
    navigate(`/admin/eventos/${id}/editar`);
  };

  /* Adicionar nova atividade */
  const handleAddActivity = (data) => {
    const newItem = {
      id: Date.now(),
      ...data,
    };
    setSchedule((prev) => [...prev, newItem]);
    setShowAddForm(false);
  };

  /* Editar atividade */
  const handleEditActivity = (data) => {
    setSchedule((prev) =>
      prev.map((item) =>
        item.id === editingItem.id ? { ...item, ...data } : item
      )
    );
    setEditingItem(null);
  };

  /* Excluir atividade */
  const handleConfirmDelete = () => {
    if (deleteModal.data) {
      setSchedule((prev) => prev.filter((item) => item.id !== deleteModal.data.id));
      deleteModal.close();
    }
  };

  /* Salvar programação inteira */
  const handleSaveSchedule = () => {
    const result = handleUpdateSchedule(id, schedule);
    if (result.success) {
      navigate(`/admin/eventos/${id}/editar`);
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1
          className="font-black text-[#1E1E1E]"
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)" }}
        >
          Programação do Evento
        </h1>
        <button
          onClick={handleBack}
          className="w-10 h-10 rounded-full bg-[#FF6D2C] hover:bg-[#e65c18] flex items-center justify-center transition-colors shadow-md"
          title="Voltar"
        >
          <ChevronLeft size={22} className="text-white" />
        </button>
      </div>

      {/* Card da Programação */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
        {/* Lista de atividades */}
        {schedule.length > 0 ? (
          <div>
            {schedule.map((item) => (
              <div key={item.id}>
                {editingItem?.id === item.id ? (
                  <ActivityInlineForm
                    initialData={item}
                    onSave={handleEditActivity}
                    onCancel={() => setEditingItem(null)}
                  />
                ) : (
                  <ActivityRow
                    item={item}
                    onEdit={(it) => setEditingItem(it)}
                    onDelete={(it) => deleteModal.open(it)}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          !showAddForm && (
            <p className="text-sm text-[#1E1E1E]/40 py-6 text-center">
              Nenhuma atividade cadastrada.
            </p>
          )
        )}

        {/* Botão Adicionar */}
        {!showAddForm && !editingItem && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowAddForm(true)}
              className="text-[#FF6D2C] hover:text-[#e65c18] transition-colors"
              title="Adicionar atividade"
            >
              <PlusCircle size={32} />
            </button>
          </div>
        )}

        {/* Formulário de adicionar */}
        {showAddForm && (
          <ActivityInlineForm
            onSave={handleAddActivity}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {/* Botão Salvar */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSaveSchedule}
            className="px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-green-600 hover:bg-green-700 transition-colors shadow-sm"
          >
            Salvar
          </button>
        </div>
      </div>

      {/* Modal de exclusão de atividade */}
      <DeleteActivityModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
