import React, { useState, useEffect } from "react";
import { FaUser, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/img/logoAmerican.png";

export default function NavBarAdmin() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const handleButtonClick = () => {
    navigate("/");
  };

  return (
    <nav className="navbarAdmin">
      <div className="sidebarAdmin__header">
        <button onClick={handleButtonClick} className="topadmin__button">
          <img src={logo} alt="chef" className="sidebarAdmin__image" />
          <h1 className="navbarAdmin__title">Panel de Administrador</h1>
        </button>
      </div>
      <div className="navbarAdmin__right">
        <div className="navbarAdmin__menu"></div>
        <div className="navbarAdmin__icons">
          <button className="navbarAdmin__icon-button">
            <FaUser className="navbarAdmin__icon" />
          </button>
          <div>
            <span>{auth.nombre}</span>
            <span>{auth.apellido}</span>
          </div>
          <button
            className="navbarAdmin__icon-button"
            // onClick={() => {
            //   alert(`Tiene ${mensajeNoLeido} mensajes sin leer.`);
            // }}
          >
            <FaBell className="navbarAdmin__icon" />
            {/* {mensajeNoLeido > 0 && (
              <span className="navbarAdmin__badge">{mensajeNoLeido}</span>
            )} */}
          </button>
        </div>
      </div>
    </nav>
  );
}
