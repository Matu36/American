import React, { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import Registro from "./Registro";
import RecoverPass from "./RecoverPass";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login({ handleCerrarModalLogin }) {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");
  const [registro, setRegistro] = useState(false);
  const [recover, setRecover] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();

  const navigate = useNavigate();

  const handleMostrarModalRegistro = () => {
    setRegistro(true);
  };

  const handleCerrarModalRegistro = () => {
    setRegistro(false);
  };

  const handleMostrarModalRecover = () => {
    setRecover(true);
  };

  const handleCerrarModalRecover = () => {
    setRecover(false);
  };

  const loginUser = async (e) => {
    e.preventDefault();

    //Datos del formulario
    let userToLogin = form;

    //Peticion al backend

    const request = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}usuarios/login`,
      {
        method: "POST",
        body: JSON.stringify(userToLogin),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const data = await request.json();

    if (data.status == "success") {
      //Persistir los datos en el LocalStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.loggedUser));
      setSaved("login");
      setShowWelcomeMessage(true);
    } else if (data.status === 43) {
      // Mostrar mensaje de error específico para código 403
      setErrorMessage(
        "Las credenciales son incorrectas. Por favor, verifícalas e inténtalo de nuevo."
      );
      setSaved("error");
    } else {
      // Otros códigos de error no manejados
      setErrorMessage(
        "Las credenciales son incorrectas. Por favor, verifícalas e inténtalo de nuevo."
      );
      setSaved("error");
    }
  };

  useEffect(() => {
    // Después de 3 segundos, ocultar el mensaje de bienvenida
    if (showWelcomeMessage) {
      const timer = setTimeout(() => {
        setShowWelcomeMessage(false);
        handleCerrarModalLogin();

        // Condición para determinar la ruta actual
        if (location.pathname === "/") {
          window.location.reload(); // Recargar la página si estamos en '/'
        } else {
          navigate("/");
          window.location.reload();
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showWelcomeMessage, location]);

  return (
    <div>
      {!registro && (
        <div className="login-container">
          <div className="button-close-login">
            <button onClick={handleCerrarModalLogin} style={{ color: "black" }}>
              X
            </button>
          </div>

          <form className="login-form" onSubmit={loginUser}>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" name="email" onChange={changed} />
            </div>
            <div className="form-group">
              <label htmlFor="contraseña">Contraseña</label>
              <input type="password" name="password" onChange={changed} />
            </div>

            <span>{saved == "error" ? "Error al registrarse" : null}</span>
            {saved === "error" && (
              <strong style={{ color: "red" }}>{errorMessage}</strong>
            )}

            <input type="submit" value="Ingresar" className="btn btn-success" />
          </form>
          <button onClick={handleMostrarModalRecover}>
            <span style={{ color: "blue" }}>¿Olvidaste tu contraeña?</span>
          </button>
          {recover && (
            <div className="modal">
              <div className="modal-content">
                <RecoverPass
                  handleCerrarModalRecover={handleCerrarModalRecover}
                />
              </div>
            </div>
          )}

          {showWelcomeMessage && (
            <div className="welcome-message">
              <img
                src="https://res.cloudinary.com/dmfzplfra/image/upload/v1711678602/VENICE/LOGO_1-removebg-preview_j1tfcu.png"
                alt=""
              />
              <p>Bienvenido a Comunidad Venice!</p>
            </div>
          )}
          <div>
            <span style={{ color: "blue" }}>
              ¿Aún no pertenecés a Comunidad Venice?
            </span>
          </div>
          <button onClick={handleMostrarModalRegistro}>Registráte</button>
        </div>
      )}

      {registro && (
        <div>
          <Registro handleCerrarModalRegistro={handleCerrarModalRegistro} />
        </div>
      )}
    </div>
  );
}
