const WEEK_DAYS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

function generateCalendarDays() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - dayOfWeek);

  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    days.push({
      day: d.getDate(),
      isToday: d.toDateString() === today.toDateString(),
    });
  }
  return days;
}

/* Componente Calendário Mini */
export default function CalendarMini() {
  const days = generateCalendarDays();
  const hours = Array.from({ length: 10 }, (_, i) => i + 8);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">📅</span>
        <h3 className="font-bold text-[#1E1E1E] text-lg">Calendário</h3>
      </div>

      {/* Cabeçalho da semana */}
      <div className="grid grid-cols-7 gap-1 mb-3">
        {WEEK_DAYS.map((day, i) => (
          <div key={day} className="text-center">
            <span className="text-[10px] font-semibold text-[#1E1E1E]/40 uppercase">{day}</span>
            <div
              className={`mt-1 w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-bold transition-all ${days[i].isToday
                ? "bg-[#FF6D2C] text-white shadow-md"
                : "text-[#1E1E1E]/70 hover:bg-gray-100"
                }`}
            >
              {days[i].day}
            </div>
          </div>
        ))}
      </div>

      {/* Grid de Horas */}
      <div className="border-t border-gray-100 pt-2 space-y-0">
        {hours.map((hour) => (
          <div key={hour} className="flex items-stretch min-h-[28px] border-b border-gray-50">
            <span className="text-[10px] text-[#1E1E1E]/30 w-10 shrink-0 pt-1">{hour}:00</span>
            <div className="flex-1 grid grid-cols-7 gap-0.5">
              {WEEK_DAYS.map((_, i) => {
                // Blocos coloridos aleatórios para efeito visual
                const hasEvent = Math.random() > 0.65;
                const colors = [
                  "bg-blue-200/60",
                  "bg-green-200/60",
                  "bg-purple-200/60",
                  "bg-amber-200/60",
                  "bg-pink-200/60",
                ];
                const color = colors[Math.floor(Math.random() * colors.length)];
                return (
                  <div
                    key={i}
                    className={`rounded-sm ${hasEvent ? color : ""}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
