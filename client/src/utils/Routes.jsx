import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import NavBarAdmin from "../components/Admin/NavBarAdmin";
import SideBarAdmin from "../components/Admin/SideBarAdmin";
import AppAdmin from "../components/Admin/AppAdmin";
import { AuthProvider } from "../context/AuthProvider";
import Productos from "../components/Admin/Productos";
import Usuarios from "../components/Admin/Usuarios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Detalle from "../components/Detalle";
import Cotizador from "../components/Admin/Cotizador";
import Descuentos from "../components/Admin/Descuentos";
import Contacto from "../components/Admin/Contacto";
import Garantia from "../components/Admin/Garantia";
import GarantiaDetail from "../components/Admin/GarantiaDetail";
import Ventas from "../components/Admin/Ventas";
import VentasDetail from "../components/Admin/VentasDetail";

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/productos/:id" element={<Detalle />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

const AdminLayout = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.rol !== false) {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <>
      <NavBarAdmin />
      <div className="containerAdmin">
        <div className="sidebarAdmin">
          <SideBarAdmin />
        </div>
        {/* <div className="content"> */}
        <Routes>
          <Route index element={<AppAdmin />} />
          <Route path="/Usuarios" element={<Usuarios />} />
          <Route path="/Clientes" element={<Cotizador />} />
          <Route path="/Productos/cargar" element={<Productos />} />
          <Route path="/Cotizaciones" element={<Cotizador />} />
          <Route path="/Cotizaciones/crear" element={<Cotizador />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/Garantia" element={<Garantia />} />
          <Route path="/garantias/garantia/:id" element={<GarantiaDetail />} />
          <Route path="/ventas/:id" element={<VentasDetail />} />
          <Route path="/Contacto" element={<Contacto />} />
          <Route path="/Descuentos" element={<Descuentos />} />
          <Route path="/Mensajes" element={<Cotizador />} />
        </Routes>
        {/* </div> */}
      </div>
    </>
  );
};

export default AppRouter;
