import { useMutation, useQuery } from "@tanstack/react-query";
import { mensajesAPI } from "../components/api/MensajesAPI";

const getCountMensajesNoLidos = async (idUsuario) => {
  const { data } = await mensajesAPI.get(`/count/${idUsuario}`);
  return data;
};

const getCountMensajesEnviados = async (idUsuario) => {
  const { data } = await mensajesAPI.get(`/enviados/${idUsuario}`);
  return data;
};

const postMensaje = async (data) => {
  return await mensajesAPI.post(`create`, data);
};

export const useMensajes = (idUsuario) => {
  const MensajesCountQuery = useQuery({
    queryKey: ["mensajenoleido", { mensajeNoLeidoId: idUsuario }],
    queryFn: () => getCountMensajesNoLidos(idUsuario),
    enabled: idUsuario !== undefined && idUsuario !== null,
  });

  const mensajesMutation = useMutation({
    mutationKey: ["mensajes-mutation"],
    mutationFn: (data) => postMensaje(data),
  });

  const MensajesEnviadosQuery = useQuery({
    queryKey: ["mensajesEnviados", { mensajeEnviadosId: idUsuario }],
    queryFn: () => getCountMensajesEnviados(idUsuario),
    enabled: idUsuario !== undefined && idUsuario !== null,
  });
  return {
    MensajesCountQuery,
    mensajesMutation,
    MensajesEnviadosQuery,
  };
};
