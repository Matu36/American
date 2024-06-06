import React, { useState, useEffect } from "react";
import CardAmpliada from "./CardAmpliada";
import soldout from "../assets/img/soldOut.png";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { FaSearch } from "react-icons/fa";

const Card = ({
  id,
  marca,
  nombre,
  talle,
  precio,
  imagen,
  cantidadTotal,
  imagen1,
  codigo,
  actualizarContadorCarrito,
  scrollToCarousel,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [currentImage, setCurrentImage] = useState(imagen);
  const [showModal, setShowModal] = useState(false);
  const [selectedTalles, setSelectedTalles] = useState([]);

  const handleTalleChange = (talle) => {
    if (selectedTalles.includes(talle)) {
      setSelectedTalles(selectedTalles.filter((item) => item !== talle));
    } else {
      setSelectedTalles([...selectedTalles, talle]);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (showAlert) {
      actualizarContadorCarrito();

      const timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [showAlert, actualizarContadorCarrito]);

  const handleDetalleClick = () => {
    navigate(`/productos/${id}`);
  };

  const handleImageClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleMouseOver = () => {
    setCurrentImage(imagen1);
  };

  const handleMouseOut = () => {
    setCurrentImage(imagen);
  };

  const handleTouchStart = () => {
    setCurrentImage(imagen1);
  };

  const handleTouchEnd = () => {
    setCurrentImage(imagen);
  };

  const handleComprarClick = () => {
    const productoComprado = {
      id,
      marca,
      nombre,
      talle: selectedTalles.join(", "),
      precio,
      imagen,
      codigo,
    };

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.push(productoComprado);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    setShowAlert(true);

    actualizarContadorCarrito();
  };

  return (
    <div
      className="card"
      id={id}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {showModal && (
        <div className="modal1">
          <div className="modal-content1">
            <CardAmpliada
              talle={talle}
              precio={precio}
              imagen={imagen}
              imagen1={imagen1}
              cantidadTotal={cantidadTotal}
              onClose={closeModal}
            />
          </div>
        </div>
      )}
      <div className="image-container">
        <img
          src={currentImage}
          alt=""
          className="card-image"
          onClick={handleImageClick}
        />
        <button
          className="verdetalle"
          onClick={() => {
            handleDetalleClick();
            scrollToCarousel();
          }}
        >
          <FaSearch className="lupa" />
          Detalle
        </button>
      </div>
      <div className="card-content">
        <p style={{ fontSize: "14px" }}>{marca ? marca : null} </p>
        <p>{nombre ? nombre : null} </p>
        <p>
          Talles:
          {talle
            ?.split(", ")
            .map((item) => item.split(":"))
            .filter(([index, cantidad]) => parseInt(cantidad) > 0)
            .map(([talle, index]) => (
              <label key={index}>
                <input
                  type="checkbox"
                  value={talle}
                  checked={selectedTalles.includes(talle)}
                  onChange={() => handleTalleChange(talle)}
                />
                {talle}
              </label>
            ))}
        </p>

        <p style={{ fontSize: "14px" }}>$ {precio.toLocaleString()}</p>
        <p style={{ color: "grey", fontSize: "10px", marginTop: "10px" }}>
          Código: {codigo}
        </p>

        {cantidadTotal === 0 && (
          <div className="soldOut-container">
            {" "}
            <span className="soldOut">SIN STOCK</span>
          </div>
        )}
      </div>

      <br />
      <div>
        <button
          className={`comprar ${cantidadTotal === 0 ? "sin-stock" : "comprar"}`}
          onClick={handleComprarClick}
          disabled={cantidadTotal === 0}
        >
          Añadir al Carrito
        </button>
      </div>
      {showAlert && (
        <div className="alert-container">
          <div className="alert-message">
            El producto ha sido añadido al carrito
          </div>
        </div>
      )}
    </div>
  );
};
export default Card;
