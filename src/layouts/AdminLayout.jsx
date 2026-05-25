import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import AdminSidebar from "../pages/Admin/components/AdminSidebar";

/**
 * Layout administrativo — com sidebar responsiva.
 */
export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FDF3EA]">
      {/* Topbar Mobile */}
      <div className="md:hidden fixed top-0 left-0 w-full h-[60px] bg-[#FF6D2C] z-30 flex items-center px-4 shadow-md">
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="text-white p-2 rounded-lg hover:bg-white/20 transition-colors"
          aria-label="Abrir menu"
        >
          <Menu size={26} />
        </button>
        <span className="text-white font-bold ml-3 text-lg">Painel Admin</span>
      </div>

      <AdminSidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      <main className="flex-1 md:ml-[240px] p-4 md:p-8 pt-[80px] md:pt-8 overflow-y-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
