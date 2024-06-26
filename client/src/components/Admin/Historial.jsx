import React, { useState } from "react";
import Select from "react-select";
import { useUsuario } from "../../hooks/useUsuarios";
import { useHistorial } from "../../hooks/useHistorial";

export default function Historial() {
  const { data: vendedoresData, isLoading: isLoadingVendedores } =
    useUsuario().vendedoresQuery;
  const [selectedVendedor, setSelectedVendedor] = useState(null);
  const [numeroCotizacion, setNumeroCotizacion] = useState("");
  const {
    mutate: VendedorHistorial,
    data: historialData,
    isLoading: isLoadingHistorial,
  } = useHistorial().historialVendedorMutation;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedVendedor || !numeroCotizacion) {
      alert(
        "Por favor, seleccione un vendedor e ingrese un número de cotización."
      );
      return;
    }

    const combinedValue = `${selectedVendedor.value}${numeroCotizacion}`;
    VendedorHistorial({ combinedValue: combinedValue });
  };

  const handleVendedorChange = (selectedOption) => {
    setSelectedVendedor(selectedOption);
  };

  const handleNumeroCotizacionChange = (e) => {
    setNumeroCotizacion(e.target.value);
  };

  const options = vendedoresData?.map((vendedor) => ({
    value: vendedor.id,
    label: `${vendedor.nombre} ${vendedor.apellido}`,
  }));

  return (
    <div className="form-container1">
      <h2>Historial</h2>
      {isLoadingVendedores ? (
        <p>Cargando...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="vendedor">Vendedor:</label>
            <Select
              id="vendedor"
              options={options}
              value={selectedVendedor}
              onChange={handleVendedorChange}
            />
          </div>
          <div>
            <label htmlFor="numeroCotizacion">Número de Cotización:</label>
            <input
              type="number"
              id="numeroCotizacion"
              value={numeroCotizacion}
              onChange={handleNumeroCotizacionChange}
            />
          </div>
          <button type="submit">Enviar</button>
        </form>
      )}

      <div>
        <h3>Historial de Cotizaciones</h3>
        {isLoadingHistorial ? (
          <p>Cargando historial...</p>
        ) : historialData &&
          historialData.data &&
          historialData.data.length > 0 ? (
          historialData.data.map((detalle) => (
            <div key={detalle.id}>
              <p>
                <strong>Detalles de la Cotización:</strong>
              </p>
              <ul>
                <li>
                  Número de Cotización: {detalle.Cotizacione.numeroCotizacion}
                </li>
                <li>Precio: {detalle.Cotizacione.precio}</li>
                <li>Anticipo: {detalle.Cotizacione.anticipo}</li>
                <li>
                  Saldo a Financiar: {detalle.Cotizacione.saldoAFinanciar}
                </li>
                <li>IVA: {detalle.Cotizacione.IVA}</li>
                <li>Moneda: {detalle.Cotizacione.moneda}</li>
                <li>Precio Final: {detalle.Cotizacione.PrecioFinal}</li>
                <li>Estado: {detalle.Cotizacione.estado}</li>
                <li>
                  Fecha de Creación: {detalle.Cotizacione.fechaDeCreacion}
                </li>
                <li>Fecha de Modificación: {detalle.Cotizacione.fechaModi}</li>
                <li>
                  <strong>Vendedor:</strong>{" "}
                  {detalle.Cotizacione.Usuario.nombre}{" "}
                  {detalle.Cotizacione.Usuario.apellido}
                </li>
                <li>
                  <strong>Producto:</strong>{" "}
                  {detalle.Cotizacione.Producto.modelo}
                </li>
                <li>
                  <strong>Cliente:</strong> {detalle.Cotizacione.Cliente.nombre}{" "}
                  {detalle.Cotizacione.Cliente.apellido}
                </li>
              </ul>
            </div>
          ))
        ) : (
          <p>No se encontraron detalles para este usuario.</p>
        )}
      </div>
    </div>
  );
}
