import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeaderNavBar({
  handleMostrarModalGarantia,
  handleMostrarModalContact,
}) {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="headerNaBar">
      <div>
        <button onClick={navigateToHome}>Home</button>
        <button>Equipos</button>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="empresaButtonWrapper"
        >
          <button>Empresa</button>
          {isDropdownOpen && (
            <div className="dropdownEmpresa">
              <button onClick={() => navigate("/postventa")}>PostVenta</button>
              <button onClick={() => navigate("/distribuidores")}>
                Distribuidores
              </button>
              <button onClick={() => navigate("/financiacion")}>
                Financiación
              </button>
              <button onClick={() => navigate("/americanrepuestos")}>
                Repuestos
              </button>
              <button onClick={() => navigate("/trabajaConNosotros")}>
                Trabajá con Nosotros
              </button>
            </div>
          )}
        </div>
        <button onClick={handleMostrarModalGarantia}>Garantía</button>
        <button onClick={handleMostrarModalContact}>Contacto</button>
      </div>
    </div>
  );
}
