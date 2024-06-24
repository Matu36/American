import React from "react";
import { useContacto } from "../../hooks/useContacto";
import { useParams } from "react-router-dom";

export default function ContactoDetail() {
  const { id } = useParams();
  const { data: contactoDetalle, isLoading } =
    useContacto(id).contactoQueryById;

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }
  return (
    <div className="form-container1">
      <h2>Detalle</h2>
      <div></div>
      <div>
        <strong>Nombre:</strong> {contactoDetalle.nombre}
      </div>
      <div>
        <strong>Apellidos:</strong> {contactoDetalle.apellidos}
      </div>
      <div>
        <strong>Email:</strong> {contactoDetalle.email}
      </div>
      <div>
        <strong>Teléfono:</strong> {contactoDetalle.telefono}
      </div>
      <div>
        <strong>Dirección:</strong> {contactoDetalle.direccion}
      </div>
      <div>
        <strong>Consulta:</strong> {contactoDetalle.consulta}
      </div>
      <div>
        <strong>Fecha de Creación:</strong>{" "}
        {new Date(contactoDetalle.createdAt).toLocaleString()}
      </div>
    </div>
  );
}
