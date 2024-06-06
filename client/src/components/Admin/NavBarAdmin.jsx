import React, { useState, useEffect } from "react";
import { FaUser, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

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
          <img
            src="https://res.cloudinary.com/dmfzplfra/image/upload/v1711678602/VENICE/LOGO_1-removebg-preview_j1tfcu.png"
            alt="chef"
            className="sidebarAdmin__image"
          />
        </button>
      </div>

      <div className="navbarAdmin__left">
        <h1 className="navbarAdmin__title">Panel de Administrador</h1>
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
