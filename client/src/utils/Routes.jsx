import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import App from "../App";
import NavBarAdmin from "../components/Admin/NavBarAdmin";
import SideBarAdmin from "../components/Admin/SideBarAdmin";
import AppAdmin from "../components/Admin/AppAdmin";
import { AuthProvider } from "../context/AuthProvider";
import Productos from "../components/Admin/Productos";
import Usuarios from "../components/Admin/Usuarios";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
// import Detalle from "../components/Detalle";
import Cotizador from "../components/Admin/Cotizador";
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
import ContactoProductoDetail from "../components/Admin/ContactoProductoDetail";
import ContactoDetail from "../components/Admin/ContactoDetail";
import Historial from "../components/Admin/Historial";
import ContactoProducto from "../components/Admin/ContactoProducto";
import ErroPage from "../components/ErroPage";
import { useUsuario } from "../hooks/useUsuarios";
import Spinner from "../UI/Spinner";
import Repuestos from "../components/Admin/Repuestos";
import RepuestosDetail from "../components/Admin/RepuestosDetail";
// import PostVenta from "../components/empresa/PostVenta";
// import Financiación from "../components/empresa/Financiación";
// import Distribuidores from "../components/empresa/Distribuidores";
// import AmericanRepuestos from "../components/empresa/AmericanRepuestos";
// import AmericanContacto from "../components/empresa/AmericanContacto";
// import AmericanGarantia from "../components/empresa/AmericanGarantia";
import ProductosDetalle from "../components/Admin/ProductosDetalle";
import useAxiosInterceptor from "../hooks/useAxiosInterceptor";
import OfertasNovedades from "../components/Admin/OfertasNovedades";
// import Muro from "../components/miUsuario/Muro";
import Suscripcion from "../components/Admin/Suscripcion";
import VentasAprobar from "../components/Admin/VentasAprobar";
import Wapp from "../components/Admin/Notificaciones/Wapp";
import MailsMasivos from "../components/Admin/Notificaciones/MailsMasivos";

const AppRouter = () => {
  const InterceptorSetup = () => {
    useAxiosInterceptor();
    return null;
  };

  return (
    <Router>
      <AuthProvider>
        <InterceptorSetup />
        <Routes>
          <Route path="/" element={<App />} />
          {/* <Route path="/postventa" element={<PostVenta />} />
          <Route path="/financiacion" element={<Financiación />} />
          <Route path="/americanrepuestos" element={<AmericanRepuestos />} />
          <Route path="/americanContacto" element={<AmericanContacto />} />
          <Route path="/americanGarantia" element={<AmericanGarantia />} />
          <Route path="/distribuidores" element={<Distribuidores />} />
          <Route path="/novedades" element={<Muro />} />
          <Route path="/productos/:id" element={<Detalle />} /> */}
          <Route path="/Error" element={<ErroPage />} />
          <Route path="*" element={<ErroPage />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

const AdminLayout = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const {
    mutate: checkRol,
    data: rolData,
    isError: rolError,
  } = useUsuario().CheckRolMutation;

  // Función para verificar si el token ha expirado
  const checkTokenExpiration = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  const token = localStorage.getItem("token");

  // Función para verificar el rol del usuario
  const handleCheckRol = async () => {
    try {
      if (token) {
        await checkRol({ token });
      }
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    if (token && !checkTokenExpiration(token)) {
      handleCheckRol();
    } else {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (rolData) {
      const role = rolData?.data?.rol;
      if (role === "comun") {
        navigate("/");
      } else {
        setLoading(false);
      }
    }
    if (rolError || error) {
      navigate("/");
    }
  }, [rolData, rolError, error, navigate]);

  // Mientras está verificando, puedes mostrar un loader
  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <NavBarAdmin />
      <div className="containerAdmin">
        <div className="sidebarAdmin">
          <SideBarAdmin />
        </div>

        <Routes>
          <Route index element={<AppAdmin />} />
          <Route path="/Usuarios" element={<Usuarios />} />

          <Route path="/Usuarios/:id" element={<UsuariosDetail />} />
          <Route path="/Clientes/ver" element={<Clientes />} />
          <Route path="/Clientes/ver/:id" element={<ClientesDetail />} />
          <Route path="/Clientes/modificar/:id" element={<ClientesEdit />} />
          <Route path="/Clientes/cargar" element={<CargaClientes />} />
          <Route path="/Productos/ver" element={<Productos />} />

          <Route path="/contacto/ver/:id" element={<ContactoDetail />} />
          <Route path="/Productos/cargar" element={<FormProduct />} />
          <Route path="/productos/modificar/:id" element={<ProductosEdit />} />
          <Route path="/productos/detalle/:id" element={<ProductosDetalle />} />
          <Route path="/Cotizaciones/ver" element={<Cotizaciones />} />
          <Route path="/Cotizaciones/ver/:id" element={<CotizacionDetail />} />
          <Route
            path="/Cotizaciones/modificar/:id"
            element={<CotizacionEdit />}
          />
          <Route path="/Cotizaciones/historial" element={<Historial />} />
          <Route path="/Cotizaciones/crear" element={<Cotizador />} />
          <Route path="/ventas/ver" element={<Ventas />} />
          <Route path="/ventas/:id" element={<VentasDetail />} />
          <Route path="/ventas/aprobar" element={<VentasAprobar />} />
          <Route path="/Notificaciones/WhatsApp" element={<Wapp />} />
          <Route path="/Notificaciones/Emails" element={<MailsMasivos />} />
        </Routes>
      </div>
    </>
  );
};

export default AppRouter;
