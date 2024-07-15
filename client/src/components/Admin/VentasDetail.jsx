import React from "react";
import { useParams } from "react-router-dom";
import { useVentas } from "../../hooks/useCotizaciones";
import Spinner from "../../UI/Spinner";

export default function VentasDetail() {
  const { id } = useParams();
  const { data: VentaData, isLoading } = useVentas(null, id).ventasQueryDetalle;

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!VentaData) {
    return <div>No se encontró la venta.</div>;
  }

  return (
    <div className="form-container1">
      <h2>Detalle de la Venta</h2>
      <br />
      <div className="detail-section">
        <h4>Producto</h4>
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
        <h4>Cliente</h4>
        <div className="detail-item">
          <strong>Nombre:</strong>{" "}
          {`${VentaData.Cliente.nombre} ${VentaData.Cliente.apellido}`}
        </div>
        <div className="detail-item">
          <strong>Email:</strong> {VentaData.Cliente.mail}
        </div>
      </div>
      <div className="detail-section">
        <h4>Vendedor</h4>
        <div className="detail-item">
          <strong>Nombre:</strong>{" "}
          {`${VentaData.Usuario.nombre} ${VentaData.Usuario.apellido}`}
        </div>
        <div className="detail-item">
          <strong>Email:</strong> {VentaData.Usuario.email}
        </div>
      </div>
      <br />
      <div className="detail-section">
        <h4>Detalles Financieros</h4>
        <div className="detail-item">
          <strong>Precio de Venta:</strong> {VentaData.moneda}{" "}
          {VentaData.precio}
        </div>
        <div className="detail-item">
          <strong>Anticipo:</strong> {VentaData.moneda} {VentaData.anticipo}
        </div>
        <div className="detail-item">
          <strong>Saldo a Financiar:</strong> {VentaData.moneda}{" "}
          {VentaData.saldoAFinanciar}
        </div>
        <div className="detail-item">
          <strong>IVA:</strong> {VentaData.IVA}
        </div>

        <div className="detail-item">
          <strong>Financiación:</strong> {VentaData.cuotas} Cuotas de{" "}
          {VentaData.moneda}
          {VentaData.cuotaValor}
        </div>
        <div className="detail-item">
          <strong>Precio Final:</strong> {VentaData.moneda}{" "}
          {VentaData.PrecioFinal}
        </div>
      </div>
      <br />
      <div className="detail-section">
        <h4>Información de la Venta</h4>
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
