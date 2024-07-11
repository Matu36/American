import React, { useState, useEffect } from "react";
import { FaUser, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/img/logoAmerican.png";
import { useMensajes } from "../../hooks/useMensajes";
import gruagif from "../../assets/img/GRUAGIF1.gif";
import { FaBars } from "react-icons/fa";
import SideBarAdmin from "./SideBarAdmin";

export default function NavBarAdmin({ isOpen, onClose, onOpen }) {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const idUsuario = auth?.id;
  const { data } = useMensajes(idUsuario).MensajesCountQuery;

  const handleButtonClick = () => {
    navigate("/");
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="navbarAdmin">
      <img src={gruagif} alt="" style={{ width: "170px", height: "140px" }} />

      <button
        onClick={onOpen}
        className="burguer"
        style={{
          position: "absolute",
          left: "10px",
          top: "100px",
          background: "none",
          display: window.innerWidth >= 600 ? "none" : "block",
        }}
      >
        <FaBars className="burguer-icon" />
      </button>

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
    </nav>
  );
}
