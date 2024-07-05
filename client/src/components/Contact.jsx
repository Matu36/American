import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import { useContacto } from "../hooks/useContacto";

export default function Contact({ handleCerrarModalContact }) {
  const { mutate: createContacto } = useContacto().contactoMutation;

  // Estados locales para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [consulta, setConsulta] = useState("");

  // Manejador para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica (puedes agregar más validaciones según tus necesidades)
    if (
      !nombre ||
      !apellidos ||
      !email ||
      !telefono ||
      !direccion ||
      !consulta
    ) {
      alert("Por favor completa todos los campos del formulario.");
      return;
    }

    // Objeto con los datos del formulario
    const formData = {
      nombre,
      apellidos,
      email,
      telefono,
      direccion,
      consulta,
    };

    try {
      // Llamar a la función para crear el contacto
      await createContacto(formData);

      // Limpiar los campos del formulario después de enviar
      setNombre("");
      setApellidos("");
      setEmail("");
      setTelefono("");
      setDireccion("");
      setConsulta("");

      // Cerrar el modal
      handleCerrarModalContact();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      // Aquí puedes manejar el error de alguna manera, como mostrar un mensaje al usuario
    }
  };

  return (
    <div className="contact-container">
      <div>
        <button
          type="button"
          onClick={handleCerrarModalContact}
          className="button-cerrar"
        >
          <GrClose />
        </button>
      </div>
      <div className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellidos">Apellidos:</label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="direccion">Dirección:</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="consulta">Consulta:</label>
            <textarea
              id="consulta"
              name="consulta"
              rows="4"
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
              required
            ></textarea>
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
