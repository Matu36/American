import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useClientes } from "../../hooks/useClientes";
import { useProducto } from "../../hooks/useProductos";
import Select from "react-select";

const Cotizador = () => {
  const { auth } = useAuth();
  const idUsuario = auth?.id;
  const [selectedCliente, setSelectedCliente] = useState(null);

  const [familias, setFamilias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);

  const [selectedFamilia, setSelectedFamilia] = useState(null);
  const [selectedMarca, setSelectedMarca] = useState(null);
  const [selectedModelo, setSelectedModelo] = useState(null);
  const [selectedProducto, setSelectedProducto] = useState(null);

  const { data: clientes, isLoading } = useClientes().clienteoQuery;

  const { data: productos } = useProducto().productosParaCotizarQuery;

  useEffect(() => {
    if (!isLoading && productos) {
      const familiasUnicas = Array.from(
        new Set(productos.map((p) => p.familia))
      );
      setFamilias(familiasUnicas.map((f) => ({ value: f, label: f })));
    }
  }, [productos, isLoading]);

  useEffect(() => {
    if (selectedFamilia) {
      const marcasFiltradas = productos.filter(
        (p) => p.familia === selectedFamilia.value
      );
      const marcasUnicas = Array.from(
        new Set(marcasFiltradas.map((p) => p.marca))
      );
      setMarcas(marcasUnicas.map((m) => ({ value: m, label: m })));
      setModelos([]);
      setSelectedMarca(null);
      setSelectedModelo(null);
    }
  }, [selectedFamilia]);

  useEffect(() => {
    if (selectedMarca) {
      const modelosFiltrados = productos.filter(
        (p) => p.marca === selectedMarca.value
      );
      const modelosUnicos = Array.from(
        new Set(modelosFiltrados.map((p) => p.modelo))
      );
      setModelos(modelosUnicos.map((m) => ({ value: m, label: m })));
      setSelectedModelo(null);
    }
  }, [selectedMarca]);

  useEffect(() => {
    if (selectedModelo) {
      const producto = productos.find((p) => p.modelo === selectedModelo.value);
      setSelectedProducto(producto);
      setFormData((prevData) => ({
        ...prevData,
        idProducto: producto?.id,
      }));
    }
  }, [selectedModelo, productos]);

  const [formData, setFormData] = useState({
    idUsuario: idUsuario,
    idCliente: "",
    idProducto: "",
    precio: "",
    anticipo: "",
    saldoAFinanciar: "",
    IVA: 10.5,
    moneda: "",
    interes: 4,
    saldo: "",
    saldoConInteres: "",
    PrecioFinal: "",
    estado: 1,
    fechaDeCreacion: new Date().toISOString().split("T")[0],
    fechaModi: new Date().toISOString().split("T")[0],
    fechaVenta: "",
    cuotas: 12,
  });

  useEffect(() => {
    if (selectedCliente) {
      setFormData((prevData) => ({
        ...prevData,
        idCliente: selectedCliente.id,
        nombreCliente: selectedCliente.nombre,
        apellidoCliente: selectedCliente.apellido,
        cuitCliente: selectedCliente.CUIT,
      }));
    }
  }, [selectedCliente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClienteChange = (selectedOption) => {
    setSelectedCliente(selectedOption);
  };

  useEffect(() => {
    const { precio, anticipo, saldoAFinanciar, interes, cuotas, moneda } =
      formData;
    const iva = 10.5;
    const saldo = parseFloat(anticipo) + parseFloat(saldoAFinanciar);
    const saldoConInteres = saldo + saldo * (interes / 100) * cuotas;
    let PrecioFinal =
      parseFloat(precio) + saldoConInteres + saldoConInteres * (iva / 100);
    setFormData((prevData) => ({
      ...prevData,
      saldo,
      saldoConInteres,
      PrecioFinal,
    }));
  }, [
    formData.precio,
    formData.anticipo,
    formData.saldoAFinanciar,
    formData.cuotas,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Aquí enviarías los datos al backend
  };

  const clienteOptions = clientes
    ? clientes.map((cliente) => ({
        value: cliente.id,
        label: cliente.mail,
        id: cliente.id,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        CUIT: cliente.CUIT,
      }))
    : [];

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label className="form-label">Vendedor</label>
        <input
          type="number"
          name="idUsuario"
          placeholder={`${auth?.nombre} ${auth?.apellido}`}
          onChange={handleChange}
          readOnly
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Cliente</label>
        <Select
          name="idCliente"
          value={
            clienteOptions.find(
              (option) => option.value === formData.idCliente
            ) || null
          }
          onChange={handleClienteChange}
          options={clienteOptions}
          isLoading={isLoading}
          isClearable
          className="form-input"
        />
        {selectedCliente && (
          <div className="cliente-info">
            <div className="form-group cliente-detail">
              <label className="form-label small">Nombre:</label>
              <input
                type="text"
                name="nombreCliente"
                value={selectedCliente.nombre}
                disabled
                className="form-input small"
              />
            </div>
            <div className="form-group cliente-detail">
              <label className="form-label small">Apellido:</label>
              <input
                type="text"
                name="apellidoCliente"
                value={selectedCliente.apellido}
                disabled
                className="form-input small"
              />
            </div>
            <div className="form-group cliente-detail">
              <label className="form-label small">CUIT:</label>
              <input
                type="text"
                name="cuitCliente"
                value={selectedCliente.CUIT}
                disabled
                className="form-input small"
              />
            </div>
          </div>
        )}
      </div>
      <div className="form-group">
        <label className="form-label">Familia</label>
        <Select
          options={familias}
          value={selectedFamilia}
          onChange={setSelectedFamilia}
          placeholder="Seleccionar familia"
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Marca</label>
        <Select
          options={marcas}
          value={selectedMarca}
          onChange={setSelectedMarca}
          placeholder="Seleccionar marca"
          isDisabled={!selectedFamilia}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Modelo</label>
        <Select
          options={modelos}
          value={selectedModelo}
          onChange={setSelectedModelo}
          placeholder="Seleccionar modelo"
          isDisabled={!selectedMarca}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Moneda:</label>
        <select
          name="moneda"
          value={formData.moneda}
          onChange={handleChange}
          className="form-input"
        >
          <option value="$">$</option>
          <option value="USD">USD</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Precio:</label>
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Anticipo:</label>
        <input
          type="number"
          name="anticipo"
          value={formData.anticipo}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Saldo a Financiar:</label>
        <input
          type="number"
          name="saldoAFinanciar"
          value={formData.saldoAFinanciar}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Cuotas:</label>
        <select
          name="cuotas"
          value={formData.cuotas}
          onChange={handleChange}
          className="form-input"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">IVA (10.5%):</label>
        <input
          type="number"
          name="IVA"
          value={formData.IVA}
          disabled
          className="form-input"
        />
      </div>
      <input
        type="hidden"
        name="interes"
        value={formData.interes}
        className="form-input"
      />
      <div className="form-group">
        <label className="form-label">Saldo:</label>
        <input
          type="number"
          name="saldo"
          value={formData.saldo}
          disabled
          className="form-input"
        />
      </div>

      <input
        type="number"
        name="saldoConInteres"
        value={formData.saldoConInteres}
        hidden
        className="form-input"
      />

      <div className="form-group">
        <label className="form-label">Precio Final:</label>
        <input
          type="number"
          name="PrecioFinal"
          value={formData.PrecioFinal}
          disabled
          className="form-input"
        />
      </div>
      <div>
        <button type="submit" className="form-submit">
          Guardar Cotización
        </button>
      </div>
    </form>
  );
};

export default Cotizador;
