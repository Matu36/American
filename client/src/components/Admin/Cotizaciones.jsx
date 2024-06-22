import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useCotizaciones } from "../../hooks/useCotizaciones";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Spinner from "../../UI/Spinner";

export default function Cotizaciones() {
  const { auth } = useAuth();
  const [search, setSearch] = useState("");
  const idUsuario = auth?.id;

  const [clicked, setClicked] = useState({ isClicked: false });

  const { mutate: cotizacionState2 } =
    useCotizaciones().cotizacionMutationState2;

  const handleConcretarVenta = async (id) => {
    try {
      const data = { id };

      await cotizacionState2(data);
    } catch (error) {
      console.error("Error al concretar venta:", error);
    }
  };

  const { cotizacionesQueryById, isLoading } = useCotizaciones(idUsuario);
  const [cotizaciones, setCotizaciones] = useState(cotizacionesQueryById.data);

  useEffect(() => {
    if (cotizacionesQueryById.data) {
      setCotizaciones(cotizacionesQueryById.data);
    }
  }, [cotizacionesQueryById.data]);

  useEffect(() => {
    filterByEmailAndEmpresa(search);
  }, [search, cotizacionesQueryById.data]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterByEmailAndEmpresa = (value) => {
    if (!value) {
      setCotizaciones(cotizacionesQueryById.data);
    } else {
      const arrayCache = cotizacionesQueryById.data.filter(
        (oper) =>
          (oper.numeroCotizacion &&
            oper.numeroCotizacion
              .toLowerCase()
              .includes(value.toLowerCase())) ||
          (oper.Producto.modelo &&
            oper.Producto.modelo.toLowerCase().includes(value.toLowerCase())) ||
          (oper.Usuario.apellido &&
            oper.Usuario.apellido.toLowerCase().includes(value.toLowerCase()))
      );
      setCotizaciones(arrayCache);
    }
  };

  const columns = [
    {
      name: "Nro Cotización",
      selector: (row) => row.numeroCotizacion,
      sortable: true,
    },
    {
      name: "Producto",
      selector: (row) => row.Producto.modelo,
      sortable: true,
    },
    {
      name: "Precio Final",
      selector: (row) => row.PrecioFinal,
      sortable: true,
    },
    {
      name: "Fecha de Cotización",
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
            to={`/admin/cotizaciones/ver/${row.id}`}
            className="dropdown-item dropdown-item-ver"
          >
            Ver Cotización
          </Dropdown.Item>
          <Dropdown.Item
            as={Link}
            to={`/admin/cotizaciones/modificar/${row.id}`}
            className="dropdown-item dropdown-item-modificar"
          >
            Modificar
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleConcretarVenta(row.id)}
            className="dropdown-item dropdown-item-concretar"
          >
            Concretar Venta
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
        <div className="form-group" style={{ maxWidth: "40%" }}>
          <h2 className="tituloCompo">Cotizaciones</h2> <br />
          <input
            type="text"
            className="form-input"
            placeholder="Buscar por Nro, VENDEDOR O MODELO"
            onChange={handleOnChange}
            value={search}
            autoComplete="off"
            disabled={!cotizacionesQueryById.data}
            style={{ height: "2rem" }}
          />
        </div>
        {!showSpinner ? (
          <DataTable columns={columns} data={cotizaciones} pagination striped />
        ) : (
          <Spinner loading={isLoading} />
        )}
      </div>
    </div>
  );
}
