import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useVenta } from "../../hooks/useVentas";
import FormVenta from "./FormVenta";

export default function Ventas() {
  const { data, isLoaduing } = useVenta().ventasQuery;

  const ventasAll = data?.allVentas;

  const [search, setSearch] = useState("");
  const [ventas, setVentas] = useState(ventasAll);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  function handleMostrarFormulario() {
    setMostrarFormulario(true);
  }

  function handleCerrarFormulario() {
    setMostrarFormulario(false);
  }

  //-------------------------------- SEARCHBAR --------------------------- //

  useEffect(() => {
    filterByCodOrMarca(search);
  }, [search]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterByCodOrMarca = (value) => {
    if (!value) {
      setVentas(ventasAll);
    } else {
      const arrayCache = ventasAll?.filter(
        (oper) =>
          oper.marca.toLowerCase().includes(value.toLowerCase()) ||
          oper.codigo.toLowerCase().includes(value.toLowerCase()) ||
          oper.comprador.toLowerCase().includes(value.toLowerCase())
      );
      setVentas(arrayCache);
    }
  };

  //-------------------------------- FIN SEARCHBAR --------------------------- //

  const columns = [
    { name: "Marca", selector: (row) => row.marca, sortable: true },
    { name: "Codigo", selector: (row) => row.codigo, sortable: true },
    { name: "Costo", selector: (row) => row.costo, sortable: true },
    { name: "Precio", selector: (row) => row.precio, sortable: true },
    { name: "Cuota1", selector: (row) => row.cuota1, sortable: true },
    { name: "Cuota2", selector: (row) => row.cuota2, sortable: true },
    { name: "Saldo", selector: (row) => row.saldo, sortable: true },
    { name: "Comprador", selector: (row) => row.comprador, sortable: true },
    { name: "Vendedor", selector: (row) => row.vendedor, sortable: true },
  ];

  return (
    <div className="productos">
      {" "}
      <div className="input-group mb-3 inputSearch" style={{ maxWidth: "40%" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por CODIGO, MARCA O COMPRADOR"
          onChange={handleOnChange}
          value={search}
          autoComplete="off"
          disabled={!data}
        />
      </div>{" "}
      <button onClick={handleMostrarFormulario}>Agregar Venta</button>
      {mostrarFormulario && (
        <div>
          <FormVenta handleCerrarFormulario={handleCerrarFormulario} />
        </div>
      )}
      <DataTable
        columns={columns}
        data={ventas}
        pagination
        striped
        responsive
      />
    </div>
  );
}
