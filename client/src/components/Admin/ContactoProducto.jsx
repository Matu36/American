import { useEffect, useState } from "react";
import { useContactoProducto } from "../../hooks/useContactoProducto";
import DataTable from "react-data-table-component";
import Spinner from "../../UI/Spinner";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Link } from "react-router-dom";
import { useUsuario } from "../../hooks/useUsuarios";

export default function ContactoProducto() {
  const { data, isLoading } = useContactoProducto().contactoProductoQuery;
  const [search, setSearch] = useState("");
  const [contactoProducto, setContactoProducto] = useState(data);

  const { data: usuariosADerivar } = useUsuario().usuariosMensajesQuery;

  const userOptions = usuariosADerivar?.allUsers.map((user) => ({
    value: user.id,
    label: `${user.nombre} ${user.apellido} (${user.email})`,
  }));

  useEffect(() => {
    if (data) {
      setContactoProducto(data);
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
      setContactoProducto(data);
    } else {
      const arrayCache = data?.filter(
        (oper) =>
          oper.razonSocial.toLowerCase().includes(value.toLowerCase()) ||
          oper.email.toLowerCase().includes(value.toLowerCase())
      );
      setContactoProducto(arrayCache);
    }
  };

  //-------------------------------- FIN SEARCHBAR --------------------------- //

  const columns = [
    { name: "Email", selector: (row) => row.email, sortable: true },
    {
      name: "Razón Social",
      selector: (row) => row.razonSocial,
      sortable: true,
    },
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
    { name: "Marca", selector: (row) => row.Producto.marca, sortable: true },
    { name: "Modelo", selector: (row) => row.Producto.modelo, sortable: true },
    {
      name: "Fecha de Registro",
      selector: (row) => new Date(row.fechaDeRegistro).toLocaleString(),
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
            to={`/admin/ContacoProducto/ver/${row.id}`}
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
        <>
          <div className="form-group" style={{ maxWidth: "60%" }}>
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
              data={contactoProducto}
              pagination
              striped
            />
          ) : (
            <Spinner loading={isLoading} />
          )}
        </>
      </div>
    </div>
  );
}
