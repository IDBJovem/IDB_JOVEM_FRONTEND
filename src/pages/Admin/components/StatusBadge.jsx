import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "pendente", label: "Pendente" },
  { value: "aprovado", label: "Aprovado" },
  { value: "reprovado", label: "Reprovado" },
];

const STATUS_STYLES = {
  pendente: {
    bg: "bg-[#F5C518]",
    text: "text-[#1E1E1E]",
    border: "border-[#F5C518]",
    hoverBg: "hover:bg-[#e6b800]",
    optionBg: "bg-[#FFFBE6]",
    optionHover: "hover:bg-[#FFF3B0]",
    optionText: "text-[#8B7000]",
  },
  aprovado: {
    bg: "bg-[#22C55E]",
    text: "text-white",
    border: "border-[#22C55E]",
    hoverBg: "hover:bg-[#16A34A]",
    optionBg: "bg-[#F0FDF4]",
    optionHover: "hover:bg-[#DCFCE7]",
    optionText: "text-[#166534]",
  },
  reprovado: {
    bg: "bg-[#EF4444]",
    text: "text-white",
    border: "border-[#EF4444]",
    hoverBg: "hover:bg-[#DC2626]",
    optionBg: "bg-[#FEF2F2]",
    optionHover: "hover:bg-[#FEE2E2]",
    optionText: "text-[#991B1B]",
  },
};

/**
 * Dropdown de status com cores dinâmicas.
 * @param {{ status: string, onChange: (newStatus: string) => void }} props
 */
export default function StatusBadge({ status, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentStyle = STATUS_STYLES[status] || STATUS_STYLES.pendente;
  const currentLabel = STATUS_OPTIONS.find((o) => o.value === status)?.label || "Pendente";

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    if (value !== status) {
      onChange(value);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Botão principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-sm font-bold
          border-2 ${currentStyle.border} ${currentStyle.bg} ${currentStyle.text}
          ${currentStyle.hoverBg}
          transition-all duration-200 cursor-pointer shadow-sm
          focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-${status === "aprovado" ? "green" : status === "reprovado" ? "red" : "yellow"}-300
        `}
      >
        {currentLabel}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 w-36 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50 animate-fade-in overflow-hidden">
          {STATUS_OPTIONS.map((option) => {
            const optStyle = STATUS_STYLES[option.value];
            const isActive = option.value === status;

            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`
                  w-full text-left px-3 py-2 text-sm font-semibold
                  transition-colors duration-150
                  ${isActive ? `${optStyle.optionBg} ${optStyle.optionText}` : `text-gray-600 ${optStyle.optionHover}`}
                `}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${optStyle.bg}`}
                  />
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
