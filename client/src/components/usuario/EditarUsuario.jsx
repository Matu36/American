import React, { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";

export default function EditarUsuario({ handleCerrarModalEdit }) {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");
  const { auth, setAuth } = useAuth();

  const saveUser = async (e) => {
    e.preventDefault();
    let newUser = form;
    if (!newUser.id) {
      newUser.id = auth.id;
    }

    const request = await fetch(`${import.meta.env.VITE_BACKEND_URL}usuarios`, {
      method: "PUT",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();

    if (data.status === "success") {
      const updatedUser = { ...auth, ...newUser };

      // Actualizar el objeto en el localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Actualizar el estado local
      setAuth(updatedUser);
      setSaved("saved");
    } else {
      setSaved("error");
    }
  };

  return (
    <div className="registro-container">
      <div className="button-close-login">
        <button onClick={handleCerrarModalEdit} style={{ color: "black" }}>
          X
        </button>
      </div>
      <div className="datos">
        <h4>Modificá tus datos</h4>
      </div>
      <form className="registro" onSubmit={saveUser}>
        <div className="columna">
          <input type="text" name="id" hidden defaultValue={auth.id} />

          <div className="registroform">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              onChange={changed}
              placeholder={auth.email}
              disabled
            />
          </div>

          <div className="registroform">
            <label htmlFor="contraseña">Contraseña</label>
            <input type="password" name="password" onChange={changed} />
          </div>

          <div className="registroform">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              name="nombre"
              onChange={changed}
              placeholder={auth.nombre}
            />
          </div>
        </div>
        <div className="columna">
          <div className="registroform">
            <label htmlFor="apellidos">Apellidos</label>
            <input
              type="text"
              name="apellido"
              onChange={changed}
              placeholder={auth.apellido}
            />
          </div>
          <div className="registroform">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="text"
              name="telefono"
              onChange={changed}
              placeholder={auth.telefono}
            />
          </div>
          <div className="registroform">
            <label htmlFor="direccion">Dirección</label>
            <input
              type="text"
              name="direccion"
              onChange={changed}
              placeholder={auth.direccion}
            />
          </div>
        </div>
        <input
          type="submit"
          value="Guardar Cambios"
          className="button-registro"
        />
      </form>
      <br />
      <span>
        {saved == "saved" ? "Usuario modificado Correctamente" : null}
      </span>
      <span>{saved == "error" ? "Error Interno del Servidor" : null}</span>
    </div>
  );
}
