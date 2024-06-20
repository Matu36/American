import { useMutation, useQuery } from "@tanstack/react-query";
import { mensajesAPI } from "../components/api/MensajesAPI";

const getCountMensajesNoLidos = async (idUsuario) => {
  const { data } = await mensajesAPI.get(`/count/${idUsuario}`);
  return data;
};

export const useMensajes = (idUsuario) => {
  const MensajesCountQuery = useQuery({
    queryKey: ["mensajenoleido", { mensajeNoLeidoId: idUsuario }],
    queryFn: () => getCountMensajesNoLidos(idUsuario),
    enabled: idUsuario !== undefined && idUsuario !== null,
  });

  return {
    MensajesCountQuery,
  };
};
