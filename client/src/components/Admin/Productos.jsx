import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useProducto } from "../../hooks/useProductos";
import Spinner from "../../UI/Spinner";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Link } from "react-router-dom";

export default function Productos() {
  const { data, isLoading } = useProducto().productosQuery;

  const [search, setSearch] = useState("");
  const [productos, setProductos] = useState(data);

  useEffect(() => {
    if (data) {
      setProductos(data);
    }
  }, [data]);

  //-------------------------------- SEARCHBAR --------------------------- //

  useEffect(() => {
    filterByCodOrMarca(search);
  }, [search]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterByCodOrMarca = (value) => {
    if (!value) {
      setProductos(data);
    } else {
      const arrayCache = data?.filter(
        (oper) =>
          (oper.marca &&
            oper.marca.toLowerCase().includes(value.toLowerCase())) ||
          (oper.modelo &&
            oper.modelo.toLowerCase().includes(value.toLowerCase()))
      );
      setProductos(arrayCache);
    }
  };

  //-------------------------------- FIN SEARCHBAR --------------------------- //

  const columns = [
    { name: "Categorìa", selector: (row) => row.familia, sortable: true },
    { name: "Marca", selector: (row) => row.marca, sortable: true },
    { name: "Modelo", selector: (row) => row.modelo, sortable: true },
    { name: "Precio", selector: (row) => row.precio, sortable: true },

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
            to={`/admin/productos/modificar/${row.id}`}
            className="dropdown-item dropdown-item-modificar"
          >
            Modificar
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
    <>
      <div className="form-container">
        <div>
          <div className="form-group" style={{ maxWidth: "60%" }}>
            <h2 className="tituloCompo"> Productos</h2> <br />
            <input
              type="text"
              className="form-input"
              placeholder="Buscar por MARCA o MODELO"
              onChange={handleOnChange}
              value={search}
              autoComplete="off"
              disabled={!data}
            />
          </div>
          {!showSpinner ? (
            <DataTable
              columns={columns}
              data={productos}
              pagination
              striped
              responsive
              noDataComponent={
                <div className="noData">Aún no hay registros ingresados</div>
              }
            />
          ) : (
            <Spinner loading={isLoading} />
          )}
        </div>
      </div>
    </>
  );
}
