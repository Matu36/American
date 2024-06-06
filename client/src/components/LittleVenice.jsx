import { useState, useEffect } from "react";
import NavBar from "./Navbar";
import Contact from "./Contact";
import { camisas } from "../utils/Camisas";
import Card from "./Card";
import FooterLittle from "../pages/FotterLittle";
import VENICE from "../assets/img/LITTLE VENICE/osito2.jpg";
import SliderModelsLittleVenice from "./SliderModelsLittleVenice";
import AboutUs from "./AboutUs";
import CarritoModal from "./CarritoModal";
import { FiShoppingCart } from "react-icons/fi";
import VENICEEXPERIENCE from "../assets/img/LITTLE VENICE/Designer (4).jpeg";
import Toper from "../pages/Toper";

export default function LittleVenice() {
  const [selectedMarca, setSelectedMarca] = useState();
  const [modal, setModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modalCarrito, setModalCarrito] = useState(false);
  const [carritoC, setCarritoC] = useState(0);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const filteredCamisas =
    selectedMarca === "Todas las marcas"
      ? camisas
      : camisas.filter((c) => c.marca === selectedMarca);

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const carritoCount = carrito.length;

  const actualizarContadorCarrito = () => {
    const carritoActualizado =
      JSON.parse(localStorage.getItem("carrito")) || [];
    const count = carritoActualizado.length;
    setCarritoC(count);
  };

  const handleMostrarModalCarrito = () => {
    setModalCarrito(true);
    actualizarContadorCarrito();
  };

  const handleCerrarModalCarrito = () => {
    setModalCarrito(false);
    actualizarContadorCarrito();
  };

  const handleInicioClick = () => {
    setSelectedMarca(null);
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

  useEffect(() => {
    actualizarContadorCarrito();
  }, []);

  return (
    <div className={`container ${scrolled ? "scrolled" : ""}`}>
      {modalCarrito && (
        <div>
          <CarritoModal
            handleCerrarModalCarrito={handleCerrarModalCarrito}
            actualizarContadorCarrito={actualizarContadorCarrito}
          />
        </div>
      )}

      <button className="shoppingButton" onClick={handleMostrarModalCarrito}>
        <FiShoppingCart />
        {carritoC > 0 && <span className="badge">{carritoC}</span>}
      </button>
      <Toper />
      <div className="eleganzaImgContainer">
        <img src={VENICE} alt="VENICE" />
      </div>
      <div className="eleganzaContainer">
        <div className="navBarDiv">
          <NavBar
            onSelectMarca={setSelectedMarca}
            onInicio={handleInicioClick}
          />
        </div>
      </div>
      <div className="cards-container" id="cards">
        {filteredCamisas.map((camisa) => (
          <Card
            key={camisa.id}
            {...camisa}
            actualizarContadorCarrito={actualizarContadorCarrito}
          />
        ))}
      </div>
      <div className="sliderContainer">
        <SliderModelsLittleVenice />
      </div>
      <br />
      <br />

      <div className="frase">California dreaming, California dressing</div>
      <div className="camisasContainer">
        <img src={VENICEEXPERIENCE} alt="camisas" className="camisasImg" />
      </div>

      <FooterLittle
        handleMostrarModalAbout={handleMostrarModalAbout}
        handleMostrarModalContact={handleMostrarModalContact}
      />
      <br />
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

      <span className="copy">
        Copyright © 2024 | Venice Indumentaria Todos los derechos reservados
      </span>
    </div>
  );
}
