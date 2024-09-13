import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useClientes } from "../../hooks/useClientes";
import useAuth from "../../hooks/useAuth";
import BackButton from "../../UI/BackButton";

export default function ClientesEdit() {
  const { auth } = useAuth();
  const token = localStorage.getItem("token");
  const idUsuario = token;

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
    telefonoAlternativo: "",
    telefonoAlternativo1: "",
    mailAlternativo: "",
    mailAlternativo1: "",
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
        telefonoAlternativo: clienteDetalle.telefonoAlternativo || "",
        telefonoAlternativo1: clienteDetalle.telefonoAlternativo1 || "",
        mailAlternativo: clienteDetalle.mailAlternativo || "",
        mailAlternativo1: clienteDetalle.mailAlternativo1 || "",
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

    let clienteData = { ...formData };

    Object.keys(clienteData).forEach((key) => {
      if (clienteData[key] === "") {
        delete clienteData[key];
      }
    });

    const data = { ...clienteData, idUsuario };

    try {
      await ediCliente(data);
      console.log("Cliente creado exitosamente");
    } catch (error) {
      console.error("Error al crear cliente:", error);
    }
  };

  return (
    <div className="form-container1">
      <BackButton />
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
          <label htmlFor="mail">Email Principal</label>
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
          <label htmlFor="mailAlternativo">Email Alternativo</label>
          <input
            type="email"
            id="mailAlternativo"
            name="mailAlternativo"
            value={formData.mailAlternativo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mailAlternativo1">Email Alternativo</label>
          <input
            type="email"
            id="mailAlternativo1"
            name="mailAlternativo1"
            value={formData.mailAlternativo1}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono Principal</label>
          <input
            type="number"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefonoAlternativo">Teléfono Alternativo</label>
          <input
            type="number"
            id="telefonoAlternativo"
            name="telefonoAlternativo"
            value={formData.telefonoAlternativo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefonoAlternativo1">Teléfono Alternativo</label>
          <input
            type="number"
            id="telefonoAlternativo1"
            name="telefonoAlternativo1"
            value={formData.telefonoAlternativo1}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="form-submit">
          Modificar datos del cliente
        </button>
      </form>
    </div>
  );
}
