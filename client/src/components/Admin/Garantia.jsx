import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useGarantia } from "../../hooks/useGarantia";
import { Link } from "react-router-dom";

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
        <Link
          to={`/admin/garantias/garantia/${row.id}`}
          className="custom-link"
        >
          <button className="detalle">Detalle</button>
        </Link>
      ),
    },
  ];

  return (
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
                placeholder="Buscar por EMPRESA O EMAIL"
                onChange={handleOnChange}
                value={search}
                autoComplete="off"
                disabled={!data}
              />
            </div>

            <DataTable columns={columns} data={garantia} pagination striped />
          </div>
        </>
      </div>
    </div>
  );
}
