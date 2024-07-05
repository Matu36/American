import React from "react";
import "../App.css";
import AUTOELEVADOR2 from "../assets/img/FAMILIAS/AUTOELEVADOR2-4.jpg";
import AUTOELEVADOR5 from "../assets/img/FAMILIAS/AUTOELEVADOR5-10.jpg";
import AUTOELEVADOR10 from "../assets/img/FAMILIAS/AUTOELEVADOR10.jpg";
import BOMBAHORMIGON from "../assets/img/FAMILIAS/BOMBAHORMIGON.jpg";

export default function NavBar({ onSelectFamilia }) {
  const handleFamiliaClick = (familia) => {
    onSelectFamilia(familia);
  };

  return (
    <div className="navbar">
      <button
        className="marca"
        onClick={() => handleFamiliaClick("Elevadores")}
      >
        <img src={AUTOELEVADOR5} alt="Elevadores" />
      </button>
      <button className="marca" onClick={() => handleFamiliaClick("Gruas")}>
        <img src={AUTOELEVADOR2} alt="Gruas" />
      </button>
      <button className="marca" onClick={() => handleFamiliaClick("Hollister")}>
        <img src={BOMBAHORMIGON} alt="Hollister" />
      </button>
      <button className="marca" onClick={() => handleFamiliaClick("Calvin")}>
        <img src={AUTOELEVADOR10} alt="Calvin" />
      </button>
    </div>
  );
}
