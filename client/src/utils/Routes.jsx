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
import Cotizaciones from "../components/Admin/Cotizaciones";
import CotizacionDetail from "../components/Admin/CotizacionDetail";
import CargaClientes from "../components/Admin/CargaClientes";
import Clientes from "../components/Admin/Clientes";
import ClientesDetail from "../components/Admin/ClientesDetail";
import FormProduct from "../components/Admin/FormProduct";
import FormMensaje from "../components/Admin/FormMensaje";
import MensajesEnviados from "../components/Admin/MensajesEnviados";
import MensajesRecibidos from "../components/Admin/MensajesRecibidos";
import MensajesDetail from "../components/Admin/MensajesDetail";
import UsuariosDetail from "../components/Admin/UsuariosDetail";
import ClientesEdit from "../components/Admin/ClientesEdit";
import CotizacionEdit from "../components/Admin/CotizacionEdit";
import ProductosEdit from "../components/Admin/ProductosEdit";
import DescuentoDetail from "../components/Admin/DescuentoDetail";
import ContactoDetail from "../components/Admin/ContactoDetail";
import Historial from "../components/Admin/Historial";

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
    if (auth.rol === null) {
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
          <Route path="/Usuarios/:id" element={<UsuariosDetail />} />
          <Route path="/Clientes/ver" element={<Clientes />} />
          <Route path="/Clientes/ver/:id" element={<ClientesDetail />} />
          <Route path="/Clientes/modificar/:id" element={<ClientesEdit />} />
          <Route path="/Clientes/cargar" element={<CargaClientes />} />
          <Route path="/Productos/ver" element={<Productos />} />
          <Route path="/descuento/ver/:id" element={<DescuentoDetail />} />
          <Route path="/contacto/ver/:id" element={<ContactoDetail />} />
          <Route path="/Productos/cargar" element={<FormProduct />} />
          <Route path="/productos/modificar/:id" element={<ProductosEdit />} />
          <Route path="/Cotizaciones/ver" element={<Cotizaciones />} />
          <Route path="/Cotizaciones/ver/:id" element={<CotizacionDetail />} />
          <Route
            path="/Cotizaciones/modificar/:id"
            element={<CotizacionEdit />}
          />
          <Route path="/Cotizaciones/historial" element={<Historial />} />
          <Route path="/Cotizaciones/crear" element={<Cotizador />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/Garantia" element={<Garantia />} />
          <Route path="/garantias/garantia/:id" element={<GarantiaDetail />} />
          <Route path="/ventas/:id" element={<VentasDetail />} />
          <Route path="/Contacto" element={<Contacto />} />
          <Route path="/Descuentos" element={<Descuentos />} />
          <Route path="/Mensajes/nuevo" element={<FormMensaje />} />
          <Route path="/Mensajes/enviados" element={<MensajesEnviados />} />
          <Route path="/Mensajes/enviados/:id" element={<MensajesDetail />} />
          <Route path="/Mensajes/ver" element={<MensajesRecibidos />} />
          <Route path="/Mensajes/ver/:id" element={<MensajesDetail />} />
        </Routes>
        {/* </div> */}
      </div>
    </>
  );
};

export default AppRouter;
