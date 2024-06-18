import React, { useState } from "react";
import mercadoPago from "../assets/img/logos/mercadopago.png";
import AboutUs from "../components/AboutUs";
import Contact from "../components/Contact";

export default function FooterAlternativo() {
  const [contact, setContact] = useState(false);
  const [modal, setModal] = useState(false);

  const handleMostrarModalAbout = () => {
    setModal(true);
  };

  const handleCerrarModalAbout = () => {
    setModal(false);
  };

  const handleMostrarModalContact = () => {
    setContact(true);
  };

  const handleCerrarModalContact = () => {
    setContact(false);
  };

  return (
    <div className="principal-footer">
      <div className="footerAlternativo">
        <div className="faSpan">
          <h2>Contactános</h2>

          <p>
            ¡Gracias por visitar nuestro sitio! Si tienes alguna pregunta o
            comentario, no dudes en ponerte en contacto con nosotros.
          </p>
        </div>

        <div className="footaltbespace">
          {" "}
          <div>
            <button onClick={handleMostrarModalAbout}>Nosotros</button>
          </div>
          <div>
            <button onClick={handleMostrarModalContact}>Contacto</button>
          </div>
        </div>
      </div>

      {contact && (
        <div className="modal">
          {/* <div className="modal-content"> */}
          <Contact handleCerrarModalContact={handleCerrarModalContact} />
          {/* </div> */}
        </div>
      )}
      {modal && (
        <div className="modal">
          {/* <div className="modal-content"> */}
          <AboutUs handleCerrarModalAbout={handleCerrarModalAbout} />
          {/* </div> */}
        </div>
      )}
      <hr style={{ color: "grey", maxWidth: "100%" }} />
      <span className="copy">
        Copyright © 2024 | Venice Indumentaria Todos los derechos reservados
      </span>
    </div>
  );
}
