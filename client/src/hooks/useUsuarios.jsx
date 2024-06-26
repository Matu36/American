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

const getVendedores = async () => {
  const { data } = await UsuariosAPI.get("/vendedores");
  return data;
};

const getUsuarioDetail = async (idUsuario) => {
  const { data } = await UsuariosAPI.get(`/detail/${idUsuario}`);
  return data;
};

export const useUsuario = (idUsuario) => {
  const usuariosQuery = useQuery({
    queryKey: ["usuarios"],
    queryFn: () => getUsuarios(),
  });

  const UsuarioDetailQuery = useQuery({
    queryKey: ["usuarioDetail", { id: idUsuario }],
    queryFn: () => getUsuarioDetail(idUsuario),
    enabled: idUsuario !== undefined && idUsuario !== null,
  });

  const fiveQuery = useQuery({
    queryKey: ["five"],
    queryFn: () => getLastFive(),
  });

  const vendedoresQuery = useQuery({
    queryKey: ["vendedores"],
    queryFn: () => getVendedores(),
  });

  const usuariosMensajesQuery = useQuery({
    queryKey: ["usuariosMensajes"],
    queryFn: () => getUsuariosMensajes(),
  });

  return {
    usuariosQuery,
    fiveQuery,
    usuariosMensajesQuery,
    UsuarioDetailQuery,
    vendedoresQuery,
  };
};
