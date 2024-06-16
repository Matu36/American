import React from "react";
import { useParams } from "react-router-dom";
import { useVentas } from "../../hooks/useCotizaciones";

export default function VentasDetail() {
  const { id } = useParams();
  const { data: VentaData, isLoading } = useVentas(null, id).ventasQueryDetalle;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!VentaData) {
    return <div>No se encontró la venta.</div>;
  }

  return (
    <div className="ventas-detail">
      <h2>Detalle de la Venta</h2>
      <div className="ventas-detail-section">
        <h3>Información del Producto</h3>
        <p>
          <strong>Familia:</strong> {VentaData.Producto.familia}
        </p>
        <p>
          <strong>Marca:</strong> {VentaData.Producto.marca}
        </p>
        <p>
          <strong>Modelo:</strong> {VentaData.Producto.modelo}
        </p>
      </div>
      <div className="ventas-detail-section">
        <h3>Información del Cliente</h3>
        <p>
          <strong>Nombre:</strong> {VentaData.Cliente.nombre}{" "}
          {VentaData.Cliente.apellido}
        </p>
        <p>
          <strong>Email:</strong> {VentaData.Cliente.mail}
        </p>
      </div>
      <div className="ventas-detail-section">
        <h3>Información del Vendedor</h3>
        <p>
          <strong>Nombre:</strong> {VentaData.Usuario.nombre}{" "}
          {VentaData.Usuario.apellido}
        </p>
        <p>
          <strong>Email:</strong> {VentaData.Usuario.email}
        </p>
      </div>
      <div className="ventas-detail-section">
        <h3>Detalles Financieros</h3>
        <p>
          <strong>Precio:</strong> {VentaData.moneda}
          {VentaData.precio}
        </p>
        <p>
          <strong>Anticipo:</strong> {VentaData.moneda}
          {VentaData.anticipo}
        </p>
        <p>
          <strong>Saldo a Financiar:</strong> {VentaData.moneda}
          {VentaData.saldoAFinanciar}
        </p>
        <p>
          <strong>IVA:</strong> {VentaData.moneda}
          {VentaData.IVA}
        </p>
        <p>
          <strong>Interés:</strong> {VentaData.interes * 100}%
        </p>
        <p>
          <strong>Saldo:</strong> {VentaData.moneda}
          {VentaData.saldo}
        </p>
        <p>
          <strong>Saldo con Interés:</strong> {VentaData.moneda}
          {VentaData.saldoConInteres}
        </p>
        <p>
          <strong>Precio Final:</strong> {VentaData.moneda}
          {VentaData.PrecioFinal}
        </p>
      </div>
      <div className="ventas-detail-section">
        <h3>Información de la Venta</h3>

        <p>
          <strong>Fecha de Cotización:</strong>{" "}
          {new Date(VentaData.fechaDeCreacion).toLocaleDateString()}
        </p>

        {VentaData.fechaVenta && (
          <p>
            <strong>Fecha de Venta:</strong>{" "}
            {new Date(VentaData.fechaVenta).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}
