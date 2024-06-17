import React from "react";
import { useCotizaciones } from "../../hooks/useCotizaciones";
import { useParams } from "react-router-dom";

export default function CotizacionDetail() {
  const { id } = useParams();
  const { data: cotizacionDetalle, isLoading } = useCotizaciones(
    null,
    id
  ).cotizacionDetalleQuery;

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  const {
    numeroCotizacion,
    precio,
    anticipo,
    saldoAFinanciar,
    IVA,
    moneda,
    interes,
    saldo,
    saldoConInteres,
    PrecioFinal,
    fechaDeCreacion,
    Usuario,
    Cliente,
    Producto,
  } = cotizacionDetalle;

  return (
    <div className="cotizacion-detail">
      <h2 className="titulo">Detalles de Cotización</h2>

      <div className="seccion">
        <h3>Información de Cotización</h3>
        <p>
          <strong>Número de Cotización:</strong>{" "}
          {numeroCotizacion ? numeroCotizacion : null}
        </p>
        <p>
          <strong>Fecha de Creación:</strong>{" "}
          {new Date(fechaDeCreacion).toLocaleString()}
        </p>
      </div>

      <div className="seccion">
        <h3>Detalle de la Cotización</h3>
        <p>
          <strong>Precio:</strong> {moneda} {parseFloat(precio).toFixed(2)}
        </p>
        <p>
          <strong>Anticipo:</strong> {moneda} {parseFloat(anticipo).toFixed(2)}
        </p>
        <p>
          <strong>Saldo a Financiar:</strong> {moneda}{" "}
          {parseFloat(saldoAFinanciar).toFixed(2)}
        </p>
        <p>
          <strong>IVA:</strong> {moneda} {parseFloat(IVA).toFixed(2)}
        </p>
        <p>
          <strong>Interés:</strong> {parseFloat(interes).toFixed(2)}%
        </p>
        <p>
          <strong>Saldo:</strong> {moneda} {parseFloat(saldo).toFixed(2)}
        </p>
        <p>
          <strong>Saldo con Interés:</strong> {moneda}{" "}
          {parseFloat(saldoConInteres).toFixed(2)}
        </p>
        <p>
          <strong>Precio Final:</strong> {moneda}{" "}
          {parseFloat(PrecioFinal).toFixed(2)}
        </p>
      </div>

      <div className="seccion">
        <h3>Vendedor</h3>
        <p>
          <strong>Nombre:</strong> {Usuario.nombre} {Usuario.apellido}
        </p>
        <p>
          <strong>Email:</strong> {Usuario.email}
        </p>
      </div>

      <div className="seccion">
        <h3>Cliente</h3>
        <p>
          <strong>Nombre:</strong> {Cliente.nombre} {Cliente.apellido}
        </p>
        <p>
          <strong>Email:</strong> {Cliente.mail}
        </p>
      </div>

      <div className="seccion">
        <h3>Producto</h3>
        <p>
          <strong>Familia:</strong> {Producto.familia}
        </p>
        <p>
          <strong>Marca:</strong> {Producto.marca}
        </p>
        <p>
          <strong>Modelo:</strong> {Producto.modelo}
        </p>
      </div>
    </div>
  );
}
