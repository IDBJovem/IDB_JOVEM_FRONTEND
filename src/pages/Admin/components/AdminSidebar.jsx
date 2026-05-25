import { NavLink, useNavigate } from "react-router-dom";
import { Home, CalendarDays, Users, ShoppingCart, LogOut } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const sidebarLinks = [
  { label: "Home", path: "/admin", icon: Home },
  { label: "Eventos", path: "/admin/eventos", icon: CalendarDays },
  { label: "Voluntários", path: "/admin/voluntarios", icon: Users },
  { label: "Produtos", path: "/admin/produtos", icon: ShoppingCart },
];

export default function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-[240px] min-h-screen bg-gradient-to-b from-[#FF6D2C] to-[#E85A1B] flex flex-col shadow-xl fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="px-6 pt-6 pb-2">
        <span className="font-['Faster_One'] text-white text-[28px] leading-none drop-shadow-md">
          IDB Jovem
        </span>
      </div>

      {/* Dashboard title */}
      <div className="px-6 pb-4">
        <span className="text-white/90 font-handwriting text-xl">Dashboard</span>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 flex flex-col gap-1 px-3">
        {sidebarLinks.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 group
              ${
                isActive
                  ? "bg-white/25 text-white shadow-md"
                  : "text-white/90 hover:bg-white/15 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <item.icon
                    size={20}
                    className={`transition-transform duration-200 ${
                      isActive ? "scale-110" : "group-hover:scale-105"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                  className={`transition-transform duration-200 ${
                    isActive ? "translate-x-0.5" : ""
                  }`}
                >
                  <path
                    d="M1 1L7 7L1 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout button */}
      <div className="px-3 pb-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group"
        >
          <LogOut
            size={20}
            className="group-hover:scale-105 transition-transform duration-200"
          />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
