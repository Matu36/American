import React from "react";
import { useDescuento } from "../../hooks/useDescuento";
import { useParams } from "react-router-dom";

export default function DescuentoDetail() {
  const { id } = useParams();
  const { data: descuentoDetalle, isLoading } = useDescuento(id).descuentoQuery;

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }
  return (
    <div className="form-container1">
      <h2>Detalle del Descuento</h2>
      <div>
        <strong>Nombre Completo:</strong> {descuentoDetalle.nombreCompleto}
      </div>
      <div>
        <strong>Email:</strong> {descuentoDetalle.email}
      </div>
      <div>
        <strong>Teléfono Celular:</strong> {descuentoDetalle.telefonoCelular}
      </div>
      <div>
        <strong>Dirección:</strong> {descuentoDetalle.direccion}
      </div>
      <div>
        <strong>Fecha de Registro:</strong>{" "}
        {new Date(descuentoDetalle.fechaDeRegistro).toLocaleString()}
      </div>
    </div>
  );
}
