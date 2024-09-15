import React from "react";
import { useClientes } from "../../hooks/useClientes";
import { useParams } from "react-router-dom";
import Spinner from "../../UI/Spinner";
import BackButton from "../../UI/BackButton";

export default function ClientesDetail() {
  const { id } = useParams();
  const { data: clienteDetalle, isLoading } = useClientes(
    null,
    id
  ).clientesQueryDetalle;

  if (isLoading) {
    return (
      <div>
        {" "}
        <Spinner />
      </div>
    );
  }

  const {
    CUIT,
    domicilio,
    nombre,
    apellido,
    mail,
    telefono,
    fechaDeCreacion,
    fechaModi,
    Usuario,
    razonSocial,
    mailAlternativo,
    mailAlternativo1,
    telefonoAlternativo,
    telefonoAlternativo1,
    contactoAlternativo,
    contactoAlternativo1,
    provincia,
    ciudad,
  } = clienteDetalle;

  return (
    <div className="form-container1">
      <BackButton />
      <h2>Detalle del Cliente</h2>
      <br />
      <div style={{ marginBottom: "10px" }}>
        <strong>CUIT:</strong> {CUIT}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Razón Social:</strong> {razonSocial}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Domicilio:</strong> {domicilio}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Nombre:</strong> {nombre}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Apellido:</strong> {apellido}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Email:</strong> {mail}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Teléfono:</strong> {telefono}
      </div>
      {contactoAlternativo && (
        <div style={{ marginBottom: "10px" }}>
          <strong>Contacto Alternativo:</strong> {contactoAlternativo}
        </div>
      )}
      {mailAlternativo && (
        <div style={{ marginBottom: "10px" }}>
          <strong>Email:</strong> {mailAlternativo}
        </div>
      )}
      {telefonoAlternativo && (
        <div style={{ marginBottom: "10px" }}>
          <strong>Teléfono Alternativo:</strong> {telefonoAlternativo}
        </div>
      )}

      {contactoAlternativo1 && (
        <div style={{ marginBottom: "10px" }}>
          <strong>Contacto Alternativo:</strong> {contactoAlternativo1}
        </div>
      )}

      {mailAlternativo1 && (
        <div style={{ marginBottom: "10px" }}>
          <strong>Email:</strong> {mailAlternativo1}
        </div>
      )}

      {telefonoAlternativo1 && (
        <div style={{ marginBottom: "10px" }}>
          <strong>Teléfono:</strong> {telefonoAlternativo1}
        </div>
      )}
      <div style={{ marginBottom: "10px" }}>
        <strong>Provincia:</strong> {provincia}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Ciudad:</strong> {ciudad}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <strong>Creado:</strong>{" "}
        {new Date(fechaDeCreacion).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <strong>Cargado por:</strong> {Usuario.nombre} {Usuario.apellido}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <div style={{ marginBottom: "10px" }}>
          <strong>Modificado:</strong>{" "}
          {fechaModi
            ? new Date(fechaModi).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "Sin modificaciones"}
        </div>
      </div>
    </div>
  );
}
