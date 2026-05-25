import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./components/ScrollToTop";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home";
import Eventos from "./pages/Eventos";
import EventoDetalhe from "./pages/EventoDetalhe";
import Galeria from "./pages/Galeria";
import Login from "./pages/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminEventos from "./pages/Admin/Eventos";
import AdminEventoCreate from "./pages/Admin/Eventos/Create";
import AdminEventoDetails from "./pages/Admin/Eventos/Details";
import AdminEventoEdit from "./pages/Admin/Eventos/Edit";
import AdminEventoEditSchedule from "./pages/Admin/Eventos/EditSchedule";
import AdminProdutos from "./pages/Admin/Produtos";
import AdminProdutoCreate from "./pages/Admin/Produtos/Create";
import AdminProdutoEdit from "./pages/Admin/Produtos/Edit";
import AdminVoluntarios from "./pages/Admin/Voluntarios";
import AdminVoluntarioDetails from "./pages/Admin/Voluntarios/Details";

/** Public layout — renders Header + Footer around content */
function PublicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

/** Public layout without Footer */
function PublicLayoutNoFooter() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          {/* Admin routes — sidebar layout, no Header/Footer */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/eventos" element={<AdminEventos />} />
            <Route path="/admin/eventos/criar" element={<AdminEventoCreate />} />
            <Route path="/admin/eventos/:id" element={<AdminEventoDetails />} />
            <Route path="/admin/eventos/:id/editar" element={<AdminEventoEdit />} />
            <Route path="/admin/eventos/:id/programacao" element={<AdminEventoEditSchedule />} />
            <Route path="/admin/produtos" element={<AdminProdutos />} />
            <Route path="/admin/produtos/criar" element={<AdminProdutoCreate />} />
            <Route path="/admin/produtos/:id/editar" element={<AdminProdutoEdit />} />
            <Route path="/admin/voluntarios" element={<AdminVoluntarios />} />
            <Route path="/admin/voluntarios/:eventId" element={<AdminVoluntarioDetails />} />
          </Route>

          {/* Public routes — with Header/Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/eventos/:slug" element={<EventoDetalhe />} />
            <Route path="/galeria" element={<Galeria />} />
          </Route>

          {/* Public routes — with Header but no Footer */}
          <Route element={<PublicLayoutNoFooter />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}