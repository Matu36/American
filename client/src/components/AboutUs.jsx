import React from "react";
import { GrClose } from "react-icons/gr";

export default function AboutUs({ handleCerrarModalAbout }) {
  return (
    <div className="about-container">
      {/* <img sr alt="" className="about-image" /> */}

      <div className="about-content">
        <h2>Sobre Nosotros</h2>
        <span>
          En Venice Indumentaria, nos destacamos por apostar a la originalidad
          en la moda. Nos especializamos en la importación y venta de ropa de
          marcas reconocidas con un fuerte enfoque en el estilo urbano. Nuestra
          misión es ofrecerte prendas auténticas que reflejen tu individualidad
          y te hagan destacar en cualquier entorno urbano. ¡Descubre tu estilo
          único con Venice Indumentaria!
        </span>
      </div>
      <div className="about-button">
        <button onClick={handleCerrarModalAbout} className="button-cerrar">
          <GrClose />
        </button>
      </div>
    </div>
  );
}
