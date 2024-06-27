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
              <ul>
                Número de Cotización: {detalle.numeroCotizacion}
                Precio: {detalle.precio}
                Anticipo: {detalle.anticipo}
                Saldo a Financiar: {detalle.saldoAFinanciar}
                IVA: {detalle.IVA}
                Precio Final: {detalle.PrecioFinal}
                Fecha de Creación: {detalle.fechaDeCreacion}
                Fecha de Modificación: {detalle.fechaModi}
                <strong>Producto:</strong> {detalle.familia}
                {detalle.marca}
                {detalle.modelo}
                <strong>Cliente:</strong> {detalle.nombreCliente}{" "}
                {detalle.apellidoCliente}
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
