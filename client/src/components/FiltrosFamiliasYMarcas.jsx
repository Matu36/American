import React from "react";

export default function FiltrosFamiliasYMarcas({ onSelectFamilia }) {
  const handleFamiliaClick = (familia) => {
    onSelectFamilia(familia);
  };

  return (
    <div className="dropdownEquipos">
      <button onClick={() => handleFamiliaClick("AUTOELEVADOR2-4")}>
        <span>AUTOELEVADOR2-4</span>
      </button>
      <button onClick={() => handleFamiliaClick("AUTOELEVADOR5-10")}>
        <span>AUTOELEVADOR5-10</span>
      </button>
      <button onClick={() => handleFamiliaClick("AUTOELEVADOR10")}>
        <span>AUTOELEVADOR10</span>
      </button>
      <button onClick={() => handleFamiliaClick("BOMBAHORMIGON")}>
        <span>BOMBAHORMIGON</span>
      </button>
      <button onClick={() => handleFamiliaClick("BOMBAHORMIGONSOBRECAMION")}>
        <span>BOMBAHORMIGONSOBRECAMION</span>
      </button>
      <button onClick={() => handleFamiliaClick("CAMIONARTICULADO")}>
        <span>CAMIONARTICULADO</span>
      </button>
      <button onClick={() => handleFamiliaClick("CAMIONMINERO")}>
        <span>CAMIONMINERO</span>
      </button>
      <button onClick={() => handleFamiliaClick("EXCAVADORA")}>
        <span>EXCAVADORA</span>
      </button>
      <button onClick={() => handleFamiliaClick("EXCAVADORAMINERA")}>
        <span>EXCAVADORAMINERA</span>
      </button>
      <button onClick={() => handleFamiliaClick("FRESADORA")}>
        <span>FRESADORA</span>
      </button>
      <button onClick={() => handleFamiliaClick("Gruas")}>
        <span>Gruas</span>
      </button>
      <button onClick={() => handleFamiliaClick("Gruas")}>
        <span>Gruas</span>
      </button>
      <button onClick={() => handleFamiliaClick("Gruas")}>
        <span>Gruas</span>
      </button>
      <button onClick={() => handleFamiliaClick("MANIPULADORESMAGNI")}>
        <span>MANIPULADORESMAGNI</span>
      </button>
      <button onClick={() => handleFamiliaClick("MINICARGADORA")}>
        <span>MINICARGADORA</span>
      </button>
      <button onClick={() => handleFamiliaClick("MINIRODILLO")}>
        <span>MINIRODILLO</span>
      </button>
      <button onClick={() => handleFamiliaClick("MOTONIVELADORA")}>
        <span>MOTONIVELADORA</span>
      </button>
      <button onClick={() => handleFamiliaClick("PALACARGADORA")}>
        <span>PALACARGADORA</span>
      </button>
      <button onClick={() => handleFamiliaClick("PILOTERA")}>
        <span>PILOTERA</span>
      </button>
      <button onClick={() => handleFamiliaClick("PLATAFORMASARTICULADAS")}>
        <span>PLATAFORMASARTICULADAS</span>
      </button>
      <button onClick={() => handleFamiliaClick("PORTACONTENEDOR")}>
        <span>PORTACONTENEDOR</span>
      </button>
      <button onClick={() => handleFamiliaClick("RETROEXCAVADORA")}>
        <span>RETROEXCAVADORA</span>
      </button>
      <button onClick={() => handleFamiliaClick("RODILLOCOMPACTADOR")}>
        <span>RODILLOCOMPACTADOR</span>
      </button>
      <button onClick={() => handleFamiliaClick("RODILLODOBLELISO")}>
        <span>RODILLODOBLELISO</span>
      </button>
      <button onClick={() => handleFamiliaClick("RODILLONEUMATICO")}>
        <span>RODILLONEUMATICO</span>
      </button>
      <button onClick={() => handleFamiliaClick("TERMINADORAASFALTO")}>
        <span>TERMINADORAASFALTO</span>
      </button>
      <button onClick={() => handleFamiliaClick("TOPADORA")}>
        <span>TOPADORA</span>
      </button>
      <button onClick={() => handleFamiliaClick("TROMPOHORMIGONERO")}>
        <span>TROMPOHORMIGONERO</span>
      </button>
      <button onClick={() => handleFamiliaClick("TUNELERAHORIZONTAL")}>
        <span>TUNELERAHORIZONTAL</span>
      </button>
    </div>
  );
}
