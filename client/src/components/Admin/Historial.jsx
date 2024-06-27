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
    reset: reselHistorial,
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

  const handleClear = () => {
    setSelectedVendedor(null);
    setNumeroCotizacion("");
    reselHistorial();
  };

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
          <br />
          <div>
            <label htmlFor="numeroCotizacion">Número de Cotización: </label>
            <input
              type="number"
              id="numeroCotizacion"
              value={numeroCotizacion}
              onChange={handleNumeroCotizacionChange}
            />
          </div>
          <button className="form-submit" type="submit">
            Enviar
          </button>
          <button
            className="form-submit"
            type="button"
            onClick={handleClear}
            style={{ marginLeft: "10px" }}
          >
            Limpiar búsqueda
          </button>
        </form>
      )}
      <br />
      <br />
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
              <br />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <span>Número de Cotización: {detalle.numeroCotizacion}</span>
                <span>Precio: {detalle.precio}</span>
                <span>Anticipo: {detalle.anticipo}</span>
                <span>Saldo a Financiar: {detalle.saldoAFinanciar}</span>
                <span>IVA: {detalle.IVA}</span>
                <span>Precio Final: {detalle.PrecioFinal}</span>
                <span>Fecha de Creación: {detalle.fechaDeCreacion}</span>
                <span>Fecha de Modificación: {detalle.fechaModi}</span>
                <span>
                  <strong>Producto:</strong> {detalle.familia} {detalle.marca}{" "}
                  {detalle.modelo}
                </span>
                <span>
                  <strong>Cliente:</strong> {detalle.nombreCliente}{" "}
                  {detalle.apellidoCliente}
                </span>
              </div>
              <br />
            </div>
          ))
        ) : (
          <p>No se encontraron detalles para este usuario.</p>
        )}
      </div>
    </div>
  );
}
