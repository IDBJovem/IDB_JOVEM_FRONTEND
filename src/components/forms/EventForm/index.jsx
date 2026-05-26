import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, CalendarDays, Users, Music, Link as LinkIcon, CalendarCog, ImagePlus } from "lucide-react";

export default function EventForm({ initialData = {}, onSubmit, eventId }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    location: initialData.location || "",
    date: initialData.date ? initialData.date.split("T")[0] : "",
    palestrantes: initialData.palestrantes || "",
    bandas: initialData.bandas || "",
    linkFormularioVoluntarios: initialData.linkFormularioVoluntarios || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleCancel = () => {
    navigate("/admin/eventos");
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        {/* Nome */}
        <div className="mb-1">
          <label className="block text-sm font-bold text-[#1E1E1E] mb-2">Nome</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Nome do Evento"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-[#FFF8F3] text-sm text-[#1E1E1E] placeholder-[#1E1E1E]/40 focus:border-[#FF6D2C] focus:ring-2 focus:ring-[#FF6D2C]/20 transition-all"
            required
          />
        </div>

        <hr className="my-5 border-gray-100" />

        {/* Descrição */}
        <div className="mb-1">
          <label className="block text-sm font-bold text-[#1E1E1E] mb-2">Descrição</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descrição do Evento"
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-[#FFF8F3] text-sm text-[#1E1E1E] placeholder-[#1E1E1E]/40 focus:border-[#FF6D2C] focus:ring-2 focus:ring-[#FF6D2C]/20 transition-all resize-none"
          />
        </div>

        <hr className="my-5 border-gray-100" />

        {/* Local + Data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-1">
          <div>
            <label className="block text-sm font-bold text-[#1E1E1E] mb-2">Local</label>
            <div className="relative">
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Local do evento"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 bg-[#FFF8F3] text-sm text-[#1E1E1E] placeholder-[#1E1E1E]/40 focus:border-[#FF6D2C] focus:ring-2 focus:ring-[#FF6D2C]/20 transition-all"
                required
              />
              <MapPin size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1E1E1E]/30" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-[#1E1E1E] mb-2">Data</label>
            <div className="relative">
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-[#FFF8F3] text-sm text-[#1E1E1E] focus:border-[#FF6D2C] focus:ring-2 focus:ring-[#FF6D2C]/20 transition-all"
                required
              />
            </div>
          </div>
        </div>

        <hr className="my-5 border-gray-100" />

        {/* Palestrantes + Bandas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-1">
          <div>
            <label className="block text-sm font-bold text-[#1E1E1E] mb-2">Palestrantes</label>
            <div className="relative">
              <input
                type="text"
                name="palestrantes"
                value={form.palestrantes}
                onChange={handleChange}
                placeholder="Palestrantes"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 bg-[#FFF8F3] text-sm text-[#1E1E1E] placeholder-[#1E1E1E]/40 focus:border-[#FF6D2C] focus:ring-2 focus:ring-[#FF6D2C]/20 transition-all"
              />
              <Users size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1E1E1E]/30" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-[#1E1E1E] mb-2">Bandas</label>
            <div className="relative">
              <input
                type="text"
                name="bandas"
                value={form.bandas}
                onChange={handleChange}
                placeholder="Bandas"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 bg-[#FFF8F3] text-sm text-[#1E1E1E] placeholder-[#1E1E1E]/40 focus:border-[#FF6D2C] focus:ring-2 focus:ring-[#FF6D2C]/20 transition-all"
              />
              <Music size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1E1E1E]/30" />
            </div>
          </div>
        </div>

        <hr className="my-5 border-gray-100" />

        {/* Link Formulário Voluntários */}
        <div className="mb-1">
          <label className="block text-sm font-bold text-[#1E1E1E] mb-2">Link Formulário Voluntários</label>
          <div className="relative">
            <input
              type="url"
              name="linkFormularioVoluntarios"
              value={form.linkFormularioVoluntarios}
              onChange={handleChange}
              placeholder="https://forms.gle/..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 bg-[#FFF8F3] text-sm text-[#1E1E1E] placeholder-[#1E1E1E]/40 focus:border-[#FF6D2C] focus:ring-2 focus:ring-[#FF6D2C]/20 transition-all uppercase tracking-wide sm:max-w-md"
            />
          </div>
        </div>

        <hr className="my-5 border-gray-100" />

        <div className="flex flex-wrap gap-3 mb-1">
          {eventId && (
            <button
              type="button"
              onClick={() => navigate(`/admin/eventos/${eventId}/programacao`)}
              className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-semibold text-[#1E1E1E] hover:border-[#FF6D2C] hover:text-[#FF6D2C] transition-colors bg-white"
            >
              Editar Programação do Evento
              <CalendarCog size={16} />
            </button>
          )}
          <button
            type="button"
            className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-semibold text-[#1E1E1E] hover:border-[#FF6D2C] hover:text-[#FF6D2C] transition-colors bg-white"
          >
            Adicionar Galeria de Fotos
            <ImagePlus size={16} />
          </button>
        </div>

        <hr className="my-5 border-gray-100" />

        {/* Botões */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-sm"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-green-600 hover:bg-green-700 transition-colors shadow-sm"
          >
            Salvar
          </button>
        </div>
      </div>
    </form>
  );
}
