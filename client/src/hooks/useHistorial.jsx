import { useMutation, useQuery } from "@tanstack/react-query";
import { HistorialAPI } from "../components/api/HistorialApi";

const postHistorialVendedor = async (data) => {
  return await HistorialAPI.post(`/vendedor`, data);
};

export const useHistorial = () => {
  const historialVendedorMutation = useMutation({
    mutationKey: ["historialVendedor-mutation"],
    mutationFn: (data) => postHistorialVendedor(data),
  });

  return {
    historialVendedorMutation,
  };
};
