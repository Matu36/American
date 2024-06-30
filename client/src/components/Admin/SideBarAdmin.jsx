import React, { useState, useEffect } from "react";
import { useUsuario } from "../../hooks/useUsuarios";
import useAuth from "../../hooks/useAuth";

import { Link, useLocation } from "react-router-dom";
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
} from "react-icons/fa";
import { MdPerson, MdMail } from "react-icons/md";

const SideBarAdmin = () => {
  const { auth } = useAuth();
  const idUsuario = auth?.id;

  const { mutate: checkRol } = useUsuario().CheckRolMutation;

  const handleCheckRol = () => {
    checkRol({ idUsuario: idUsuario });
  };

  useEffect(() => {
    handleCheckRol();
  }, [idUsuario]);

  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    { label: "Usuarios", icon: MdPerson, subCategories: [] },
    {
      label: "Clientes",
      icon: FaUsers,
      subCategories: [
        { label: "Cargar clientes", path: "/admin/clientes/cargar" },
        { label: "Ver clientes", path: "/admin/clientes/ver" },
      ],
    },
    {
      label: "Productos",
      icon: FaBox,
      subCategories: [
        { label: "Cargar productos", path: "/admin/productos/cargar" },
        { label: "Ver productos", path: "/admin/productos/ver" },
      ],
    },
    {
      label: "Cotizaciones",
      icon: FaFileInvoiceDollar,
      subCategories: [
        { label: "Crear Cotizacion", path: "/admin/cotizaciones/crear" },
        { label: "Ver Cotizaciones", path: "/admin/cotizaciones/ver" },
        {
          label: "Historial Cotizaciones",
          path: "/admin/cotizaciones/historial",
        },
      ],
    },
    { label: "Ventas", icon: FaShoppingCart, subCategories: [] },
    { label: "Garantia", icon: FaShieldAlt, subCategories: [] },
    { label: "Contacto", icon: FaPhone, subCategories: [] },
    { label: "ContactoProducto", icon: FaPercentage, subCategories: [] },
    {
      label: "Mensajes",
      icon: MdMail,
      subCategories: [
        { label: "Nuevo Correo", path: "/admin/mensajes/nuevo" },
        { label: "Ver mensajes", path: "/admin/mensajes/ver" },
        { label: "Ver enviados", path: "/admin/mensajes/enviados" },
      ],
    },
  ];

  return (
    <div className="sidebarAdmin bg-dark">
      <div className="text-start px-3">
        <Link
          to="/admin"
          className={`sidebarAdmin__button ${
            location.pathname === "/admin" ? "active" : ""
          }`}
        >
          <FaHome className="icon me-2" />
          Home
        </Link>

        {categories.map((category) => (
          <div key={category.label}>
            {category.subCategories.length > 0 ? (
              <div>
                <a
                  aria-controls={`collapse${category.label}`}
                  aria-expanded={activeCategory === category ? "true" : "false"}
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
                  {category.subCategories.map((subCategory) => (
                    <Link
                      key={subCategory.label}
                      to={subCategory.path}
                      className={`sidebarAdmin__button ${
                        location.pathname === subCategory.path ? "active" : ""
                      }`}
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
                  location.pathname === `/admin/${category.label.toLowerCase()}`
                    ? "active"
                    : ""
                }`}
                onClick={() => setActiveCategory(null)}
              >
                <category.icon className="icon me-2" />
                {category.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBarAdmin;
