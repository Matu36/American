import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useClientes } from "../../hooks/useClientes";

export default function CargaClientes() {
  const { auth } = useAuth();
  const { mutate: clienteCreate } = useClientes().clientesMutation;
  const idUsuario = auth?.id;

  // Estado local para manejar los datos del formulario
  const [formData, setFormData] = useState({
    idUsuario: idUsuario,
    CUIT: "",
    domicilio: "",
    nombre: "",
    apellido: "",
    mail: "",
    telefono: "",
    razonSocial: "",
  });

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { ...formData, idUsuario };

    await clienteCreate(data);

    setFormData({
      CUIT: "",
      domicilio: "",
      nombre: "",
      apellido: "",
      mail: "",
      telefono: "",
      razonSocial: "",
    });
  };

  return (
    <div className="form-container1">
      <h2 className="tituloCompo">Cargar Clientes</h2> <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="CUIT">
            CUIT <span className="obligatorio">*</span>
          </label>
          <input
            type="text"
            id="CUIT"
            name="CUIT"
            value={formData.CUIT}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="domicilio">
            Domicilio<span className="obligatorio">*</span>
          </label>
          <input
            type="text"
            id="domicilio"
            name="domicilio"
            value={formData.domicilio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombre">Razón Social</label>
          <input
            type="text"
            id="razonSocial"
            name="razonSocial"
            value={formData.razonSocial}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombre">
            Nombre<span className="obligatorio">*</span>
          </label>
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
          <label htmlFor="apellido">
            Apellido<span className="obligatorio">*</span>
          </label>
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
          <label htmlFor="mail">
            Email<span className="obligatorio">*</span>
          </label>
          <input
            type="email"
            id="mail"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">
            Teléfono<span className="obligatorio">*</span>
          </label>
          <input
            type="number"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="form-submit">
          Guardar Cliente
        </button>
      </form>
    </div>
  );
}
