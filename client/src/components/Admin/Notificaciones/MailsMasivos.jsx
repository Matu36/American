import React, { useState } from "react";
import { useClientes } from "../../../hooks/useClientes";
import useAuth from "../../../hooks/useAuth";
import BackButton from "../../../UI/BackButton";
import Spinner from "../../../UI/Spinner";
import { useMails } from "../../../hooks/useMailsMasivos";
import Spinner2 from "../../../UI/Spinner2";

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password);
    setPassword("");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Ingresa tu contraseña</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
          <div className="modal-buttons">
            <button type="submit">Enviar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function MailsMasivos() {
  const { mutate: CrearEmails } = useMails().mailsMutation;
  const { auth } = useAuth();
  const emailEmisor = auth?.email;

  const token = localStorage.getItem("token");
  const idUsuario = token;

  const { data: clientesEmail, isLoading: clientesLoading } =
    useClientes(idUsuario).clientesEmailsQuery;

  // Estado local para el estado de envío
  const [enviando, setEnviando] = useState(false);

  const [selectedEmails, setSelectedEmails] = useState([]);
  const [cuerpoMensaje, setCuerpoMensaje] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (clientesLoading) return <Spinner />;

  const handleEmailSelection = (email) => {
    setSelectedEmails((prevEmails) =>
      prevEmails.includes(email)
        ? prevEmails.filter((e) => e !== email)
        : [...prevEmails, email]
    );
  };

  const handleEnviarEmails = (e) => {
    e.preventDefault();
    if (selectedEmails.length === 0) {
      alert("Debes seleccionar al menos un email para enviar el mensaje.");
      return;
    }
    if (!cuerpoMensaje) {
      alert("Por favor, ingresa el cuerpo del mensaje.");
      return;
    }

    setIsModalOpen(true);
  };

  const handlePasswordSubmit = (password) => {
    const emailData = {
      emailEmisor,
      emailsReceptores: selectedEmails,
      cuerpoMensaje,
      password,
    };

    setEnviando(true);

    CrearEmails(emailData, {
      onSuccess: () => {
        setSelectedEmails([]);
        setCuerpoMensaje("");

        setEnviando(false);
      },
      onError: () => {
        setEnviando(false);
      },
    });
    setIsModalOpen(false);
  };

  const handleSelectAll = () => {
    const allEmails = clientesEmail
      .flatMap((cliente) => [
        cliente.mail,
        cliente.mailAlternativo,
        cliente.mailAlternativo1,
      ])
      .filter(Boolean);

    setSelectedEmails(allEmails);
  };

  // Función para deseleccionar todos los emails
  const handleDeselectAll = () => {
    setSelectedEmails([]);
  };

  return (
    <div className="postVentaContainer">
      <BackButton />
      <h2 className="tituloCompo">Notificar vía Email</h2>
      <hr />
      <br />
      <form onSubmit={handleEnviarEmails}>
        <div className="select-buttons">
          <button type="button" onClick={handleSelectAll}>
            Seleccionar Todos
          </button>
          <button type="button" onClick={handleDeselectAll}>
            Deseleccionar Todos
          </button>
        </div>
        <br />
        <div className="clientes-list">
          {clientesEmail?.map((cliente) => {
            const emails = [
              cliente.mail,
              cliente.mailAlternativo,
              cliente.mailAlternativo1,
            ].filter(Boolean);

            return (
              <div key={cliente.nombre} className="cliente">
                <h4>
                  {cliente.nombre} {cliente.apellido}
                </h4>
                {emails.map((email) => (
                  <div key={email} className="email-item">
                    <input
                      type="checkbox"
                      value={email}
                      onChange={() => handleEmailSelection(email)}
                      checked={selectedEmails.includes(email)}
                    />
                    <label>{email}</label>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <hr />
        <div className="email-body">
          <label style={{ color: "black" }} htmlFor="cuerpoMensaje">
            Mensaje:
          </label>
          <textarea
            id="cuerpoMensaje"
            value={cuerpoMensaje}
            onChange={(e) => setCuerpoMensaje(e.target.value)}
          />
        </div>

        <button className="form-submit" type="submit" disabled={enviando}>
          {enviando ? <Spinner2 /> : "Enviar Email"}
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handlePasswordSubmit}
      />
    </div>
  );
}
