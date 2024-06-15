import { useMutation, useQuery } from "@tanstack/react-query";
import { DescuentoAPI } from "../components/api/DescuentoApi";

const getDescuento = async () => {
  const { data } = await DescuentoAPI.get("/get");
  return data;
};

export const useDescuento = () => {
  const descuentoQuery = useQuery({
    queryKey: ["descuentos"],
    queryFn: () => getDescuento(),
  });

  return {
    descuentoQuery,
  };
};
