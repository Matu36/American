import React from "react";
import { useParams } from "react-router-dom";
import { useClientes } from "../../hooks/useClientes";

export default function ClientesEdit() {
  const { mutate: ediCliente } = useClientes().clientesEditMutation;

  return <div></div>;
}
