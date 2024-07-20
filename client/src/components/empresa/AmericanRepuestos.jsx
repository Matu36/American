import React, { useState, useRef, useEffect } from "react";
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
import Card from "../Card";
import { useProducto } from "../../hooks/useProductos";
import Spinner from "../../UI/Spinner";

export default function AmericanRepuestos() {
  const [contact, setContact] = useState(false);
  const [producto, setProducto] = useState(null);
  const [selectedFamilia, setSelectedFamilia] = useState(null);
  const cardsContainerRef = useRef(null);
  const [busquedaActiva, setBusquedaActiva] = useState(false);
  const { data: productos, isLoading } = useProducto().productosQuery;

  useEffect(() => {
    if (productos) {
      setProducto(productos);
    }
  }, [productos]);

  const handleSearchByMarca = (familia) => {
    const marcaNormalized =
      familia.charAt(0).toUpperCase() + familia.slice(1).toLowerCase();
    setSelectedFamilia(marcaNormalized);
    setBusquedaActiva(true);

    setTimeout(() => {
      const firstCard = cardsContainerRef.current.querySelector(".card");
      if (firstCard) {
        firstCard.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 0);
  };

  const handleMostrarModalContact = () => {
    setContact(true);
  };

  const handleCerrarModalContact = () => {
    setContact(false);
  };

  const handleFamiliaClick = (familia) => {
    setSelectedFamilia(familia);
    scrollToFirstCard();
  };

  const scrollToFirstCard = () => {
    setTimeout(() => {
      const firstCard = cardsContainerRef.current.querySelector(".card");
      if (firstCard) {
        firstCard.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 0);
  };

  const productosFiltrados = selectedFamilia
    ? productos?.filter((producto) => producto.familia === selectedFamilia)
    : [];

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
      onSelectFamilia={handleFamiliaClick}
      onSearchByMarca={handleSearchByMarca}
    >
      <div className="american-repuestos">
        <div className="large-images">
          <img src={repuestosimage} alt="Repuestos" className="large-image" />
          REPUESTOS Respuestas para su equipo
          <img src={tinglado} alt="Tinglado" className="large-image" />
        </div>
        Equipamiento Integral e Infraestructura para dar respuestas
        satisfactorias.
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
      {selectedFamilia && (
        <div ref={cardsContainerRef} className="cards-container">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <Card key={producto.id} {...producto} />
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      )}
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
