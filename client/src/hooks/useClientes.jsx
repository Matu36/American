import { useMutation, useQuery } from "@tanstack/react-query";
import { ClientesAPI } from "../components/api/ClientesApi";

const getClientesParaCotizar = async () => {
  const { data } = await ClientesAPI.get("/getParaCotizar");
  return data;
};

const postCliente = async (data) => {
  return await ClientesAPI.post(`create`, data);
};

const getClientesById = async (idUsuario) => {
  const { data } = await ClientesAPI.get(`/get/${idUsuario}`);
  return data;
};

const getClientesDetalle = async (id) => {
  const { data } = await ClientesAPI.get(`/getDetalle/${id}`);
  return data;
};

export const useClientes = (idUsuario, id) => {
  const clienteoQuery = useQuery({
    queryKey: ["clientes"],
    queryFn: () => getClientesParaCotizar(),
  });

  const clientesMutation = useMutation({
    mutationKey: ["cliente-mutation"],
    mutationFn: (data) => postCliente(data),
  });

  const clientesQueryById = useQuery({
    queryKey: ["clienteById", { clienteId: idUsuario }],
    queryFn: () => getClientesById(idUsuario),
    enabled: idUsuario !== undefined && idUsuario !== null,
  });

  const clientesQueryDetalle = useQuery({
    queryKey: ["clientedetalle", { cliente: id }],
    queryFn: () => getClientesDetalle(id),
    enabled: id !== undefined && id !== null,
  });

  return {
    clienteoQuery,
    clientesMutation,
    clientesQueryById,
    clientesQueryDetalle,
  };
};
