import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useClientes } from "../../hooks/useClientes";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

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
          (oper.apellido &&
            oper.apellido.toLowerCase().includes(value.toLowerCase())) ||
          (oper.mail && oper.mail.toLowerCase().includes(value.toLowerCase()))
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
      cell: (row) => (
        <div style={{ width: "15rem" }}>
          {new Date(row.fechaDeCreacion).toLocaleDateString()}
        </div>
      ),
    },

    {
      name: "Acciones",
      cell: (row) => (
        <DropdownButton
          id={`dropdown-acciones-${row.id}`}
          variant="secondary"
          size="sm"
          className="acciones-dropdown"
        >
          <Dropdown.Item
            as={Link}
            to={`/admin/clientes/ver/${row.id}`}
            className="dropdown-item dropdown-item-ver"
          >
            Detalle
          </Dropdown.Item>
          <Dropdown.Item
            as={Link}
            to={`/admin/clientes/modificar/${row.id}`}
            className="dropdown-item dropdown-item-modificar"
          >
            Modificar
          </Dropdown.Item>
        </DropdownButton>
      ),
    },
  ];
  return (
    <div className="form-container">
      <div>
        <div className="form-group" style={{ maxWidth: "40%" }}>
          <input
            type="text"
            className="form-input"
            placeholder="Buscar por Apellido o Email"
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
