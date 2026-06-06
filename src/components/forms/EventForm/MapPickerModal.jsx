import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { X, MapPin } from "lucide-react";

/* Corrige o ícone padrão do Leaflet (caminhos quebram com bundlers como o Vite) */
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

/* Centro padrão (Brasília) quando ainda não há coordenadas */
const DEFAULT_CENTER = [-15.7934, -47.8822];

/* Captura cliques no mapa e devolve a posição */
function ClickCapture({ onPick }) {
  useMapEvents({
    click(e) {
      onPick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export default function MapPickerModal({ open, initialLat, initialLng, onConfirm, onClose }) {
  const hasInitial = initialLat !== "" && initialLng !== "" && initialLat != null && initialLng != null;
  const [pos, setPos] = useState(
    hasInitial ? [Number(initialLat), Number(initialLng)] : null
  );

  if (!open) return null;

  const center = pos || (hasInitial ? [Number(initialLat), Number(initialLng)] : DEFAULT_CENTER);

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="flex items-center gap-2 text-sm font-bold text-[#1E1E1E]">
            <MapPin size={18} className="text-[#FF6D2C]" />
            Clique no mapa para marcar o local
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[#1E1E1E]/50 hover:text-[#1E1E1E] transition-colors"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mapa */}
        <div className="h-[400px] w-full">
          <MapContainer
            center={center}
            zoom={pos || hasInitial ? 14 : 4}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickCapture onPick={setPos} />
            {pos && <Marker position={pos} />}
          </MapContainer>
        </div>

        {/* Rodapé */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-gray-100">
          <span className="text-sm text-[#1E1E1E]/70">
            {pos
              ? `${pos[0].toFixed(6)}, ${pos[1].toFixed(6)}`
              : "Nenhum ponto selecionado"}
          </span>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-[#1E1E1E] border border-gray-300 hover:border-[#FF6D2C] hover:text-[#FF6D2C] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={!pos}
              onClick={() => onConfirm(pos[0], pos[1])}
              className="px-5 py-2 rounded-lg text-sm font-bold text-white bg-[#FF6D2C] hover:bg-[#e65c18] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
