import { useMutation, useQuery } from "@tanstack/react-query";
import { CotizacionesAPI } from "../components/api/CotizacionesApi";

const getVentaById = async (idUsuario) => {
  const { data } = await CotizacionesAPI.get(`/getVentas/${idUsuario}`);
  return data;
};

export const useVentas = (idUsuario) => {
  const ventasQueryById = useQuery({
    queryKey: ["venta", { ventaId: idUsuario }],
    queryFn: () => getVentaById(idUsuario),
    enabled: idUsuario !== undefined && idUsuario !== null,
  });

  return {
    ventasQueryById,
  };
};
