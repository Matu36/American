import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useVentas } from "../../hooks/useCotizaciones";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Spinner from "../../UI/Spinner";

export default function Ventas() {
  const { auth } = useAuth();
  const [search, setSearch] = useState("");
  const idUsuario = auth?.id;

  const { ventasQueryById, isLoading } = useVentas(idUsuario);
  const [ventas, setVentas] = useState(ventasQueryById.data);

  console.log(ventasQueryById.data);

  useEffect(() => {
    if (ventasQueryById.data) {
      setVentas(ventasQueryById.data);
    }
  }, [ventasQueryById.data]);

  useEffect(() => {
    filterByEmailAndEmpresa(search);
  }, [search, ventasQueryById.data]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterByEmailAndEmpresa = (value) => {
    if (!value) {
      setVentas(ventasQueryById.data);
    } else {
      const arrayCache = ventasQueryById.data.filter(
        (oper) =>
          (oper.Cliente.apellido &&
            oper.Cliente.apellido
              .toLowerCase()
              .includes(value.toLowerCase())) ||
          (oper.Producto.modelo &&
            oper.Producto.modelo.toLowerCase().includes(value.toLowerCase())) ||
          (oper.Usuario.apellido &&
            oper.Usuario.apellido.toLowerCase().includes(value.toLowerCase()))
      );
      setVentas(arrayCache);
    }
  };

  const columns = [
    {
      name: "Producto",
      selector: (row) =>
        `${row.Producto.familia} ${row.Producto.marca} ${row.Producto.modelo}`,
      sortable: true,
    },
    {
      name: "Nro de Cotización",
      selector: (row) => row.numeroCotizacion,
      sortable: true,
    },
    {
      name: "Precio Final",
      sortable: true,
      selector: (row) => `${row.moneda} ${row.PrecioFinal}`,
    },
    {
      name: "Fecha de Venta",
      selector: (row) => new Date(row.fechaDeCreacion).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Vendedor",
      selector: (row) => `${row.Usuario.nombre} ${row.Usuario.apellido}`,
      sortable: true,
    },
    {
      name: "Cliente",
      selector: (row) => `${row.Cliente.nombre} ${row.Cliente.apellido}`,
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
            to={`/admin/ventas/${row.id}`}
            className="dropdown-item dropdown-item-ver"
          >
            Ver Venta
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
        <div className="form-group" style={{ maxWidth: "60%" }}>
          <h2 className="tituloCompo">Ventas</h2> <br />
          <input
            type="text"
            className="form-input"
            placeholder="Buscar por APELLIDO DE CLIENTE - VENDEDOR o MODELO"
            onChange={handleOnChange}
            value={search}
            autoComplete="off"
            disabled={!ventasQueryById.data}
          />
        </div>
        {!showSpinner ? (
          <DataTable columns={columns} data={ventas} pagination striped />
        ) : (
          <Spinner loading={isLoading} />
        )}
      </div>
    </div>
  );
}
