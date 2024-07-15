import React, { useState, useEffect } from "react";
import { FaUser, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/img/logoAmerican.png";
import { useMensajes } from "../../hooks/useMensajes";
import gruagif from "../../assets/img/GRUAGIF1.gif";
import { FaBars } from "react-icons/fa";
import SideBarResponsiva from "./SideBarResponsiva";

export default function NavBarAdmin() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const idUsuario = auth?.id;
  const { data } = useMensajes(idUsuario).MensajesCountQuery;
  const [sidebar, setSideBar] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMostrarModalSideBar = () => {
    setIsHovered(true);
    setSideBar(true);
  };

  const handleCerrarModalSideBar = () => {
    setSideBar(false);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleButtonClick = () => {
    navigate("/");
  };

  return (
    <nav className="navbarAdmin">
      <div className="grua-container">
        <img src={gruagif} alt="" className="grua-img" />
      </div>

      <div className="sidebarAdmin__header">
        {sidebar && (
          <div className="sidebarAdminResponsivo">
            <SideBarResponsiva
              handleCerrarModalSideBar={handleCerrarModalSideBar}
            />
          </div>
        )}
        <button onClick={handleButtonClick} className="topadmin__button">
          <img src={logo} alt="chef" className="sidebarAdmin__image" />
          <div>
            <h1 className="navbarAdmin__title">Panel de Administrador</h1>
          </div>
        </button>
      </div>
      <div className="user__info">
        {auth.nombre} {auth.apellido}
        <button
          className="navbarAdmin__icon-button"
          onClick={() => {
            alert(`Tiene ${data?.count} mensajes sin leer.`);
          }}
        >
          <FaBell className="navbarAdmin__icon" />
          {data?.count > 0 && (
            <span className="navbarAdmin__badge">{data?.count}</span>
          )}
        </button>
        {!sidebar && (
          <button
            onClick={handleMostrarModalSideBar}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMostrarModalSideBar}
            className="burguer"
            style={{
              fontSize: "25px",
              position: "absolute",
              right: "0px",
              top: "85px",
              background: "none",
            }}
          >
            <FaBars className="burguer-icon" />
          </button>
        )}
      </div>
    </nav>
  );
}
