import { Search, XCircle } from "lucide-react";

export default function EventSearch({ value, onChange, onClear }) {
  return (
    <div className="relative flex-1 min-w-[200px]">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FF6D2C] pointer-events-none"
      />
      <input
        id="event-search"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Pesquisar evento..."
        className="w-full bg-[#F2F2F2]/95 border border-[#E0E0E0] rounded-lg pl-9 pr-9 py-2.5 text-sm font-medium text-[#1E1E1E] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#FF6D2C] transition-colors shadow-sm"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF6D2C] hover:scale-110 transition-all"
          aria-label="Limpar pesquisa"
        >
          <XCircle size={16} />
        </button>
      )}
    </div>
  );
}
