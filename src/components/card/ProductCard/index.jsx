import { Pencil, Trash2 } from "lucide-react";

export default function ProductCard({ product, variant = "full", onEdit, onDelete }) {
  if (variant === "compact") {
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

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow duration-200">
      {/* Imagem */}
      <div className="aspect-square bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x300?text=Sem+Imagem";
          }}
        />
      </div>

      {/* Info */}
      <div className="p-4 text-center">
        <p className="font-semibold text-sm text-[#1E1E1E] truncate mb-3">
          {product.name}
        </p>

        {/* Botões */}
        <div className="flex justify-center gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(product.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Pencil size={13} />
              Editar
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(product)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-sm"
            >
              <Trash2 size={13} />
              Excluir
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
