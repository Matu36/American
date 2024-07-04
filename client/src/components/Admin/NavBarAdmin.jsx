import React, { useState, useEffect } from "react";
import { FaUser, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/img/logoAmerican.png";
import { useMensajes } from "../../hooks/useMensajes";
import gruagif from "../../assets/img/GRUAGIF1.gif";

export default function NavBarAdmin() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const idUsuario = auth?.id;
  const { data } = useMensajes(idUsuario).MensajesCountQuery;

  const handleButtonClick = () => {
    navigate("/");
  };

  return (
    <nav className="navbarAdmin">
      <div className="sidebarAdmin__header">
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
      </div>

      <img
        src={gruagif}
        alt=""
        style={{ width: "170px", height: "140px", marginRight: "1rem" }}
      />
    </nav>
  );
}
