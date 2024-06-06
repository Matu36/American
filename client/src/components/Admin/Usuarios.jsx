import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import useAuth from "../../hooks/useAuth";
import { useUsuario } from "../../hooks/useUsuarios";

// const request = await fetch(`${import.meta.env.VITE_BACKEND_URL}usuarios/all`, {
//   method: "GET",
//   body: JSON.stringify(),
//   headers: {
//     "Content-type": "application/json",
//     Authorization: localStorage.getItem("token"),
//   },
// });

// const data = await request.json();

// const allUsers = data.allUsers;

export default function Usuarios() {
  const [search, setSearch] = useState("");

  const { auth, setAuth } = useAuth();
  const { data, isLoading } = useUsuario().usuariosQuery;

  const allUsers = data?.allUsers;

  const [usuarios, setUsuarios] = useState(allUsers);

  //-------------------------------- SEARCHBAR --------------------------- //

  useEffect(() => {
    filterByEmailAndApellido(search);
  }, [search]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterByEmailAndApellido = (value) => {
    if (!value) {
      setUsuarios(allUsers);
    } else {
      const arrayCache = allUsers?.filter(
        (oper) =>
          oper.apellido.toLowerCase().includes(value.toLowerCase()) ||
          oper.email.toLowerCase().includes(value.toLowerCase())
      );
      setUsuarios(arrayCache);
    }
  };

  //-------------------------------- FIN SEARCHBAR --------------------------- //

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
    <div className="productos">
      {auth && auth.rol !== null ? (
        <>
          <div className="productos">
            <div
              className="input-group mb-3 inputSearch"
              style={{ maxWidth: "40%" }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por APELLIDO O EMAIL"
                onChange={handleOnChange}
                value={search}
                autoComplete="off"
                disabled={!data}
              />
            </div>

            <DataTable columns={columns} data={usuarios} pagination striped />
          </div>
        </>
      ) : (
        <span style={{ color: "black" }}>
          Ud No está autorizado a ver estos datos
        </span>
      )}
    </div>
  );
}
