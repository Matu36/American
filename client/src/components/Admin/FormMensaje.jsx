// src/components/FormMensaje.js
import React, { useState } from "react";
import { useMensajes } from "../../hooks/useMensajes";
import useAuth from "../../hooks/useAuth";
import Select from "react-select";
import { useUsuario } from "../../hooks/useUsuarios";

export default function FormMensaje() {
  const { auth } = useAuth();
  const idUsuario = auth?.id;
  const { mutate: crearMensaje } = useMensajes().mensajesMutation;
  const { data, isLoading } = useUsuario().usuariosMensajesQuery;

  const [formData, setFormData] = useState({
    idUsuario: idUsuario,
    idDestino: "",
    Mensaje: "",
  });

  const userOptions = data?.allUsers.map((user) => ({
    value: user.id,
    label: `${user.nombre} ${user.apellido} (${user.email})`,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, idDestino: selectedOption.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    crearMensaje(formData, {
      onSuccess: () => {
        alert("Mensaje enviado con éxito");
        setFormData({
          idUsuario: "",
          idDestino: "",
          Mensaje: "",
        });
      },
      onError: (error) => {
        console.error("Error al enviar el mensaje:", error);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container1">
      <h2 className="tituloCompo">Crear Mensaje</h2> <br />
      <div className="form-group">
        <label htmlFor="idDestino">Destinatario</label>
        <Select
          id="idDestino"
          name="idDestino"
          options={userOptions}
          onChange={handleSelectChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="Mensaje">Mensaje</label>
        <textarea
          id="Mensaje"
          name="Mensaje"
          value={formData.Mensaje}
          onChange={handleChange}
          className="form-control"
          rows="4"
        />
      </div>
      <button type="submit" className="form-submit">
        Enviar Mensaje
      </button>
    </form>
  );
}
