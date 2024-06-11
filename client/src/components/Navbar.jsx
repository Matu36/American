import React from "react";
import "../App.css";
import AUTOELEVADOR2 from "../assets/img/FAMILIAS/AUTOELEVADOR2-4.jpg";
import AUTOELEVADOR5 from "../assets/img/FAMILIAS/AUTOELEVADOR5-10.jpg";
import AUTOELEVADOR10 from "../assets/img/FAMILIAS/AUTOELEVADOR10.jpg";
import BOMBAHORMIGON from "../assets/img/FAMILIAS/BOMBAHORMIGON.jpg";
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
          <img src={AUTOELEVADOR5} alt="" />
        </a>
      </button>
      <button className="marca">
        <a
          href="#cards"
          className="marca"
          onClick={() => handleMarcaClick("Hollister")}
        >
          <img src={BOMBAHORMIGON} alt="" />
        </a>
      </button>
      <button className="marca">
        <a
          href="#cards"
          className="marca"
          onClick={() => handleMarcaClick("Calvin")}
        >
          <img src={AUTOELEVADOR10} alt="" />
        </a>
      </button>

      <button className="marca">
        <a
          href="#cards"
          className="marca"
          onClick={() => handleMarcaClick("Columbia")}
        >
          <img src={BOMBAHORMIGON} alt="" />
        </a>
      </button>
      <button className="marca">
        <a
          href="#cards"
          className="marca"
          onClick={() => handleMarcaClick("Nike")}
        >
          <img src={AUTOELEVADOR2} alt="" />
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
