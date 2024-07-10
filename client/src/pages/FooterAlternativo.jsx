import React, { useState } from "react";
import AboutUs from "../components/AboutUs";
import Contact from "../components/Contact";
import MAPS from "../assets/img/MAPS.png";
import { FaXTwitter } from "react-icons/fa6";
import { GrClose } from "react-icons/gr";
import {
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Modal from "react-modal";
import Garantia from "../components/Garantia";
import DatosContacto from "./DatosContacto";

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
      <div></div>
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
            <button onClick={handleMostrarModalContact}>Contacto</button>
          </div>
          <div>
            <button onClick={handleMostrarModalGarantia}>Garantía</button>
          </div>
          <div>
            <button onClick={handleMostrarModalAbout}>Nosotros</button>
          </div>

          <br />
        </div>
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter size={40} color="#1DA1F2" />
          </a>
          <a
            href="https://instagram.com/americanvialgroup"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={40} color="#E4405F" />
          </a>
          <a
            href="https://www.facebook.com/americanvial/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={40} color="#1877F2" />
          </a>
          <a
            href="https://wa.me/1159249700"
            target="_blank"
            rel="noopener noreferrer"
          >
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
                height: "auto",
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
                justifyContent: "center",
                marginTop: "-10px",
                marginBottom: "1rem",
              }}
            >
              <div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="button-cerrar"
                >
                  <GrClose />
                </button>
              </div>
            </div>
            <h4>Ubicación</h4>
            <img
              src={MAPS}
              style={{ height: "250px", width: "400px", marginBottom: "1rem" }}
            />
            <p style={{ fontWeight: "bold", marginTop: "0.5rem" }}>
              Panamericana Km 28.250 – Paris 256 esq. Colectora Este,
            </p>
            <p style={{ fontWeight: "bold" }}>
              (1611) Don Torcuato – Prov. de Buenos Aires – ARGENTINA
            </p>
            <br />
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

      <DatosContacto />

      <div className="copy">
        Copyright © {currentYear} | American Vial Todos los derechos reservados
      </div>
    </div>
  );
}
