import { useEffect, useMemo, useRef, useState } from "react";
import { Clock } from "lucide-react";

function parseTime(value) {
  const match = String(value || "").match(/^(\d{2}):(\d{2})/);
  return {
    hour: match ? match[1] : "00",
    minute: match ? match[2] : "00",
  };
}

function buildOptions(max) {
  return Array.from({ length: max }, (_, index) => String(index).padStart(2, "0"));
}

/*
 * Campo de horário independente do seletor nativo do navegador.
 *
 * O usuário continua podendo digitar a hora diretamente no input, mas o ícone
 * de relógio abre um seletor próprio com hora e minuto. Isso evita falhas em
 * browsers que não expõem showPicker() ou que bloqueiam o popup nativo.
 */
export default function TimeInput({ wrapperClassName = "", className = "", onChange, value, name, ...props }) {
  const wrapperRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState(() => parseTime(value));

  const hours = useMemo(() => buildOptions(24), []);
  const minutes = useMemo(() => buildOptions(60), []);

  useEffect(() => {
    if (isOpen) {
      setDraft(parseTime(value));
    }
  }, [isOpen, value]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleApply = () => {
    const nextValue = `${draft.hour}:${draft.minute}`;
    onChange?.({ target: { name, value: nextValue } });
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    onChange?.(event);
  };

  return (
    <div className={`relative ${wrapperClassName}`} ref={wrapperRef}>
      <input
        type="time"
        name={name}
        value={value}
        onChange={handleInputChange}
        {...props}
        className={`w-full pr-9 ${className}`}
      />
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label="Abrir seletor de horário"
        aria-expanded={isOpen}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#1E1E1E]/55"
      >
        <Clock size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50 w-56 rounded-xl border border-gray-200 bg-white p-4 shadow-xl animate-fade-in">
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-2 text-xs font-semibold text-[#1E1E1E]/70">
              Hora
              <select
                value={draft.hour}
                onChange={(event) => setDraft((current) => ({ ...current, hour: event.target.value }))}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-[#1E1E1E] focus:border-[#FF6D2C] focus:ring-2 focus:ring-[#FF6D2C]/20"
              >
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-xs font-semibold text-[#1E1E1E]/70">
              Minuto
              <select
                value={draft.minute}
                onChange={(event) => setDraft((current) => ({ ...current, minute: event.target.value }))}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-[#1E1E1E] focus:border-[#FF6D2C] focus:ring-2 focus:ring-[#FF6D2C]/20"
              >
                {minutes.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2 text-xs font-bold text-[#1E1E1E] hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="rounded-lg bg-[#FF6D2C] px-3 py-2 text-xs font-bold text-white hover:bg-[#e65c18]"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
