import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const Cotizador = () => {
  const { auth } = useAuth();
  const idUsuario = auth?.id;

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label>Vendedor</label>
          <input
            type="number"
            name="idUsuario"
            placeholder={`${auth?.nombre} ${auth?.apellido}`}
            onChange={handleChange}
            readOnly
          />
          <div>
            <label>Cliente</label>
            <input
              type="number"
              name="idCliente"
              value={formData.idCliente}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Producto</label>
            <input
              type="number"
              name="idProducto"
              value={formData.idProducto}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Moneda:</label>
            <select
              name="moneda"
              value={formData.moneda}
              onChange={handleChange}
            >
              <option value="$">$</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <label>Anticipo:</label>
        <input
          type="number"
          name="anticipo"
          value={formData.anticipo}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Saldo a Financiar:</label>
        <input
          type="number"
          name="saldoAFinanciar"
          value={formData.saldoAFinanciar}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Cuotas:</label>
        <select name="cuotas" value={formData.cuotas} onChange={handleChange}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>IVA (10.5%):</label>
        <input type="number" name="IVA" value={formData.IVA} disabled />
      </div>
      <input type="hidden" name="interes" value={formData.interes} />
      <div>
        <label>Saldo:</label>
        <input type="number" name="saldo" value={formData.saldo} disabled />
      </div>
      <div>
        <label>Saldo con Interés:</label>
        <input
          type="number"
          name="saldoConInteres"
          value={formData.saldoConInteres}
          disabled
        />
      </div>
      <div>
        <label>Precio Final:</label>
        <input
          type="number"
          name="PrecioFinal"
          value={formData.PrecioFinal}
          disabled
        />
      </div>
      <div>
        <button type="submit">Enviar</button>
      </div>
    </form>
  );
};

export default Cotizador;
