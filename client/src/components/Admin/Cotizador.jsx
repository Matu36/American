import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useClientes } from "../../hooks/useClientes";
import { useProducto } from "../../hooks/useProductos";
import Select from "react-select";
import { useCotizaciones } from "../../hooks/useCotizaciones";
import { useUsuario } from "../../hooks/useUsuarios";
import BackButton from "../../UI/BackButton";

const Cotizador = () => {
  const { auth } = useAuth();
  const { mutate: cotizacionCreate } = useCotizaciones().cotizacionMutation;
  const idUsuario = auth?.id;

  // CHEQUEAMOS EL ROL PARA EL INTERES //
  const { mutate: checkRol, data: rolData } = useUsuario().CheckRolMutation;

  const handleCheckRol = () => {
    checkRol({ idUsuario });
  };

  useEffect(() => {
    if (idUsuario) {
      handleCheckRol();
    }
  }, [idUsuario]);

  const role = rolData?.data.rol;

  const [selectedCliente, setSelectedCliente] = useState(null);
  const [familias, setFamilias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [selectedFamilia, setSelectedFamilia] = useState(null);
  const [selectedMarca, setSelectedMarca] = useState(null);
  const [selectedModelo, setSelectedModelo] = useState(null);
  const [selectedProducto, setSelectedProducto] = useState(null);

  const { data: clientes, isLoading } = useClientes(idUsuario).clienteoQuery;
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
    anticipo: 0,
    saldoAFinanciar: 0,
    IVA: 10.5,
    moneda: "",
    PrecioFinal: "",
    cuotas: 1,
    cuotaValor: null,
    interes: 0,
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
    if (formData.cuotas > 1) {
      setFormData((prevData) => ({
        ...prevData,
        interes: formData.cuotas * 3,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        interes: 0, // Deja vacío para una cuota
      }));
    }
  }, [formData.cuotas]);

  useEffect(() => {
    let precio = parseFloat(formData.precio) || 0;
    let anticipo = parseFloat(formData.anticipo) || 0;
    let IVA = parseFloat(formData.IVA) || 0;
    let interes = parseFloat(formData.interes) || 0;
    let saldoAFinanciar = (precio - anticipo) * (1 + IVA / 100);
    let cuotaValor = null;
    if (formData.cuotas > 0) {
      cuotaValor = (saldoAFinanciar * (1 + interes / 100)) / formData.cuotas;
    }
    let PrecioFinal =
      formData.cuotas === 1
        ? precio * (1 + IVA / 100)
        : saldoAFinanciar * (1 + interes / 100) + anticipo;

    setFormData((prevData) => ({
      ...prevData,
      saldoAFinanciar: saldoAFinanciar.toFixed(2),
      cuotaValor: cuotaValor !== null ? cuotaValor.toFixed(2) : null,
      PrecioFinal: PrecioFinal.toFixed(2),
    }));
  }, [
    formData.precio,
    formData.anticipo,
    formData.IVA,
    formData.cuotas,
    formData.interes,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    cotizacionCreate(formData);
    setFormData({
      idUsuario: idUsuario,
      idCliente: "",
      idProducto: "",
      precio: "",
      anticipo: 0,
      saldoAFinanciar: 0,
      IVA: 10.5,
      moneda: "",
      PrecioFinal: "",
      cuotas: 0,
      cuotaValor: null,
    });
    setSelectedCliente(null);
    setSelectedFamilia(null);
    setSelectedMarca(null);
    setSelectedModelo(null);
    setSelectedProducto(null);
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
      <BackButton />
      <div>
        {" "}
        <h2 className="tituloCompo">Cotizador</h2> <br />
      </div>
      <div></div>
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
        <label className="form-label">
          Cliente <span className="obligatorio">*</span>
        </label>
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
          required
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
        <label className="form-label">
          Categoría <span className="obligatorio">*</span>
        </label>
        <Select
          options={familias}
          value={selectedFamilia}
          onChange={setSelectedFamilia}
          placeholder="Seleccionar familia"
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">
          Marca <span className="obligatorio">*</span>
        </label>
        <Select
          options={marcas}
          value={selectedMarca}
          onChange={setSelectedMarca}
          placeholder="Seleccionar marca"
          isDisabled={!selectedFamilia}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">
          Modelo <span className="obligatorio">*</span>
        </label>
        <Select
          options={modelos}
          value={selectedModelo}
          onChange={setSelectedModelo}
          placeholder="Seleccionar modelo"
          isDisabled={!selectedMarca}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">
          Moneda:<span className="obligatorio">*</span>
        </label>
        <select
          name="moneda"
          value={formData.moneda}
          onChange={handleChange}
          className="form-input"
          required
        >
          <option value="" disabled>
            Seleccionar
          </option>
          <option value="$">$</option>
          <option value="USD">USD</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">
          Precio de venta: <span className="obligatorio">*</span>
        </label>
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
        <label className="form-label">
          IVA (10.5%): <span className="obligatorio">*</span>
        </label>
        <input
          type="number"
          name="IVA"
          value={formData.IVA}
          onChange={handleChange}
          className="form-input"
          disabled={role === "vendedor"}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Cuotas</label>
        <select
          name="cuotas"
          value={formData.cuotas}
          onChange={handleChange}
          className="form-input"
        >
          <option value={1}>Contado</option>
          {Array.from({ length: 11 }, (_, i) => i + 2).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      {formData.cuotas > 1 && (
        <>
          <div className="form-group">
            <label className="form-label">Anticipo:</label>
            <input
              type="number"
              name="anticipo"
              value={formData.anticipo}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Valor de Cuota:</label>
            <input
              type="number"
              name="cuotaValor"
              value={formData.cuotaValor}
              onChange={handleChange}
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
        </>
      )}
      {role === "vendedor" ? (
        <div className="form-group">
          {/* Interés no visible para vendedores */}
        </div>
      ) : (
        <div className="form-group">
          <label className="form-label">Interés:</label>
          <input
            type="number"
            name="interes"
            value={formData.interes}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      )}

      <div className="form-group">
        <label className="form-label">
          Precio Final: <span className="obligatorio">*</span>
        </label>
        <input
          type="number"
          name="PrecioFinal"
          value={formData.PrecioFinal}
          disabled
          className="form-input"
        />
      </div>
      <div></div>
      <div>
        <button type="submit" className="form-submit">
          Guardar Cotización
        </button>
      </div>
    </form>
  );
};

export default Cotizador;
