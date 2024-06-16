import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useVentas } from "../../hooks/useCotizaciones";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

export default function Ventas() {
  const { auth } = useAuth();
  const [search, setSearch] = useState("");
  const idUsuario = auth?.id;

  const { ventasQueryById } = useVentas(idUsuario);
  const [ventas, setVentas] = useState(ventasQueryById.data);
  console.log(ventas);

  useEffect(() => {
    if (ventasQueryById.data) {
      setVentas(ventasQueryById.data);
    }
  }, [ventasQueryById.data]);

  useEffect(() => {
    filterByEmailAndEmpresa(search);
  }, [search, ventasQueryById.data]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterByEmailAndEmpresa = (value) => {
    if (!value) {
      setVentas(ventasQueryById.data);
    } else {
      const arrayCache = ventasQueryById.data.filter(
        (oper) =>
          oper.Cliente.apellido.toLowerCase().includes(value.toLowerCase()) ||
          oper.Producto.modelo.toLowerCase().includes(value.toLowerCase()) ||
          oper.Usuario.apellido.toLowerCase().includes(value.toLowerCase())
      );
      setVentas(arrayCache);
    }
  };

  const columns = [
    {
      name: "Producto",
      selector: (row) =>
        `${row.Producto.familia} ${row.Producto.marca} ${row.Producto.modelo}`,
      sortable: true,
    },
    {
      name: "Precio Final",
      selector: (row) => row.PrecioFinal,
      sortable: true,
    },
    {
      name: "Fecha de Venta",
      selector: (row) => new Date(row.fechaDeCreacion).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Vendedor",
      selector: (row) => `${row.Usuario.nombre} ${row.Usuario.apellido}`,
      sortable: true,
    },
    {
      name: "Cliente",
      selector: (row) => `${row.Cliente.nombre} ${row.Cliente.apellido}`,
      sortable: true,
    },
    {
      name: "Correo del Cliente",
      selector: (row) => row.Cliente.mail,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <Link to={`/admin/ventas/${row.id}`} className="custom-link">
          <button className="detalle">Detalle</button>
        </Link>
      ),
    },
  ];

  return (
    <div>
      <div className="productos">
        <div
          className="input-group mb-3 inputSearch"
          style={{ maxWidth: "40%" }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por APELLIDO DE CLIENTE - VENDEDOR O MODELO"
            onChange={handleOnChange}
            value={search}
            autoComplete="off"
            disabled={!ventasQueryById.data}
          />
        </div>
        {ventasQueryById.data ? (
          <DataTable columns={columns} data={ventas} pagination striped />
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    </div>
  );
}
