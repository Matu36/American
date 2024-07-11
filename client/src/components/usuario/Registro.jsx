import React, { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";
import logo from "../../assets/img/AMERICAN.jpg";

export default function Registro({ handleCerrarModalRegistro }) {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  const saveUser = async (e) => {
    e.preventDefault();
    let newUser = form;

    const request = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}usuarios/registro`,
      {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (request.status === 400) {
      setSaved("400");
      return;
    }
    const data = await request.json();

    if (data.status == "success") {
      setSaved("saved");
      setShowWelcomeMessage(true);
    } else {
      setSaved("error");
    }
  };

  useEffect(() => {
    // Después de 3 segundos, ocultar el mensaje de bienvenida
    if (showWelcomeMessage) {
      const timer = setTimeout(() => {
        setShowWelcomeMessage(false);
        handleCerrarModalRegistro();
        window.location.reload();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showWelcomeMessage]);

  return (
    <div className="registro-container">
      <div className="button-close-login">
        <button onClick={handleCerrarModalRegistro} style={{ color: "black" }}>
          X
        </button>
      </div>
      <div className="datos">
        <h4>Ingresá tus datos</h4>
      </div>
      <form className="registro" onSubmit={saveUser}>
        <div className="columna">
          <div className="registroform">
            <label htmlFor="email">
              Email<span className="required">*</span>
            </label>
            <input type="email" name="email" onChange={changed} required />
          </div>

          <div className="registroform">
            <label htmlFor="contraseña">
              Contraseña<span className="required">*</span>
            </label>
            <input
              type="password"
              name="password"
              onChange={changed}
              required
            />
          </div>

          <div className="registroform">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" name="nombre" onChange={changed} />
          </div>
        </div>
        <div className="columna">
          <div className="registroform">
            <label htmlFor="apellidos">Apellidos</label>
            <input type="text" name="apellido" onChange={changed} />
          </div>
          <div className="registroform">
            <label htmlFor="telefono">Teléfono</label>
            <input type="text" name="telefono" onChange={changed} />
          </div>
          <div className="registroform">
            <label htmlFor="direccion">Dirección</label>
            <input type="text" name="direccion" onChange={changed} />
          </div>
        </div>

        <input type="submit" value="Registrate" className="button-registro" />
      </form>
      <br />
      {showWelcomeMessage && (
        <div className="welcome-message">
          <img src={logo} alt="" />
          <p>Ya estas registrado en AMERICAN VIAL!</p>
        </div>
      )}
      <span>{saved == "error" ? "Error al registrarse" : null}</span>
      <span>
        {saved == "400" ? "El email ya se encuentra registrado" : null}
      </span>
    </div>
  );
}
