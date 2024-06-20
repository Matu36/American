import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import useAuth from "../../hooks/useAuth";
import { useUsuario } from "../../hooks/useUsuarios";

export default function Usuarios() {
  const [search, setSearch] = useState("");
  const { auth } = useAuth();
  const { data, isLoading } = useUsuario().usuariosQuery;

  const allUsers = data?.allUsers || [];

  const [usuarios, setUsuarios] = useState(allUsers);

  useEffect(() => {
    if (!isLoading) {
      setUsuarios(allUsers);
    }
  }, [allUsers, isLoading]);

  useEffect(() => {
    filterByEmailAndApellido(search);
  }, [search, allUsers]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterByEmailAndApellido = (value) => {
    if (!value) {
      setUsuarios(allUsers);
    } else {
      const arrayCache = allUsers.filter(
        (oper) =>
          (oper.apellido &&
            oper.apellido.toLowerCase().includes(value.toLowerCase())) ||
          (oper.email && oper.email.toLowerCase().includes(value.toLowerCase()))
      );
      setUsuarios(arrayCache);
    }
  };

  const columns = [
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "Apellido", selector: (row) => row.apellido, sortable: true },
    {
      name: "Dirección",
      selector: (row) => row.direccion || "N/A",
      sortable: true,
    },
    {
      name: "Teléfono",
      selector: (row) => row.telefono || "N/A",
      sortable: true,
    },
    {
      name: "Fecha de Creación",
      selector: (row) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
  ];

  return (
    <div className="form-container">
      <>
        <div>
          <div className="form-group" style={{ maxWidth: "40%" }}>
            <input
              type="text"
              className="form-input"
              placeholder="Buscar por APELLIDO O EMAIL"
              onChange={handleOnChange}
              value={search}
              autoComplete="off"
              disabled={!data}
              style={{ height: "2rem" }}
            />
          </div>
          <div className="dataTable">
            <DataTable columns={columns} data={usuarios} pagination striped />
          </div>
        </div>
      </>
    </div>
  );
}
