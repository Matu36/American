import React, { useState } from "react";
import Distribuidores1 from "../../assets/img/DISTRIBUIDORES/Distribuidores.jpg";
import julio from "../../assets/img/DISTRIBUIDORES/9julio.jpg";
import catamarca from "../../assets/img/DISTRIBUIDORES/catamarca.jpg";
import cordoba from "../../assets/img/DISTRIBUIDORES/cordoba.jpg";
import corrientes from "../../assets/img/DISTRIBUIDORES/corrientes.jpg";
import salta from "../../assets/img/DISTRIBUIDORES/salta.jpg";
import sanluis from "../../assets/img/DISTRIBUIDORES/sanluis.jpg";
import santiago from "../../assets/img/DISTRIBUIDORES/santiago.jpg";
import sanjuan from "../../assets/img/DISTRIBUIDORES/sanjuan.jpg";
import Contact from "../Contact";
import Layout from "../../pages/Layout";

export default function Distribuidores() {
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
          <img src={Distribuidores1} alt="Repuestos" className="large-image" />
          Distribuidores
        </div>

        <div className="grid-imagesdist">
          <img src={julio} alt="Foto 1" className="grid-imagedist" />
          <img src={catamarca} alt="Foto 2" className="grid-imagedist" />
          <img src={cordoba} alt="Foto 3" className="grid-imagedist" />
          <img src={corrientes} alt="Foto 4" className="grid-imagedist" />
          <img src={salta} alt="Foto 5" className="grid-imagedist" />
          <img src={sanluis} alt="Foto 6" className="grid-imagedist" />
          <img src={santiago} alt="Foto 7" className="grid-imagedist" />
          <img src={sanjuan} alt="Foto 8" className="grid-imagedist" />
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