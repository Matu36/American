import React from "react";
import about from "../assets/img/about.png";
import { FaTimes } from "react-icons/fa";

export default function AboutUs({ handleCerrarModalAbout }) {
  return (
    <div className="contact-container">
      <div className="about-button">
        <button onClick={handleCerrarModalAbout} className="button-cerrar">
          <FaTimes />
        </button>
      </div>
      <img src={about} alt="" className="about-image" />

      <div className="contact-content">
        <h4 style={{ fontFamily: "merri" }}>Sobre Nosotros</h4>
        <span>
          Con mas 10 años de trayectoria, American vial es una empresa dedicada
          a prestar servicios de alquiler y venta de maquinaria para la
          construcción. En la actualidad American Vial es un referente
          indiscutido en el segmento de maquinas viales de origen Asia & Brasil.
        </span>
      </div>
    </div>
  );
}
