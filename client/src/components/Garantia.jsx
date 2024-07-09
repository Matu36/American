import React, { useState } from "react";
import { useGarantia } from "../hooks/useGarantia";

export default function Garantia({ handleCerrarModalGarantia }) {
  const { mutate: crearGarantia } = useGarantia().GarantiaMutation;

  const [formValues, setFormValues] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
    tipoDeMaquina: "",
    marca: "",
    modelo: "",
    numeroDeChasis: "",
    fechaEntregaDelEquipo: "",
    ubicacion: "",
    cantidadHorasHorometro: "",
    falla: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    crearGarantia(formValues);
    handleCerrarModalGarantia();
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <form onSubmit={handleSubmit} className="contact-form">
          {Object.keys(formValues).map((key) => (
            <div key={key} className="form-group">
              <label htmlFor={key}>{key}</label>
              <input
                type={key === "fechaEntregaDelEquipo" ? "date" : "text"}
                id={key}
                name={key}
                value={formValues[key]}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className="form-actions">
            <button type="submit" className="submit-button">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
