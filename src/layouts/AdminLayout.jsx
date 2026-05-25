import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminSidebar from "../pages/Admin/components/AdminSidebar";

export default function AdminLayout() {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#FDF3EA]">
      <AdminSidebar />
      <main className="flex-1 ml-[240px] p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
