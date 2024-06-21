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
    <div className="clientes-detail-container">
      <h2>Detalle de la Venta</h2>

      <div className="detail-section">
        <h3>Información del Producto</h3>
        <div className="detail-item">
          <strong>Familia:</strong> {VentaData.Producto.familia}
        </div>
        <div className="detail-item">
          <strong>Marca:</strong> {VentaData.Producto.marca}
        </div>
        <div className="detail-item">
          <strong>Modelo:</strong> {VentaData.Producto.modelo}
        </div>
      </div>

      <div className="detail-section">
        <h3>Información del Cliente</h3>
        <div className="detail-item">
          <strong>Nombre:</strong>{" "}
          {`${VentaData.Cliente.nombre} ${VentaData.Cliente.apellido}`}
        </div>
        <div className="detail-item">
          <strong>Email:</strong> {VentaData.Cliente.mail}
        </div>
      </div>

      <div className="detail-section">
        <h3>Información del Vendedor</h3>
        <div className="detail-item">
          <strong>Nombre:</strong>{" "}
          {`${VentaData.Usuario.nombre} ${VentaData.Usuario.apellido}`}
        </div>
        <div className="detail-item">
          <strong>Email:</strong> {VentaData.Usuario.email}
        </div>
      </div>

      <div className="detail-section">
        <h3>Detalles Financieros</h3>
        <div className="detail-item">
          <strong>Precio:</strong> {VentaData.moneda} {VentaData.precio}
        </div>
        <div className="detail-item">
          <strong>Anticipo:</strong> {VentaData.moneda} {VentaData.anticipo}
        </div>
        <div className="detail-item">
          <strong>Saldo a Financiar:</strong> {VentaData.moneda}{" "}
          {VentaData.saldoAFinanciar}
        </div>
        <div className="detail-item">
          <strong>IVA:</strong> {VentaData.moneda} {VentaData.IVA}
        </div>
        <div className="detail-item">
          <strong>Interés:</strong> {VentaData.interes * 100}%
        </div>
        <div className="detail-item">
          <strong>Saldo:</strong> {VentaData.moneda} {VentaData.saldo}
        </div>
        <div className="detail-item">
          <strong>Saldo con Interés:</strong> {VentaData.moneda}{" "}
          {VentaData.saldoConInteres}
        </div>
        <div className="detail-item">
          <strong>Precio Final:</strong> {VentaData.moneda}{" "}
          {VentaData.PrecioFinal}
        </div>
      </div>

      <div className="detail-section">
        <h3>Información de la Venta</h3>
        <div className="detail-item">
          <strong>Fecha de Cotización:</strong>{" "}
          {new Date(VentaData.fechaDeCreacion).toLocaleDateString()}
        </div>
        {VentaData.fechaVenta && (
          <div className="detail-item">
            <strong>Fecha de Venta:</strong>{" "}
            {new Date(VentaData.fechaVenta).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
}
