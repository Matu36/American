import React from "react";
import "../App.css";
import nike from "../assets/img/logos/nike.jpg";
import adidas from "../assets/img/logos/adidas.png";
import calvin from "../assets/img/logos/calvin.jpg";
import columbia from "../assets/img/logos/columbia.png";
import hollister from "../assets/img/logos/hollister.png";
import jordan from "../assets/img/logos/jordanm.jpg";
import timberland from "../assets/img/logos/timberland.png";
import asics from "../assets/img/logos/asics.png";
import reebok from "../assets/img/logos/reebok.png";
import levis from "../assets/img/logos/levis.png";
import puma from "../assets/img/logos/puma.jpg";
import tommy from "../assets/img/logos/tommy.png";
import edicion from "../assets/img/edicionlimitada.jpg";

export default function NavBar({ onSelectMarca, onInicio }) {
  const handleMarcaClick = (marca) => {
    onSelectMarca(marca);
  };

  return (
    <div className="navbar">
      <button className="marca">
        <a
          className="marca"
          onClick={() => handleMarcaClick("Variadas")}
          href="#cards"
        >
          <img src={edicion} alt="" />
        </a>
      </button>
      <button className="marca">
        <a
          href="#cards"
          className="marca"
          onClick={() => handleMarcaClick("Adidas")}
        >
          <img src={adidas} alt="" />
        </a>
      </button>
      <button className="marca">
        <a
          href="#cards"
          className="marca"
          onClick={() => handleMarcaClick("Hollister")}
        >
          <img src={hollister} alt="" />
        </a>
      </button>
      <button className="marca">
        <a
          href="#cards"
          className="marca"
          onClick={() => handleMarcaClick("Calvin")}
        >
          <img src={calvin} alt="" />
        </a>
      </button>

      <button className="marca">
        <a
          href="#cards"
          className="marca"
          onClick={() => handleMarcaClick("Columbia")}
        >
          <img src={columbia} alt="" />
        </a>
      </button>
      <button className="marca">
        <a
          href="#cards"
          className="marca"
          onClick={() => handleMarcaClick("Nike")}
        >
          <img src={nike} alt="" />
        </a>
      </button>

      <button className="marca">
        <a
          href="#cards"
          className="marca"
          onClick={() => handleMarcaClick("Jordan")}
        >
          <img src={jordan} alt="" />
        </a>
      </button>

      <button className="marca">
        <a
          href="#cards"
          className="marca"
          onClick={() => handleMarcaClick("Reebok")}
        >
          <img src={reebok} alt="" />
        </a>
      </button>
      <button className="marca">
        <a
          href="#cards"
          className="marca"
          onClick={() => handleMarcaClick("Asics")}
        >
          <img src={asics} alt="" />
        </a>
      </button>

      <button className="marca">
        <a
          href="#cards"
          className="marca"
          onClick={() => handleMarcaClick("Timberland")}
        >
          <img src={timberland} alt="" />
        </a>
      </button>
      <button className="marca">
        <a
          href="#cards"
          className="marca"
          onClick={() => handleMarcaClick("Levis")}
        >
          <img src={levis} alt="" />
        </a>
      </button>
      <button className="marca">
        <a
          href="#cards"
          className="marca"
          onClick={() => handleMarcaClick("Puma")}
        >
          <img src={puma} alt="" />
        </a>
      </button>
      <button className="marca">
        <a
          href="#cards"
          className="marca"
          onClick={() => handleMarcaClick("Tommy")}
        >
          <img src={tommy} alt="" />
        </a>
      </button>
    </div>
  );
}
