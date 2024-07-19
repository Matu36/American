import React, { useState } from "react";
import Layout from "../../pages/Layout";
import repuestosimage from "../../assets/img/REPUESTOS/repuestos.jpg";
import tinglado from "../../assets/img/REPUESTOS/tinglado.jpg";
import foto1 from "../../assets/img/REPUESTOS/foto1.jpg";
import foto2 from "../../assets/img/REPUESTOS/foto2.jpg";
import foto3 from "../../assets/img/REPUESTOS/foto3.jpg";
import foto4 from "../../assets/img/REPUESTOS/foto4.jpg";
import foto5 from "../../assets/img/REPUESTOS/foto5.jpg";
import foto6 from "../../assets/img/REPUESTOS/foto6.jpg";
import foto7 from "../../assets/img/REPUESTOS/foto7.jpg";
import foto8 from "../../assets/img/REPUESTOS/foto8.jpg";
import foto9 from "../../assets/img/REPUESTOS/foto9.jpg";
import Contact from "../Contact";

export default function AmericanRepuestos() {
  const [contact, setContact] = useState(false);

  const handleMostrarModalContact = () => {
    setContact(true);
  };

  const handleCerrarModalContact = () => {
    setContact(false);
  };
  return (
    <Layout>
      <div className="american-repuestos">
        <div className="large-images">
          <img src={repuestosimage} alt="Repuestos" className="large-image" />
          REPUESTOS Respuestas para su equipo
          <img src={tinglado} alt="Tinglado" className="large-image" />
        </div>
        Equipamiento Integral e Infraestructura para dar respuestas
        satifactorias.
        <div className="grid-images">
          <img src={foto1} alt="Foto 1" className="grid-image" />
          <img src={foto2} alt="Foto 2" className="grid-image" />
          <img src={foto3} alt="Foto 3" className="grid-image" />
          <img src={foto4} alt="Foto 4" className="grid-image" />
          <img src={foto5} alt="Foto 5" className="grid-image" />
          <img src={foto6} alt="Foto 6" className="grid-image" />
          <img src={foto7} alt="Foto 7" className="grid-image" />
          <img src={foto8} alt="Foto 8" className="grid-image" />
          <img src={foto9} alt="Foto 9" className="grid-image" />
        </div>
      </div>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="submit-button" onClick={handleMostrarModalContact}>
          Contacto
        </button>
      </div>

      {contact && (
        <div className="modal">
          <Contact handleCerrarModalContact={handleCerrarModalContact} />
        </div>
      )}
      <br />
    </Layout>
  );
}
