import React, { useState, useEffect } from "react";
import { useUsuario } from "../../hooks/useUsuarios";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaBox,
  FaFileInvoiceDollar,
  FaShoppingCart,
  FaShieldAlt,
  FaPercentage,
  FaPhone,
  FaAngleDown,
  FaCogs,
  FaArrowLeft,
  FaTag,
  FaEnvelopeOpen,
} from "react-icons/fa";
import { MdPerson, MdMail } from "react-icons/md";

const SideBarResponsiva = ({ handleCerrarModalSideBar }) => {
  const { auth } = useAuth();
  const token = localStorage.getItem("token");
  const idUsuario = token;
  const { mutate: checkRol, data: rolData } = useUsuario().CheckRolMutation;

  const navigate = useNavigate();

  const handleCheckRol = async () => {
    try {
      await checkRol({ idUsuario });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    if (idUsuario) {
      handleCheckRol();
    }
  }, [idUsuario]);

  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(null);
  const role = rolData?.data.rol;

  const categories = [
    {
      label: "Usuarios",
      icon: MdPerson,
      subCategories: [],
      roles: ["administrador", "gerente"],
    },
    {
      label: "Clientes",
      icon: FaUsers,
      subCategories: [
        {
          label: "Cargar clientes",
          path: "/admin/clientes/cargar",
          roles: ["administrador", "vendedor", "gerente"],
        },
        {
          label: "Ver clientes",
          path: "/admin/clientes/ver",
          roles: ["administrador", "vendedor", "gerente"],
        },
      ],
      roles: ["administrador", "vendedor", "gerente"],
    },
    {
      label: "Productos",
      icon: FaBox,
      subCategories: [
        {
          label: "Cargar productos",
          path: "/admin/productos/cargar",
          roles: ["administrador", "gerente"],
        },
        {
          label: "Ver productos",
          path: "/admin/productos/ver",
          roles: ["administrador", "vendedor", "gerente"],
        },
      ],
      roles: ["administrador", "vendedor", "gerente"],
    },
    {
      label: "Cotizaciones",
      icon: FaFileInvoiceDollar,
      subCategories: [
        {
          label: "Crear Cotizacion",
          path: "/admin/cotizaciones/crear",
          roles: ["administrador", "vendedor", "gerente"],
        },
        {
          label: "Ver Cotizaciones",
          path: "/admin/cotizaciones/ver",
          roles: ["administrador", "vendedor", "gerente"],
        },
        {
          label: "Historial Cotizaciones",
          path: "/admin/cotizaciones/historial",
          roles: ["administrador", "gerente"],
        },
      ],
      roles: ["administrador", "vendedor", "gerente"],
    },
    {
      label: "Ventas",
      icon: FaShoppingCart,
      subCategories: [],
      roles: ["administrador", "vendedor", "gerente"],
    },
    // {
    //   label: "Garantia",
    //   icon: FaShieldAlt,
    //   subCategories: [],
    //   roles: ["administrador"],
    // },
    // {
    //   label: "Repuestos",
    //   icon: FaCogs,
    //   subCategories: [],
    //   roles: ["administrador"],
    // },
    // {
    //   label: "Contacto",
    //   icon: FaPhone,
    //   subCategories: [],
    //   roles: ["administrador"],
    // },
    // {
    //   label: "ContactoProducto",
    //   icon: FaPercentage,
    //   subCategories: [],
    //   roles: ["administrador"],
    // },
    // {
    //   label: "Suscriptores",
    //   icon: FaEnvelopeOpen,
    //   subCategories: [],
    //   roles: ["administrador"],
    // },
    // {
    //   label: "OfertasNovedades",
    //   icon: FaTag,
    //   subCategories: [],
    //   roles: ["administrador"],
    // },
    // {
    //   label: "Mensajes",
    //   icon: MdMail,
    //   subCategories: [
    //     {
    //       label: "Nuevo Correo",
    //       path: "/admin/mensajes/nuevo",
    //       roles: ["administrador", "vendedor", "gerente"],
    //     },
    //     {
    //       label: "Ver mensajes",
    //       path: "/admin/mensajes/ver",
    //       roles: ["administrador", "vendedor", "gerente"],
    //     },
    //     {
    //       label: "Ver enviados",
    //       path: "/admin/mensajes/enviados",
    //       roles: ["administrador", "vendedor", "gerente"],
    //     },
    //   ],
    //   roles: ["administrador", "vendedor", "gerente"],
    // },
  ];

  const filteredCategories = categories.filter((category) =>
    category.roles.includes(role)
  );

  return (
    <div className="admin-layout">
      <div className="sidebarAdminResponsiva bg-dark">
        <div className="flechaizquierda">
          <FaArrowLeft
            onClick={handleCerrarModalSideBar}
            className="botonflecha"
          />
        </div>
        <div className="text-start px-3">
          <Link
            to="/admin"
            className={`sidebarAdmin__button ${
              location.pathname === "/admin" ? "active" : ""
            }`}
            onClick={() => {
              setActiveCategory(null);
              handleCerrarModalSideBar();
            }}
          >
            <FaHome className="icon me-2" />
            Home
          </Link>

          {filteredCategories.map((category) => (
            <div key={category.label}>
              {category.subCategories.length > 0 ? (
                <div>
                  <a
                    aria-controls={`collapse${category.label}`}
                    aria-expanded={
                      activeCategory === category ? "true" : "false"
                    }
                    data-bs-toggle="collapse"
                    href={`#collapse${category.label}`}
                    role="button"
                    onClick={() =>
                      setActiveCategory(
                        activeCategory === category ? null : category
                      )
                    }
                    className="sidebarAdmin__button d-flex align-items-center justify-content-between"
                  >
                    <div className="d-flex align-items-center">
                      <category.icon className="icon me-2" />
                      <span>{category.label}</span>
                    </div>
                    <FaAngleDown
                      className={`arrow-icon ${
                        activeCategory === category ? "show" : ""
                      }`}
                    />
                  </a>
                  <div
                    className={`collapse ${
                      activeCategory === category ? "show" : ""
                    }`}
                    id={`collapse${category.label}`}
                  >
                    {category.subCategories
                      .filter((subCategory) => subCategory.roles.includes(role))
                      .map((subCategory) => (
                        <Link
                          key={subCategory.label}
                          to={subCategory.path}
                          className={`sidebarAdmin__button ${
                            location.pathname === subCategory.path
                              ? "active"
                              : ""
                          }`}
                          onClick={() => {
                            setActiveCategory(null);
                            handleCerrarModalSideBar();
                          }}
                        >
                          {subCategory.label}
                        </Link>
                      ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={`/admin/${category.label.toLowerCase()}`}
                  className={`sidebarAdmin__button ${
                    location.pathname ===
                    `/admin/${category.label.toLowerCase()}`
                      ? "active"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveCategory(null);
                    handleCerrarModalSideBar();
                  }}
                >
                  <category.icon className="icon me-2" />
                  {category.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBarResponsiva;
