export default function AdminTable({
  columns,
  data,
  renderRow,
  emptyMessage = "Nenhum item encontrado.",
  headerBg = "bg-[#FF6D2C]",
}) {
  const gridTemplate = columns.map((col) => col.width || "1fr").join(" ");

  return (
    <div className={`${headerBg} rounded-2xl shadow-sm overflow-hidden`}>
      {/* Cabeçalho da tabela */}
      <div
        className="px-6 py-4"
        style={{ display: "grid", gridTemplateColumns: gridTemplate }}
      >
        {columns.map((col) => (
          <span key={col.key} className="text-white font-bold text-sm italic">
            {col.label}
          </span>
        ))}
      </div>

      {/* Linhas */}
      <div className="bg-white rounded-b-2xl">
        {data.length > 0 ? (
          data.map((item, index) => renderRow(item, index))
        ) : (
          <div className="px-6 py-10 text-center">
            <p className="text-sm text-[#1E1E1E]/40">{emptyMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
