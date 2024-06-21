import React from "react";
import { useClientes } from "../../hooks/useClientes";
import { useParams } from "react-router-dom";

export default function ClientesDetail() {
  const { id } = useParams();
  const { data: clienteDetalle, isLoading } = useClientes(
    null,
    id
  ).clientesQueryDetalle;

  if (isLoading) {
    return <div className="loader">Loading...</div>;
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
  } = clienteDetalle;

  return (
    <div className="clientes-detail-container">
      <h2>Detalles del Cliente</h2>
      <div className="detail-item">
        <strong>CUIT:</strong> {CUIT}
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
        <strong>Usuario:</strong> {Usuario.nombre} {Usuario.apellido}
      </div>
    </div>
  );
}
