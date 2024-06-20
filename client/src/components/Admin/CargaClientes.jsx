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
  });

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Enviar formulario al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Agregar el idUsuario al formData antes de enviar al backend
      const data = { ...formData, idUsuario };

      // Llamar a la función clienteCreate para enviar los datos al backend
      await clienteCreate(data);

      // Limpiar el formulario después de enviar los datos
      setFormData({
        CUIT: "",
        domicilio: "",
        nombre: "",
        apellido: "",
        mail: "",
        telefono: "",
      });

      // Mostrar mensaje de éxito o realizar alguna acción adicional si es necesario
      alert("Cliente creado exitosamente");
    } catch (error) {
      console.error("Error al crear cliente:", error);
      alert(
        "Hubo un error al crear el cliente. Por favor, intenta nuevamente."
      );
    }
  };

  return (
    <div className="form-container1">
      <h2 className="tituloCompo">Cargar Clientes</h2> <br />
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
          <label htmlFor="mail">Mail</label>
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
            type="tel"
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
