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
        <strong>Email Alternativo:</strong> {mailAlternativo}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Email Alternativo:</strong> {mailAlternativo1}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Teléfono:</strong> {telefono}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Teléfono Alternativo:</strong> {telefonoAlternativo}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Teléfono Alternativo:</strong> {telefonoAlternativo1}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Creado:</strong> {fechaDeCreacion}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Modificado:</strong> {fechaModi}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Cargado por:</strong> {Usuario.nombre} {Usuario.apellido}
      </div>
    </div>
  );
}
