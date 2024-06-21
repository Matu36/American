import React, { useEffect, useState } from "react";
import { useMensajes } from "../../hooks/useMensajes";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DataTable from "react-data-table-component";
import styled from "styled-components";

export default function MensajesRecibidos() {
  const { auth } = useAuth();
  const idUsuario = auth?.id;

  const { data: mensajes, refetch } =
    useMensajes(idUsuario).MensajesRecibidosQuery;
  const { mutate: mensajeEstado2 } = useMensajes().mensajeMutationState2;

  const [search, setSearch] = useState("");
  const [recibidos, setRecibidos] = useState([]);

  const marcarComoLeido = async (id) => {
    try {
      const data = { id };
      await mensajeEstado2(data, {
        onSuccess: () => {
          refetch();
        },
      });
    } catch (error) {
      console.error("Error al marcar como leído:", error);
    }
  };

  //-------------------------------- SEARCHBAR --------------------------- //

  useEffect(() => {
    setRecibidos(mensajes);
  }, [mensajes]);

  useEffect(() => {
    filterByEmailAndEmpresa(search);
  }, [search, mensajes]);

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const filterByEmailAndEmpresa = (value) => {
    if (!value) {
      setRecibidos(mensajes);
    } else {
      const arrayCache = mensajes?.filter((oper) => {
        const email = oper.Usuario?.email?.toLowerCase() || "";
        return email.includes(value.toLowerCase());
      });
      setRecibidos(arrayCache);
    }
  };

  const columns = [
    { name: "Email", selector: (row) => row.Usuario.email, sortable: true },
    { name: "Mensaje", selector: (row) => row.Mensaje, sortable: true },
    {
      name: "Fecha de Envío",
      selector: (row) => new Date(row.fechaDeEnvio).toLocaleDateString(),
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
            to={`/admin/mensajes/enviados/${row.id}`}
            className="dropdown-item dropdown-item-ver"
          >
            Ver Mensaje
          </Dropdown.Item>
          {row.estado === 1 && (
            <Dropdown.Item
              onClick={() => marcarComoLeido(row.id)}
              className="dropdown-item dropdown-item-concretar"
            >
              Marcar como Leído
            </Dropdown.Item>
          )}
        </DropdownButton>
      ),
    },
  ];

  // Estilos condicionales para filas leídas
  const conditionalRowStyles = [
    {
      when: (row) => row.estado === 2,
      style: {
        backgroundColor: "#d3d3d3", // Gris claro
      },
    },
  ];

  return (
    <div className="form-container">
      <div>
        <div className="form-group" style={{ maxWidth: "60%" }}>
          <h2 className="tituloCompo">Mensajes Recibidos</h2> <br />
          <input
            type="text"
            className="form-input"
            placeholder="Buscar por EMAIL"
            onChange={handleOnChange}
            value={search}
            autoComplete="off"
            disabled={!mensajes}
          />
        </div>

        <DataTable
          columns={columns}
          data={recibidos}
          pagination
          striped
          conditionalRowStyles={conditionalRowStyles}
        />
      </div>
    </div>
  );
}
