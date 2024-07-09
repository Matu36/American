import React, { useState } from "react";
import AboutUs from "../components/AboutUs";
import Contact from "../components/Contact";
import MAPS from "../assets/img/MAPS.png";
import { FaXTwitter } from "react-icons/fa6";
import {
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Modal from "react-modal";
import Garantia from "../components/Garantia";

Modal.setAppElement("#root");

export default function FooterAlternativo() {
  const [contact, setContact] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [garantia, setGarantia] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const currentYear = new Date().getFullYear();

  const handleMostrarModalGarantia = () => {
    setGarantia(true);
  };

  const handleCerrarModalGarantia = () => {
    setGarantia(false);
  };

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
        <br />
        <div className="footaltbespace">
          <div>
            <button onClick={handleMostrarModalGarantia}>Garantía</button>
          </div>
          <div>
            <button onClick={handleMostrarModalAbout}>Nosotros</button>
          </div>
          <div>
            <button onClick={handleMostrarModalContact}>Contacto</button>
          </div>
          <br />
          <br />
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter size={40} color="#1DA1F2" />
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
            className="contact-container"
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.75)",
                zIndex: 1000,
              },
              content: {
                color: "black",
                maxWidth: "700px",
                height: "400px",
                width: "80%",
                margin: "auto",
                padding: "20px",
                borderRadius: "8px",
                textAlign: "center",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1001,
              },
            }}
          >
            <div
              className="form-actions"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "-10px",
              }}
            >
              <button onClick={closeModal} className="submit-button">
                Cerrar
              </button>
            </div>
            <img src={MAPS} style={{ height: "250px", width: "400px" }} />
            <p style={{ fontWeight: "bold", marginTop: "0.5rem" }}>
              Panamericana Km 28.250 – Paris 256 esq. Colectora Este,
            </p>
            <p style={{ fontWeight: "bold" }}>
              (1611) Don Torcuato – Prov. de Buenos Aires – ARGENTINA
            </p>
          </Modal>
        </div>
      </div>
      {garantia && (
        <div className="modal">
          <Garantia handleCerrarModalGarantia={handleCerrarModalGarantia} />
        </div>
      )}
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
