import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useGarantia } from "../../hooks/useGarantia";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function Garantia() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGarantia().GarantiaQuery;

  const [garantia, setGarantias] = useState(data);

  //-------------------------------- SEARCHBAR --------------------------- //

  useEffect(() => {
    filterByEmailAndEmpresa(search);
  }, [search]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterByEmailAndEmpresa = (value) => {
    if (!value) {
      setGarantias(data);
    } else {
      const arrayCache = data?.filter(
        (oper) =>
          oper.empresa.toLowerCase().includes(value.toLowerCase()) ||
          oper.email.toLowerCase().includes(value.toLowerCase())
      );
      setGarantias(arrayCache);
    }
  };

  const columns = [
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Empresa", selector: (row) => row.empresa, sortable: true },
    { name: "Modelo", selector: (row) => row.modelo, sortable: true },
    {
      name: "Falla",
      selector: (row) => row.modelo,
      sortable: true,
    },

    {
      name: "Fecha de Envío",
      selector: (row) => new Date(row.fechaCrea).toLocaleString(),
      sortable: true,
    },
    {
      name: "Ver",
      cell: (row) => (
        <DropdownButton
          id={`dropdown-acciones-${row.id}`}
          variant="secondary"
          size="sm"
          className="acciones-dropdown acciones-dropdown-custom"
        >
          <Dropdown.Item
            as={Link}
            to={`/admin/garantias/garantia/${row.id}`}
            className="dropdown-item dropdown-item-ver"
          >
            Ver Garantía
          </Dropdown.Item>
        </DropdownButton>
      ),
    },
  ];

  return (
    <div className="form-container">
      <div>
        <>
          <div className="form-group" style={{ maxWidth: "60%" }}>
            <h2 className="tituloCompo">Garantía</h2> <br />
            <input
              type="text"
              className="form-input"
              placeholder="Buscar por EMPRESA O EMAIL"
              onChange={handleOnChange}
              value={search}
              autoComplete="off"
              disabled={!data}
            />
          </div>

          <DataTable columns={columns} data={garantia} pagination striped />
        </>
      </div>
    </div>
  );
}
