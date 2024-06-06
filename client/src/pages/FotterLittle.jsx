import React from "react";
import osito from "../assets/img/LITTLE VENICE/Designer (2).jpeg";

export default function FooterLittle({
  handleMostrarModalAbout,
  handleMostrarModalContact,
}) {
  return (
    <div className="footer">
      <div className="footerSpan">
        <span className="spantitle">Colección</span>
        <button className="spanbody">Camisas</button>
        <button className="spanbody">Remeras</button>
      </div>
      <div className="footerSpan">
        <span className="spantitle">Atención al cliente</span>
        <button onClick={handleMostrarModalContact} className="spanbody">
          Contacto
        </button>
      </div>
      <div className="footerSpan">
        <span className="spantitle">Institucional</span>
        <button onClick={handleMostrarModalAbout} className="spanbody">
          Sobre Nosotros
        </button>
      </div>
      <img src={osito} className="footerImage" />
    </div>
  );
}
