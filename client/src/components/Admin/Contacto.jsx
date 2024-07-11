import { useEffect, useState } from "react";
import { useContacto } from "../../hooks/useContacto";
import DataTable from "react-data-table-component";
import Spinner from "../../UI/Spinner";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Link } from "react-router-dom";
import { useUsuario } from "../../hooks/useUsuarios";

export default function Contacto() {
  const { data, isLoading } = useContacto().contactoQuery;
  const [search, setSearch] = useState("");
  const [contactos, setContactos] = useState(data);

  const { data: usuariosADerivar } = useUsuario().usuariosMensajesQuery;

  const userOptions = usuariosADerivar?.allUsers.map((user) => ({
    value: user.id,
    label: `${user.nombre} ${user.apellido} (${user.email})`,
  }));

  useEffect(() => {
    if (data) {
      setContactos(data);
    }
  }, [data]);

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
      name: "Fecha",
      selector: (row) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <DropdownButton
          id={`dropdown-acciones-${row.id}`}
          variant="secondary"
          size="sm"
          className="acciones-dropdown acciones-dropdown-custom"
        >
          <Dropdown.Item
            as={Link}
            to={`/admin/contacto/ver/${row.id}`}
            className="dropdown-item dropdown-item-ver"
          >
            Detalle
          </Dropdown.Item>
          <Dropdown.Item className="dropdown-item dropdown-item-modificar">
            Derivar
          </Dropdown.Item>
        </DropdownButton>
      ),
    },
  ];

  //---------------------------------SPINNER ------------------------------------//

  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    setShowSpinner(true);

    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isLoading]);

  //---------------------------------FIN SPINNER ------------------------------------//

  return (
    <div className="form-container">
      <div>
        <div>
          <>
            <div className="form-group" style={{ maxWidth: "60%" }}>
              <h2 className="tituloCompo">Contacto</h2> <br />
              <input
                type="text"
                className="form-input"
                placeholder="Buscar por APELLIDO O EMAIL"
                onChange={handleOnChange}
                value={search}
                autoComplete="off"
                disabled={!data}
              />
            </div>
            {!showSpinner ? (
              <DataTable
                columns={columns}
                data={contactos}
                pagination
                striped
              />
            ) : (
              <Spinner loading={isLoading} />
            )}
          </>
        </div>
      </div>
    </div>
  );
}
