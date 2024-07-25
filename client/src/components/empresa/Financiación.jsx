import React, { useState, useEffect, useRef } from "react";
import FinanciacionImg from "../../assets/img/FINANCIACION/FINANCIACION.png";
import PagoCuotas from "../../assets/img/FINANCIACION/cuotas.jpeg";
import Tarjeta from "../../assets/img/FINANCIACION/Tarjeta_de_Credito.jpg";
import Layout from "../../pages/Layout";
import Card from "../Card";
import Spinner from "../../UI/Spinner";
import { useProducto } from "../../hooks/useProductos";
import Contact from "../Contact";

export default function Financiación() {
  const [producto, setProducto] = useState([]);
  const cardsContainerRef = useRef(null);
  const carouselRef = useRef(null);
  const [busquedaActiva, setBusquedaActiva] = useState(false);
  const [selectedMarca, setSelectedMarca] = useState(null);
  const [contact, setContact] = useState(false);

  const handleMostrarModalContact = () => {
    setContact(true);
  };

  const handleCerrarModalContact = () => {
    setContact(false);
  };

  const { data: productos, isLoading } = useProducto(
    null,
    selectedMarca
  ).productoQueryByFamilia;

  useEffect(() => {
    if (productos) {
      setProducto(productos);
    }
  }, [productos]);

  const handleSearchByMarca = (familia) => {
    const marcaNormalized =
      familia.charAt(0).toUpperCase() + familia.slice(1).toLowerCase();
    setSelectedMarca(marcaNormalized);
    setBusquedaActiva(true);
  };

  const handleFamiliaClick = (familia) => {
    const familiaNormalized =
      familia.charAt(0).toUpperCase() + familia.slice(1).toLowerCase();
    setSelectedMarca(familiaNormalized);
    setBusquedaActiva(true);
  };

  useEffect(() => {
    if (busquedaActiva && cardsContainerRef.current) {
      const firstCard = cardsContainerRef.current.querySelector(".card");
      if (firstCard) {
        firstCard.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [busquedaActiva, productos]);

  useEffect(() => {
    if (busquedaActiva && carouselRef.current) {
      carouselRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [busquedaActiva, productos]);

  const scrollToCarousel = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <Layout
      onSearchByMarca={handleSearchByMarca}
      onSelectFamilia={handleFamiliaClick}
    >
      <div className="postVentaContainer">
        <img
          src={FinanciacionImg}
          alt="Financiación"
          className="large-images"
        />
        <br />
        <h3>
          {" "}
          Contamos con la más amplia gama de financiación para usted y su{" "}
        </h3>
        <h3>
          empresa. Adquiera su equipamiento con confianza y seguridad, a su
        </h3>
        <h3>medida.</h3>

        <img src={PagoCuotas} alt="Pago Cuotas" className="postVentImage" />
        <br />

        <h4>
          {" "}
          En <strong>American Vial</strong>, entendemos la importancia de contar
        </h4>
        <h4>
          {" "}
          con el equipo adecuado para llevar tu negocio al siguiente nivel. Es
        </h4>
        <h4>
          {" "}
          por eso que ofrecemos opciones de financiamiento flexibles diseñadas
        </h4>
        <h4>para adaptarse a tus necesidades.</h4>
        <br />
        <h2
          style={{
            textDecoration: "underline",
            textDecorationColor: "#ffc107",
            textUnderlineOffset: "4px",
          }}
        >
          <strong>¿Por qué financiar con nosotros?</strong>
        </h2>

        <br />
        <ul className="financiarList">
          <li>Planes de pago personalizados para tu conveniencia.</li>
          <li>Intereses competitivos que se ajustan a tu presupuesto.</li>
          <li>
            Asesoría financiera profesional para ayudarte a tomar la mejor
            decisión.
          </li>
          <li>Proceso de aplicación simple y rápido.</li>
        </ul>
        <div className="postVentaFooter">
          <p className="financiarText" style={{ color: "black" }}>
            No dejes que el costo inicial te impida obtener el equipo que
            necesitas. Nuestra misión es apoyarte para que puedas crecer y
            alcanzar tus objetivos comerciales.
          </p>
          <p className="financiarText" style={{ color: "black" }}>
            <strong>¡Contacta con nosotros hoy mismo!</strong> Estamos aquí para
            ayudarte a explorar las opciones de financiamiento que mejor se
            adapten a tu situación. Juntos, podemos encontrar la solución
            perfecta para tus necesidades empresariales.
          </p>
        </div>
        {selectedMarca && (
          <div ref={cardsContainerRef} className="cards-container">
            {productos && productos.length > 0
              ? productos.map((maquina) => (
                  <Card
                    key={maquina.id}
                    {...maquina}
                    scrollToCarousel={scrollToCarousel}
                  />
                ))
              : !isLoading && <p>No se encontraron productos.</p>}
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="submit-button" onClick={handleMostrarModalContact}>
            Contacto
          </button>
        </div>
      </div>
      {contact && (
        <div className="modal">
          <Contact handleCerrarModalContact={handleCerrarModalContact} />
        </div>
      )}
    </Layout>
  );
}
