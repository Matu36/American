import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useCotizaciones } from "../../hooks/useCotizaciones";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

export default function Cotizaciones() {
  const { auth } = useAuth();
  const [search, setSearch] = useState("");
  const idUsuario = auth?.id;

  const { cotizacionesQueryById } = useCotizaciones(idUsuario);
  const [cotizaciones, setCotizaciones] = useState(cotizacionesQueryById.data);

  useEffect(() => {
    if (cotizacionesQueryById.data) {
      setCotizaciones(cotizacionesQueryById.data);
    }
  }, [cotizacionesQueryById.data]);

  useEffect(() => {
    filterByEmailAndEmpresa(search);
  }, [search, cotizacionesQueryById.data]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterByEmailAndEmpresa = (value) => {
    if (!value) {
      setCotizaciones(cotizacionesQueryById.data);
    } else {
      const arrayCache = cotizacionesQueryById.data.filter(
        (oper) =>
          (oper.numeroCotizacion &&
            oper.numeroCotizacion
              .toLowerCase()
              .includes(value.toLowerCase())) ||
          (oper.Producto.modelo &&
            oper.Producto.modelo.toLowerCase().includes(value.toLowerCase())) ||
          (oper.Usuario.apellido &&
            oper.Usuario.apellido.toLowerCase().includes(value.toLowerCase()))
      );
      setCotizaciones(arrayCache);
    }
  };

  const columns = [
    {
      name: "Nro Cotización",
      selector: (row) => row.numeroCotizacion,
      sortable: true,
    },
    {
      name: "Producto",
      selector: (row) => row.Producto.modelo,
      sortable: true,
    },
    {
      name: "Precio Final",
      selector: (row) => row.PrecioFinal,
      sortable: true,
    },
    {
      name: "Fecha de Cotización",
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
        <div className="acciones-container">
          <Link
            to={`/admin/cotizaciones/ver/${row.id}`}
            className="detalle-btn"
          >
            Detalle
          </Link>
          <Link
            to={`/admin/cotizaciones/modificar/${row.id}`}
            className="modificar-btn ml-2"
          >
            Modificar
          </Link>
        </div>
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
            placeholder="Buscar por Nro, VENDEDOR O MODELO"
            onChange={handleOnChange}
            value={search}
            autoComplete="off"
            disabled={!cotizacionesQueryById.data}
          />
        </div>
        {cotizacionesQueryById.data ? (
          <DataTable columns={columns} data={cotizaciones} pagination striped />
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    </div>
  );
}
