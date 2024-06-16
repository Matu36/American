import { useMutation, useQuery } from "@tanstack/react-query";
import { CotizacionesAPI } from "../components/api/CotizacionesApi";

const getVentaById = async (idUsuario) => {
  const { data } = await CotizacionesAPI.get(`/getVentas/${idUsuario}`);
  return data;
};

const getVentasDetalleById = async (id) => {
  const { data } = await CotizacionesAPI.get(`/getVentasById/${id}`);
  return data;
};

export const useVentas = (idUsuario, id) => {
  const ventasQueryById = useQuery({
    queryKey: ["venta", { ventaId: idUsuario }],
    queryFn: () => getVentaById(idUsuario),
    enabled: idUsuario !== undefined && idUsuario !== null,
  });

  const ventasQueryDetalle = useQuery({
    queryKey: ["ventadetalle", { venta: id }],
    queryFn: () => getVentasDetalleById(id),
    enabled: id !== undefined && id !== null,
  });

  return {
    ventasQueryById,
    ventasQueryDetalle,
  };
};
