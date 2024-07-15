import React from "react";
import { useClientes } from "../../hooks/useClientes";
import { useParams } from "react-router-dom";
import Spinner from "../../UI/Spinner";

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
  } = clienteDetalle;

  return (
    <div className="form-container1">
      <h2>Detalles del Cliente</h2>
      <br />
      <div className="detail-item">
        <strong>CUIT:</strong> {CUIT}
      </div>
      <div className="detail-item">
        <strong>Razón Social:</strong> {razonSocial}
      </div>
      <div className="detail-item">
        <strong>Domicilio:</strong> {domicilio}
      </div>
      <div className="detail-item">
        <strong>Nombre:</strong> {nombre}
      </div>
      <div className="detail-item">
        <strong>Apellido:</strong> {apellido}
      </div>
      <div className="detail-item">
        <strong>Email:</strong> {mail}
      </div>
      <div className="detail-item">
        <strong>Teléfono:</strong> {telefono}
      </div>
      <div className="detail-item">
        <strong>Creado:</strong> {fechaDeCreacion}
      </div>
      <div className="detail-item">
        <strong>Modificado:</strong> {fechaModi}
      </div>
      <div className="detail-item">
        <strong>Cargado por:</strong> {Usuario.nombre} {Usuario.apellido}
      </div>
    </div>
  );
}
