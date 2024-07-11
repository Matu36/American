import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Layout from "../pages/Layout";
import { useProducto } from "../hooks/useProductos";
import ContactoProducto from "./ContactoProducto";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./Card";
import Spinner from "../UI/Spinner";
import { FaCheck, FaWhatsapp } from "react-icons/fa";

export default function Detalle() {
  const [producto, setProducto] = useState(null);
  const { id } = useParams();
  const cardsContainerRef = useRef(null);
  const carouselRef = useRef(null);
  const [selectedMarca, setSelectedMarca] = useState("");
  const [busquedaActiva, setBusquedaActiva] = useState(false);
  const [contactoProducto, setContactoProducto] = useState(false);

  const { data, isLoading } = useProducto(id).productoQueryById;
  const { data: productos } = useProducto().productosQuery;

  useEffect(() => {
    if (data) {
      setProducto(data);
    }
  }, [data]);

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

  // Dentro del retorno del componente
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

  const {
    familia,
    marca,
    modelo,
    imagen,
    imagen1,
    imagen2,
    imagen3,
    imagen4,
    imagen5,
    imagen6,
    precio,
    codigo,
    potencia,
    cantidadTotal,
    motor,
    capacidadDeCarga,
    capacidadDeBalde,
    Detalles,
  } = producto;

  // Crear un arreglo de imágenes válidas
  const images = [
    imagen,
    imagen1,
    imagen2,
    imagen3,
    imagen4,
    imagen5,
    imagen6,
  ].filter((img) => img);

  const handleMostrarContactoProducto = () => {
    setContactoProducto(true);
  };

  const handleCerrarContactoProducto = () => {
    setContactoProducto(false);
  };

  const detallesArray = Detalles.split("\n");

  return (
    <Layout onSearchByMarca={handleSearchByMarca}>
      <div className="blue-bar">CONSTRUYENDO EL FUTURO</div>

      <div
        ref={carouselRef}
        id="carouselContainer"
        className="DetalleCardContainer"
      >
        <div className="DetalleCard">
          <span className="detalleMarca">
            {marca} {modelo}
          </span>
          <Carousel
            additionalTransfrom={0}
            arrows={false}
            autoPlaySpeed={3000}
            centerMode={false}
            className="custom-carousel"
            containerClass="custom-container"
            dotListClass="custom-dot-list"
            draggable
            focusOnSelect={false}
            infinite
            itemClass="custom-item"
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024,
                },
                items: 1,
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0,
                },
                items: 1,
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464,
                },
                items: 1,
              },
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots
            sliderClass="custom-slider"
            slidesToSlide={1}
            swipeable
            autoPlay={true}
          >
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                className="CarrouselImg"
                alt={`Imagen ${index + 1}`}
              />
            ))}
          </Carousel>

          <hr className="hrPersonalizado" />

          <div className="detalle-info">
            <p>
              <strong>Categoría:</strong> {familia}
            </p>
            <p>
              <strong>Marca:</strong> {marca}
            </p>
            <p>
              <strong>Modelo:</strong> {modelo}
            </p>
            <p>
              <strong>Código:</strong> {codigo}
            </p>
            <p>
              <strong>Potencia:</strong> {potencia}
            </p>

            <p>
              <strong>Motor:</strong> {motor}
            </p>
            <p>
              <strong>Capacidad de Carga:</strong> {capacidadDeCarga}
            </p>
            <p>
              <strong>Capacidad de Balde:</strong> {capacidadDeBalde}
            </p>
            <div>
              <strong className="detalles-titulo">Detalles</strong>
              <div className="detalles-list">
                {detallesArray.map((detalle, index) => (
                  <div key={index} className="detalle-item">
                    <FaCheck className="check-icon" /> {detalle}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="form-actions"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <button
              onClick={handleMostrarContactoProducto}
              className="form-submit-custom"
            >
              Dejá tu consulta por este producto
            </button>
          </div>

          {contactoProducto && (
            <div className="modal">
              <ContactoProducto
                id={id}
                handleCerrarContactoProducto={handleCerrarContactoProducto}
                familia={familia}
                marca={marca}
                modelo={modelo}
              />
            </div>
          )}

          <br />
        </div>
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
      <div className="whatsapp">
        <a
          href="https://wa.me/1159249700"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp size={60} />
        </a>
      </div>
    </Layout>
  );
}
