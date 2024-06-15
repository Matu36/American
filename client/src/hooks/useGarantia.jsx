import { useMutation, useQuery } from "@tanstack/react-query";
import { GarantiaAPI } from "../components/api/GarantiaApi";

const getGarantia = async () => {
  const { data } = await GarantiaAPI.get("/getAll");
  return data;
};

const getGarantiaById = async (id) => {
  const { data } = await GarantiaAPI.get(`/garantiasById/${id}`);
  return data;
};

export const useGarantia = (id) => {
  const GarantiaQuery = useQuery({
    queryKey: ["garantias"],
    queryFn: () => getGarantia(),
  });

  const garantiaQueryById = useQuery({
    queryKey: ["garantia", { garantiaId: id }],
    queryFn: () => getGarantiaById(id),
    enabled: id !== undefined && id !== null,
  });

  return {
    GarantiaQuery,
    garantiaQueryById,
  };
};
