import React, { useState } from "react";
import AboutUs from "../components/AboutUs";
import Contact from "../components/Contact";
import {
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function FooterAlternativo() {
  const [contact, setContact] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const currentYear = new Date().getFullYear();

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
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={40} color="#1DA1F2" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={40} color="#E4405F" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={40} color="#1877F2" />
          </a>
          <a href="https://wa.me" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp size={40} color="#25D366" />
          </a>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
            }}
            onClick={openModal}
          >
            <FaMapMarkerAlt size={40} color="#FF0000" />
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Location Modal"
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.75)",
                zIndex: 1000, // Asegurarse de que el overlay esté por encima de otros elementos
              },
              content: {
                color: "black",
                maxWidth: "500px",
                width: "80%",
                margin: "auto",
                padding: "20px",
                borderRadius: "8px",
                textAlign: "center",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1001, // Asegurarse de que el contenido esté por encima del overlay
              },
            }}
          >
            <h2>Ubicación</h2>
            <p>Panamericana Km 28.250 – Paris 256 esq. Colectora Este,</p>
            <p>(1611) Don Torcuato – Prov. de Buenos Aires – ARGENTINA</p>
            <button
              onClick={closeModal}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#FF0000",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </Modal>
        </div>
      </div>
      {contact && (
        <div className="modal">
          <Contact handleCerrarModalContact={handleCerrarModalContact} />
        </div>
      )}
      {modal && (
        <div className="modal">
          <AboutUs handleCerrarModalAbout={handleCerrarModalAbout} />
        </div>
      )}

      <div className="copy">
        Copyright © {currentYear} | American Vial Todos los derechos reservados
      </div>
    </div>
  );
}
