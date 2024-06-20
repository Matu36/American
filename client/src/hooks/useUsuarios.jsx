import { useMutation, useQuery } from "@tanstack/react-query";
import { UsuariosAPI } from "../components/api/UsuariosApi";

const getUsuarios = async () => {
  const { data } = await UsuariosAPI.get("/all");
  return data;
};

const getUsuariosMensajes = async () => {
  const { data } = await UsuariosAPI.get("/mensajes");
  return data;
};

const getLastFive = async () => {
  const { data } = await UsuariosAPI.get("/lastfive");
  return data;
};

export const useUsuario = () => {
  const usuariosQuery = useQuery({
    queryKey: ["usuarios"],
    queryFn: () => getUsuarios(),
  });

  const fiveQuery = useQuery({
    queryKey: ["five"],
    queryFn: () => getLastFive(),
  });

  const usuariosMensajesQuery = useQuery({
    queryKey: ["usuariosMensajes"],
    queryFn: () => getUsuariosMensajes(),
  });

  return {
    usuariosQuery,
    fiveQuery,
    usuariosMensajesQuery,
  };
};
