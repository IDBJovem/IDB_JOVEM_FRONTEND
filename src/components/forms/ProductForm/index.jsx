import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus } from "lucide-react";

/**
 * Formulário reutilizável para criação e edição de produtos.
 * @param {{ initialData?: object, onSubmit: (data) => void }} props
 */
export default function ProductForm({ initialData = {}, onSubmit }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    link: initialData.link || "",
    image: initialData.image || "",
  });

  const [imagePreview, setImagePreview] = useState(initialData.image || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setForm((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleCancel = () => {
    navigate("/admin/produtos");
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        {/* Nome */}
        <div className="mb-1">
          <label className="block text-sm font-bold text-[#1E1E1E] mb-2">Nome</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nome do produto"
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
            placeholder="Descrição do produto"
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-[#FFF8F3] text-sm text-[#1E1E1E] placeholder-[#1E1E1E]/40 focus:border-[#FF6D2C] focus:ring-2 focus:ring-[#FF6D2C]/20 transition-all resize-none"
          />
        </div>

        <hr className="my-5 border-gray-100" />

        {/* Link + Upload de Imagem */}
        <div className="mb-1">
          <label className="block text-sm font-bold text-[#1E1E1E] mb-2">Link do Produto</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="http://produto.com"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 bg-[#FFF8F3] text-sm text-[#1E1E1E] placeholder-[#1E1E1E]/40 focus:border-[#FF6D2C] focus:ring-2 focus:ring-[#FF6D2C]/20 transition-all"
            />
            <label className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-semibold text-[#1E1E1E] hover:border-[#FF6D2C] hover:text-[#FF6D2C] transition-colors bg-white cursor-pointer whitespace-nowrap">
              Adicionar Foto do Produto
              <ImagePlus size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Preview da imagem */}
        {imagePreview && (
          <>
            <hr className="my-5 border-gray-100" />
            <div className="mb-1">
              <label className="block text-sm font-bold text-[#1E1E1E] mb-2">Preview</label>
              <div className="w-32 h-32 rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                <img
                  src={imagePreview}
                  alt="Preview do produto"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </>
        )}

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
