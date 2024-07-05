import React from "react";
import "../App.css";
import AUTOELEVADOR2 from "../assets/img/FAMILIAS/AUTOELEVADOR2-4.jpg";
import AUTOELEVADOR5 from "../assets/img/FAMILIAS/AUTOELEVADOR5-10.jpg";
import AUTOELEVADOR10 from "../assets/img/FAMILIAS/AUTOELEVADOR10.jpg";
import BOMBAHORMIGON from "../assets/img/FAMILIAS/BOMBAHORMIGON.jpg";

export default function NavBar({ onSelectMarca, onInicio }) {
  const handleMarcaClick = (marca) => {
    onSelectMarca(marca);
  };

  return (
    <div className="navbar">
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
          onClick={() => handleMarcaClick("Gruas")}
        >
          <img src={AUTOELEVADOR2} alt="" />
        </a>
      </button>
    </div>
  );
}
