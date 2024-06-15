import { useEffect, useState } from "react";
import { useContacto } from "../../hooks/useContacto";
import DataTable from "react-data-table-component";

export default function Contacto() {
  const { data, isLoading } = useContacto().contactoQuery;
  const [search, setSearch] = useState("");
  const [contactos, setContactos] = useState(data);

  //-------------------------------- SEARCHBAR --------------------------- //

  useEffect(() => {
    filterByEmailAndNombreCompleto(search);
  }, [search]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterByEmailAndNombreCompleto = (value) => {
    if (!value) {
      setContactos(data);
    } else {
      const arrayCache = data?.filter(
        (oper) =>
          oper.apellidos.toLowerCase().includes(value.toLowerCase()) ||
          oper.email.toLowerCase().includes(value.toLowerCase())
      );
      setContactos(arrayCache);
    }
  };

  const columns = [
    { name: "Email", selector: (row) => row.email, sortable: true },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: "Apellidos",
      selector: (row) => row.apellidos,
      sortable: true,
    },

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
      name: "Consulta",
      selector: (row) => row.consulta,
      sortable: true,
      cell: (row) => <div className="cellConsulta">{row.consulta}</div>,
    },
    {
      name: "Fecha de Envío",
      selector: (row) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
  ];

  return (
    <div>
      {" "}
      <div>
        <div className="productos">
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

              <DataTable
                columns={columns}
                data={contactos}
                pagination
                striped
              />
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
