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
import Calendario from "../components/Admin/Calendario";
import Ventas from "../components/Admin/Ventas";

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
          <Route path="/Productos" element={<Productos />} />
          <Route path="/Usuarios" element={<Usuarios />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/Calendario" element={<Calendario />} />
        </Routes>
        {/* </div> */}
      </div>
    </>
  );
};

export default AppRouter;
