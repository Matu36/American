import React, { useState } from "react";
import Select from "react-select";
import { useUsuario } from "../../hooks/useUsuarios";
import { useHistorial } from "../../hooks/useHistorial";
import { useProducto } from "../../hooks/useProductos";
import { useCotizaciones } from "../../hooks/useCotizaciones";
import HistorialRanking from "./HistorialRanking";
import HistorialFechaExcel from "./Excel/HistorialFechaExcel";
import HistorialProductoExcel from "./Excel/HistorialProductoExcel";
import HistorialVendedorExcel from "./Excel/HistorialVendedorExcel";
import BackButton from "../../UI/BackButton";

export default function Historial() {
  const { data: vendedoresData, isLoading: isLoadingVendedores } =
    useUsuario().vendedoresQuery;
  const { data: productos } = useProducto().productosParaCotizarQuery;
  const [selectedProducto, setSelectedProducto] = useState(null);

  const [selectedVendedor, setSelectedVendedor] = useState(null);
  const [numeroCotizacion, setNumeroCotizacion] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  const {
    mutate: CotisPorFecha,
    data: fechasData,
    reset: resetFechas,
    isLoading: isLoadingFechas,
  } = useCotizaciones().cotisPorFechaMutation;

  const {
    mutate: VendedorHistorial,
    data: historialData,
    reset: resetHistorial,
    isLoading: isLoadingHistorial,
  } = useHistorial().historialVendedorMutation;

  const {
    mutate: VendedorModelo,
    data: ModeloData,
    reset: resetModelo,
    isLoading: isLoadingModelo,
  } = useHistorial().historialModeloMutation;

  const handleSubmitFechas = (e) => {
    e.preventDefault();

    if (!fechaDesde || !fechaHasta) {
      alert("Por favor, ingrese ambas fechas.");
      return;
    }

    CotisPorFecha({ fechaDesde, fechaHasta });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedVendedor || !numeroCotizacion) {
      alert(
        "Por favor, seleccione un vendedor e ingrese un número de cotización."
      );
      return;
    }

    const combinedValue = `${selectedVendedor.value}-${numeroCotizacion}`;
    VendedorHistorial({ combinedValue: combinedValue });
  };

  const handleProductoSubmit = (e) => {
    e.preventDefault();

    if (!selectedProducto) {
      alert("Por favor, seleccione un producto.");
      return;
    }

    const modelo = selectedProducto.value;

    VendedorModelo({ modelo: modelo });
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
    setSelectedProducto(null);
    resetHistorial();
    resetModelo();
    setFechaDesde("");
    setFechaHasta("");
    resetFechas();
  };

  const handleProductoChange = (selectedOption) => {
    setSelectedProducto(selectedOption);
  };

  const productoOptions = productos?.map((producto) => ({
    value: producto.modelo,
    label: `${producto.familia} ${producto.marca} ${producto.modelo}`,
  }));

  return (
    <div className="form-container1">
      <BackButton />
      <HistorialRanking />
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
            Buscar por Vendedor
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
      <div>
        <HistorialVendedorExcel data={historialData} />
      </div>
      <br />
      <div>
        {isLoadingHistorial ? (
          <p>Cargando historial...</p>
        ) : historialData &&
          historialData.data &&
          historialData.data.length > 0 ? (
          historialData.data.map((detalle) => (
            <div key={detalle.id}>
              <p style={{ fontSize: "larger" }}>
                <strong
                  style={{
                    color: detalle.estado === 2 ? "lightgreen" : "inherit",
                    textShadow:
                      detalle.estado === 2
                        ? "0 0 10px green, 0 0 20px green, 0 0 30px green"
                        : "none",
                  }}
                >
                  {detalle.estado === 1
                    ? "Detalles de la Cotización:"
                    : "Cotización Concretada"}
                </strong>
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  color: detalle.estado === 2 ? "lightgreen" : "inherit",
                }}
              >
                <span>
                  <strong>Precio de Venta:</strong> {detalle.moneda}{" "}
                  {detalle.precio}
                </span>
                <span>
                  <strong>Anticipo:</strong> {detalle.moneda} {detalle.anticipo}
                </span>
                <span>
                  <strong>Saldo a Financiar:</strong> {detalle.moneda}{" "}
                  {detalle.saldoAFinanciar}
                </span>
                <span>
                  <strong>Financiación:</strong> {detalle.cuotas} Cuotas de{" "}
                  {detalle.moneda} {detalle.cuotaValor}
                </span>
                <span>
                  <strong>IVA:</strong> {detalle.IVA}
                </span>
                <span>
                  <strong>Precio Final:</strong> {detalle.moneda}{" "}
                  {detalle.PrecioFinal}
                </span>
                <span>
                  <strong>Fecha de Creación:</strong> {detalle.fechaDeCreacion}
                </span>
                <span>
                  <strong>Fecha de Modificación:</strong> {detalle.fechaModi}
                </span>
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
          <p></p>
        )}
      </div>
      <form onSubmit={handleProductoSubmit}>
        <div>
          <label htmlFor="producto">Producto:</label>
          <Select
            id="producto"
            options={productoOptions}
            value={selectedProducto}
            onChange={handleProductoChange}
          />
        </div>
        <button className="form-submit" type="submit">
          Buscar por Producto
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
      <div>
        <br />
        <div>
          <HistorialProductoExcel data={ModeloData} />
        </div>
        {isLoadingModelo ? (
          <p>Cargando historial...</p>
        ) : ModeloData && ModeloData.data && ModeloData.data.length > 0 ? (
          ModeloData.data.map((detalle) => (
            <div key={detalle.id}>
              <p style={{ fontSize: "larger" }}>
                <strong
                  style={{
                    color: detalle.estado === 2 ? "lightgreen" : "inherit",
                    textShadow:
                      detalle.estado === 2
                        ? "0 0 10px green, 0 0 20px green, 0 0 30px green"
                        : "none",
                  }}
                >
                  {" "}
                  {detalle.estado === 1
                    ? "Detalles de la Cotización:"
                    : "Cotización Concretada"}
                </strong>
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  color: detalle.estado === 2 ? "lightgreen" : "inherit",
                }}
              >
                <span>
                  <strong>Número de Cotización:</strong>{" "}
                  {detalle.numeroCotizacion}
                </span>
                <span>
                  <strong>Precio de Venta:</strong> {detalle.moneda}{" "}
                  {detalle.precio}
                </span>
                <span>
                  <strong>Anticipo:</strong> {detalle.moneda} {detalle.anticipo}
                </span>
                <span>
                  <strong>Saldo a Financiar:</strong> {detalle.moneda}{" "}
                  {detalle.saldoAFinanciar}
                </span>
                <span>
                  <strong>Financiación:</strong> {detalle.cuotas} Cuotas de{" "}
                  {detalle.moneda} {detalle.cuotaValor}
                </span>
                <span>
                  <strong>IVA:</strong> {detalle.IVA}
                </span>
                <span>
                  <strong>Precio Final:</strong> {detalle.moneda}{" "}
                  {detalle.PrecioFinal}
                </span>
                <span>
                  <strong>Fecha de Creación:</strong> {detalle.fechaDeCreacion}
                </span>
                <span>
                  <strong>Fecha de Modificación:</strong> {detalle.fechaModi}
                </span>
                <span>
                  <strong>Producto:</strong> {detalle.Producto.familia}{" "}
                  {detalle.Producto.marca} {detalle.Producto.modelo}
                </span>
                <span>
                  <strong>Cliente:</strong> {detalle.Cliente.nombre}{" "}
                  {detalle.Cliente.apellido}
                </span>
              </div>
              <br />
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
      <h4> Filtrar por Fecha</h4>
      <form onSubmit={handleSubmitFechas}>
        <div>
          <label htmlFor="fechaDesde">Fecha Desde:</label>
          <input
            type="date"
            id="fechaDesde"
            value={fechaDesde}
            onChange={(e) => setFechaDesde(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor="fechaHasta">Fecha Hasta:</label>
          <input
            type="date"
            id="fechaHasta"
            value={fechaHasta}
            onChange={(e) => setFechaHasta(e.target.value)}
          />
        </div>
        <br />
        <button className="form-submit" type="submit">
          Buscar por Fechas
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
      <br />
      <div>
        <HistorialFechaExcel
          data={fechasData}
          fechaDesde={fechaDesde}
          fechaHasta={fechaHasta}
        />
      </div>
      <br />
      <div>
        {isLoadingFechas ? (
          <p>Cargando cotizaciones...</p>
        ) : fechasData && fechasData.data.length > 0 ? (
          fechasData.data.map((cotizacion) => (
            <div key={cotizacion.id}>
              <p style={{ fontSize: "larger" }}>
                <strong
                  style={{
                    color: cotizacion.estado === 2 ? "lightgreen" : "inherit",
                    textShadow:
                      cotizacion.estado === 2
                        ? "0 0 10px green, 0 0 20px green, 0 0 30px green"
                        : "none",
                  }}
                >
                  {" "}
                  {cotizacion.estado === 1
                    ? "Detalle de la Cotización:"
                    : "Cotización Concretada"}
                </strong>
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  color: cotizacion.estado === 2 ? "lightgreen" : "inherit",
                }}
              >
                <span>
                  <strong>Número de Cotización:</strong>{" "}
                  {cotizacion.numeroCotizacion}
                </span>
                <span>
                  <strong>Precio de Venta:</strong> {cotizacion.moneda}{" "}
                  {cotizacion.precio}
                </span>
                <span>
                  <strong>Anticipo:</strong> {cotizacion.moneda}{" "}
                  {cotizacion.anticipo}
                </span>
                <span>
                  <strong>Saldo a Financiar:</strong> {cotizacion.moneda}{" "}
                  {cotizacion.saldoAFinanciar}
                </span>
                <span>
                  <strong>Financiación:</strong> {cotizacion.cuotas} Cuotas de{" "}
                  {cotizacion.moneda} {cotizacion.cuotaValor}
                </span>
                <span>
                  <strong>IVA:</strong> {cotizacion.IVA}
                </span>
                <span>
                  <strong>Precio Final:</strong> {cotizacion.moneda}{" "}
                  {cotizacion.PrecioFinal}
                </span>
                <span>
                  <strong>Fecha de Creación:</strong>{" "}
                  {cotizacion.fechaDeCreacion}
                </span>
                <span>
                  <strong>Fecha de Modificación:</strong> {cotizacion.fechaModi}
                </span>
                <span>
                  <strong>Producto:</strong> {cotizacion.Producto?.marca}{" "}
                  {cotizacion.Producto?.modelo}
                </span>
                <span>
                  <strong>Cliente:</strong> {cotizacion.Cliente?.nombre}{" "}
                  {cotizacion.Cliente?.apellido}
                </span>
                <span>
                  <strong>Usuario:</strong> {cotizacion.Usuario?.nombre}{" "}
                  {cotizacion.Usuario?.apellido}
                </span>
              </div>
              <br />
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
