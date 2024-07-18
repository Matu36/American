import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Garantia from "../components/Garantia";
import Contact from "../components/Contact";
import AboutUs from "../components/AboutUs";

export default function HeaderNavBar({
  handleMostrarModalAbout,
  handleMostrarModalGarantia,
  handleMostrarModalContact,
}) {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="headerNaBar">
      <div>
        <button onClick={navigateToHome}>Home</button>
        <button>Equipos</button>
        <button onClick={handleMostrarModalAbout}>Empresa</button>
        <button onClick={handleMostrarModalGarantia}>Garantía</button>
        <button onClick={handleMostrarModalContact}>Contacto</button>
      </div>
    </div>
  );
}
