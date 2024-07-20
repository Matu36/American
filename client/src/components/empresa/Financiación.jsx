import React, { useState, useEffect, useRef } from "react";
import FinanciacionImg from "../../assets/img/FINANCIACION/Financiacion.jpg";
import PagoCuotas from "../../assets/img/FINANCIACION/Pago_cuotas.png";
import Tarjeta from "../../assets/img/FINANCIACION/Tarjeta_de_Credito.jpg";
import Layout from "../../pages/Layout";
import Card from "../Card";
import Spinner from "../../UI/Spinner";
import { useProducto } from "../../hooks/useProductos";
import Contact from "../Contact";

export default function Financiación() {
  const [producto, setProducto] = useState(null);
  const cardsContainerRef = useRef(null);
  const carouselRef = useRef(null);
  const [busquedaActiva, setBusquedaActiva] = useState(false);
  const [selectedMarca, setSelectedMarca] = useState("");
  const [contact, setContact] = useState(false);

  const handleMostrarModalContact = () => {
    setContact(true);
  };

  const handleCerrarModalContact = () => {
    setContact(false);
  };

  const { data: productos, isLoading } = useProducto().productosQuery;

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
  }, [busquedaActiva, selectedMarca]);

  useEffect(() => {
    if (busquedaActiva && carouselRef.current) {
      carouselRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [busquedaActiva]);

  const filteredProductos = productos?.filter((producto) =>
    producto.familia.toLowerCase().includes(selectedMarca.toLowerCase())
  );

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

  if (!producto) {
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
          className="postVentImage"
        />
        <h1 className="postVentTitle">FINANCIACION</h1>
        <p className="postVentText">
          Contamos con la más amplia gama de financiación para usted y su
          empresa. Adquiera su equipamiento con confianza y seguridad, a su
          medida.
        </p>
        <img src={PagoCuotas} alt="Pago Cuotas" className="postVentImage" />
        <img src={Tarjeta} alt="Tarjeta de Crédito" className="postVentImage" />
        {busquedaActiva && (
          <div ref={cardsContainerRef} className="cards-container">
            {filteredProductos.length > 0 ? (
              filteredProductos.map((maquina) => (
                <Card
                  key={maquina.id}
                  {...maquina}
                  scrollToCarousel={scrollToCarousel}
                />
              ))
            ) : (
              <p>No se encontraron productos.</p>
            )}
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
