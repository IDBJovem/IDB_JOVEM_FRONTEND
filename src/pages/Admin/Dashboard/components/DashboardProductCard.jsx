const FALLBACK_IMAGE = "https://via.placeholder.com/300x300?text=Sem+Imagem";

export default function DashboardProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-0.5">
      <div className="aspect-square bg-gray-50 flex items-center justify-center p-3 overflow-hidden">
        <img
          src={product.image || FALLBACK_IMAGE}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
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
