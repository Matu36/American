import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useClientes } from "../../hooks/useClientes";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

export default function Clientes() {
  const { auth } = useAuth();
  const [search, setSearch] = useState("");
  const idUsuario = auth?.id;

  const { clientesQueryById } = useClientes(idUsuario);
  const [clientes, setClientes] = useState(clientesQueryById.data);

  useEffect(() => {
    if (clientesQueryById.data) {
      setClientes(clientesQueryById.data);
    }
  }, [clientesQueryById.data]);

  useEffect(() => {
    filterByEmailAndEmpresa(search);
  }, [search, clientesQueryById.data]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterByEmailAndEmpresa = (value) => {
    if (!value) {
      setClientes(clientesQueryById.data);
    } else {
      const arrayCache = clientesQueryById.data.filter(
        (oper) =>
          oper.numeroCotizacion.toLowerCase().includes(value.toLowerCase()) ||
          oper.Producto.modelo.toLowerCase().includes(value.toLowerCase()) ||
          oper.Usuario.apellido.toLowerCase().includes(value.toLowerCase())
      );
      setClientes(arrayCache);
    }
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: "Apellido",
      selector: (row) => row.apellido,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.mail,
      sortable: true,
    },
    {
      name: "Fecha de Carga",
      selector: (row) => new Date(row.fechaDeCreacion).toLocaleDateString(),
      sortable: true,
    },

    {
      name: "Acciones",
      cell: (row) => (
        <div className="acciones-container">
          <Link to={`/admin/clientes/ver/${row.id}`} className="detalle-btn">
            Detalle
          </Link>
          <Link
            to={`/admin/clientes/modificar/${row.id}`}
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
            disabled={!clientesQueryById.data}
          />
        </div>
        {clientesQueryById.data ? (
          <DataTable columns={columns} data={clientes} pagination striped />
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    </div>
  );
}
