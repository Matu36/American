import React from "react";
import { useContactoProducto } from "../../hooks/useContactoProducto";
import { useParams } from "react-router-dom";

export default function DescuentoDetail() {
  const { id } = useParams();
  const { data: descuentoDetalle, isLoading } =
    useContactoProducto(id).contactoProductoQueryById;

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }
  return (
    <div className="form-container1">
      <h3>Detalle del Contacto por Producto</h3>
      <div>
        <br />
        <strong>Nombre Completo:</strong> {descuentoDetalle.nombre}{" "}
        {descuentoDetalle.apellido}
      </div>
      <div>
        <strong>Razón Social:</strong> {descuentoDetalle.razonSocial}
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
      <div>
        <strong>Pago Contado:</strong> {descuentoDetalle.pagoContado}
      </div>
      <div>
        <strong>Cuotas:</strong> {descuentoDetalle.cuotas}
      </div>
      <div>
        <strong>Anticipo:</strong> {descuentoDetalle.anticipo}
      </div>
      <div>
        <strong>Moneda:</strong> {descuentoDetalle.moneda}
      </div>
      <div>
        <strong>Familia del Producto:</strong>{" "}
        {descuentoDetalle.Producto.familia}
      </div>
      <div>
        <strong>Marca del Producto:</strong> {descuentoDetalle.Producto.marca}
      </div>
      <div>
        <strong>Modelo del Producto:</strong> {descuentoDetalle.Producto.modelo}
      </div>
    </div>
  );
}
