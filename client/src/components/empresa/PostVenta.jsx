import React, { useState, useEffect } from "react";
import camioneta from "../../assets/img/POSTVENTA/camioneta.jpg";
import garantia from "../../assets/img/POSTVENTA/garantia.png";
import postventa from "../../assets/img/POSTVENTA/postventa.jpg";
import Layout from "../../pages/Layout";
import { useRef } from "react";
import Card from "../Card";
import Spinner from "../../UI/Spinner";
import { useProducto } from "../../hooks/useProductos";

export default function PostVenta() {
  const [producto, setProducto] = useState(null);
  const cardsContainerRef = useRef(null);
  const carouselRef = useRef(null);
  const [busquedaActiva, setBusquedaActiva] = useState(false);
  const [selectedMarca, setSelectedMarca] = useState("");

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

    setTimeout(() => {
      const firstCard = cardsContainerRef.current.querySelector(".card");
      if (firstCard) {
        firstCard.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 0);
  };

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
    <Layout onSearchByMarca={handleSearchByMarca}>
      <div className="postVentaContainer">
        <img src={postventa} alt="PostVenta" className="large-images" />
        <h1 className="postVentaTitle">POSTVENTA</h1>
        <p className="postVentaText">
          Contamos con más de 15 años de respaldo en el Servicio de PostVenta.
        </p>
        <img src={camioneta} alt="Camioneta" className="large-images" />
        <h2 className="postVentaSubtitle">
          Por qué hacer su servicio de PostVenta con nosotros?
        </h2>
        <ul className="postVentaList">
          <li>Porque mantiene la vigencia de su garantía.</li>
          <li>Porque extiende la vida útil de su equipo nuevo.</li>
          <li>
            Porque obtiene descuentos en la compra de repuestos en todo el país.
          </li>
          <li>
            Porque su equipo es trabajado por un equipo técnico especializado.
          </li>
          <li>
            Porque contamos con una flota de Servicio técnico distribuida en los
            puntos estratégicos de todo el país.
          </li>
        </ul>
        <img src={garantia} alt="Garantía" style={{ width: "20%" }} />
        <div className="postVentaFooter">
          <h3>LLEVAMOS MAS DE 10000 MAQUINAS VENDIDAS</h3>
          <h3>CON MAS DE 25 MILLONES DE HORAS DE USO,</h3>
          <h3>QUE NOS DAN EL AVAL Y PRESTIGIO</h3>
          <h3>A NUESTRA MARCA AMERICAN VIAL.</h3>
          <p>Buscamos la Excelencia de Servicio</p>
        </div>
        {busquedaActiva && (
          <div ref={cardsContainerRef} className="cards-container" id="card">
            {filteredProductos.length > 0 ? (
              filteredProductos.map((maquina) => (
                <Card
                  id="cards"
                  key={maquina.id}
                  {...maquina}
                  scrollToCarousel={scrollToCarousel}
                />
              ))
            ) : (
              <p></p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}