import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import SectionTitle from "../../../components/ui/SectionTitle";
import DashboardEventRow from "./components/DashboardEventRow";
import DashboardProductCard from "./components/DashboardProductCard";
import CalendarMini from "./components/CalendarMini";

// mocks pra testar o layout
const PROXIMOS_EVENTOS = [
  { id: 1, title: "Nome do evento", location: "Local", day: "10", month: "Jul" },
  { id: 2, title: "Nome do evento", location: "Local", day: "10", month: "Jul" },
  { id: 3, title: "Nome do evento", location: "Local", day: "10", month: "Jul" },
  { id: 4, title: "Nome do evento", location: "Local", day: "10", month: "Jul" },
];

const EVENTOS_ANTERIORES = [
  { id: 5, title: "Nome do evento", location: "Local", day: "10", month: "Jul" },
  { id: 6, title: "Nome do evento", location: "Local", day: "10", month: "Jul" },
  { id: 7, title: "Nome do evento", location: "Local", day: "10", month: "Jul" },
  { id: 8, title: "Nome do evento", location: "Local", day: "10", month: "Jul" },
];

const PRODUTOS = [
  { id: 1, name: "Nome do Item", image: "/images/galeria/idb-jovem-one.jpg" },
  { id: 2, name: "Nome do Item", image: "/images/galeria/idb-teen-camp.jpg" },
  { id: 3, name: "Nome do Item", image: "/images/galeria/es-ne-ajo.jpg" },
  { id: 4, name: "Nome do Item", image: "/images/galeria/idb-jovem-one.jpg" },
  { id: 5, name: "Nome do Item", image: "/images/galeria/idb-teen-camp.jpg" },
  { id: 6, name: "Nome do Item", image: "/images/galeria/es-ne-ajo.jpg" },
  { id: 7, name: "Nome do Item", image: "/images/galeria/idb-jovem-one.jpg" },
  { id: 8, name: "Nome do Item", image: "/images/galeria/idb-teen-camp.jpg" },
];

// tela principal do admin
export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      <SectionTitle 
        title="Dashboard" 
        titleStyle={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 600 }} 
      />

      {/* linha de eventos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* próximos eventos */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[#1E1E1E] text-lg">Próximos Eventos</h2>
            <Link
              to="/admin/eventos"
              className="text-xs font-semibold text-[#FF6D2C] hover:underline flex items-center gap-0.5"
            >
              Ver todos <ChevronRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {PROXIMOS_EVENTOS.map((event) => (
              <DashboardEventRow key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* eventos passados */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[#1E1E1E] text-lg">Eventos Anteriores</h2>
            <Link
              to="/admin/eventos"
              className="text-xs font-semibold text-[#FF6D2C] hover:underline flex items-center gap-0.5"
            >
              Ver todos <ChevronRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {EVENTOS_ANTERIORES.map((event) => (
              <DashboardEventRow key={event.id} event={event} isPast />
            ))}
          </div>
        </div>
      </div>

      {/* linha do caledário e produtos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* calendário */}
        <CalendarMini />

        {/* lista de produtos */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[#1E1E1E] text-lg">Produtos Cadastrados</h2>
            <Link
              to="/admin/produtos"
              className="text-xs font-semibold text-[#FF6D2C] hover:underline flex items-center gap-0.5"
            >
              Ver todos <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {PRODUTOS.map((product) => (
              <DashboardProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
