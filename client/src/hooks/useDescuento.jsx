import { useMutation, useQuery } from "@tanstack/react-query";
import { DescuentoAPI } from "../components/api/DescuentoApi";

const getDescuento = async () => {
  const { data } = await DescuentoAPI.get("/get");
  return data;
};

const getDescuentoById = async (id) => {
  const { data } = await DescuentoAPI.get(`/detalle/${id}`);
  return data;
};

export const useDescuento = (id) => {
  const descuentoQuery = useQuery({
    queryKey: ["descuentos"],
    queryFn: () => getDescuento(),
  });

  const descuentoQueryById = useQuery({
    queryKey: ["descuentoDetail", { descuentoId: id }],
    queryFn: () => getDescuentoById(id),
    enabled: id !== undefined && id !== null,
  });

  return {
    descuentoQuery,
    descuentoQueryById,
  };
};
