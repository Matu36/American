import { useEffect, useState } from "react";
import { useDescuento } from "../../hooks/useDescuento";
import DataTable from "react-data-table-component";
import Spinner from "../../UI/Spinner";

export default function Descuentos() {
  const { data, isLoading } = useDescuento().descuentoQuery;
  const [search, setSearch] = useState("");
  const [descuentos, setDescuentos] = useState(data);

  useEffect(() => {
    if (data) {
      setDescuentos(data);
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
      setDescuentos(data);
    } else {
      const arrayCache = data?.filter(
        (oper) =>
          oper.nombreCompleto.toLowerCase().includes(value.toLowerCase()) ||
          oper.email.toLowerCase().includes(value.toLowerCase())
      );
      setDescuentos(arrayCache);
    }
  };

  //-------------------------------- FIN SEARCHBAR --------------------------- //

  const columns = [
    { name: "Email", selector: (row) => row.email, sortable: true },
    {
      name: "Nombre Completo",
      selector: (row) => row.nombreCompleto,
      sortable: true,
    },

    {
      name: "Dirección",
      selector: (row) => row.direccion || "N/A",
      sortable: true,
    },
    {
      name: "Teléfono",
      selector: (row) => row.telefonoCelular || "N/A",
      sortable: true,
    },
    {
      name: "Fecha de Registro",
      selector: (row) => new Date(row.fechaDeRegistro).toLocaleString(),
      sortable: true,
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
            <DataTable columns={columns} data={descuentos} pagination striped />
          ) : (
            <Spinner loading={isLoading} />
          )}
        </>
      </div>
    </div>
  );
}
