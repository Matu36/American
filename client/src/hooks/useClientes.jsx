import { useMutation, useQuery } from "@tanstack/react-query";
import { ClientesAPI } from "../components/api/ClientesApi";

const getClientesParaCotizar = async () => {
  const { data } = await ClientesAPI.get("/getParaCotizar");
  return data;
};

export const useClientes = () => {
  const clienteoQuery = useQuery({
    queryKey: ["clientes"],
    queryFn: () => getClientesParaCotizar(),
  });

  return {
    clienteoQuery,
  };
};
