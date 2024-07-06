import React, { useState } from "react";
import { useContactoProducto } from "../hooks/useContactoProducto";
import { GrClose } from "react-icons/gr";

export default function ContactoProducto({ id, handleCerrarContactoProducto }) {
  const { mutate: contactoProducto } =
    useContactoProducto().contactoProductoMutation;

  const [formData, setFormData] = useState({
    idProducto: id,
    nombre: "",
    apellido: "",
    razonSocial: "",
    email: "",
    telefonoCelular: "",
    direccion: "",
    pagoContado: true,
    cuotas: 1,
    anticipo: "",
    moneda: "USD",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    contactoProducto(formData);
  };

  return (
    <div className="contact-container">
      <div>
        <button
          type="button"
          onClick={handleCerrarContactoProducto}
          className="button-cerrar"
        >
          <GrClose />
        </button>
      </div>
      <div className="contact-content">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="razonSocial">Razón Social:</label>
            <input
              type="text"
              id="razonSocial"
              name="razonSocial"
              value={formData.razonSocial}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefonoCelular">Teléfono Celular:</label>
            <input
              type="tel"
              id="telefonoCelular"
              name="telefonoCelular"
              value={formData.telefonoCelular}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="direccion">Dirección:</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="pagoContado">Pago Contado:</label>
            <select
              id="pagoContado"
              name="pagoContado"
              value={formData.pagoContado}
              onChange={handleChange}
            >
              <option value={true}>Sí</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="cuotas">Cuotas:</label>
            <select
              id="cuotas"
              name="cuotas"
              value={formData.cuotas}
              onChange={handleChange}
            >
              {[...Array(12).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="anticipo">Anticipo:</label>
            <input
              type="number"
              id="anticipo"
              name="anticipo"
              value={formData.anticipo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="moneda">Moneda:</label>
            <select
              id="moneda"
              name="moneda"
              value={formData.moneda}
              onChange={handleChange}
            >
              <option value="USD">USD</option>
              <option value="$">$</option>
            </select>
          </div>
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
