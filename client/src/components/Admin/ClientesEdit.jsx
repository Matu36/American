import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useClientes } from "../../hooks/useClientes";
import useAuth from "../../hooks/useAuth";

export default function ClientesEdit() {
  const { auth } = useAuth();
  const idUsuario = auth?.id;

  const { id } = useParams();

  const [formData, setFormData] = useState({
    id: id,
    idUsuario: idUsuario,
    CUIT: "",
    domicilio: "",
    nombre: "",
    apellido: "",
    mail: "",
    telefono: "",
  });

  const {
    clientesQueryDetalle: { data: clienteDetalle, isLoading },
    clientesEditMutation: { mutate: ediCliente },
  } = useClientes(null, id);

  useEffect(() => {
    if (clienteDetalle) {
      setFormData({
        id: id,
        idUsuario: idUsuario,
        CUIT: clienteDetalle.CUIT || "",
        domicilio: clienteDetalle.domicilio || "",
        nombre: clienteDetalle.nombre || "",
        apellido: clienteDetalle.apellido || "",
        mail: clienteDetalle.mail || "",
        telefono: clienteDetalle.telefono || "",
      });
    }
  }, [clienteDetalle, id, idUsuario]);

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

    await ediCliente(data);

    setFormData({
      CUIT: "",
      domicilio: "",
      nombre: "",
      apellido: "",
      mail: "",
      telefono: "",
    });
  };

  return (
    <div className="form-container1">
      <h2 className="tituloCompo">Modificar datos del Cliente</h2>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="CUIT">CUIT</label>
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
          <label htmlFor="domicilio">Domicilio</label>
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
          <label htmlFor="nombre">Nombre</label>
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
          <label htmlFor="apellido">Apellido</label>
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
          <label htmlFor="mail">Email</label>
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
          <label htmlFor="telefono">Teléfono</label>
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
          Modificar datos del cliente
        </button>
      </form>
    </div>
  );
}
