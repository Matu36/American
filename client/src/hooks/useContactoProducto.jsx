import { useMutation, useQuery } from "@tanstack/react-query";
import { ContactoProductoAPI } from "../components/api/ContactoProductoApi";

const getContactoProducto = async () => {
  const { data } = await ContactoProductoAPI.get("/get");
  return data;
};

const getContactoProductoById = async (id) => {
  const { data } = await ContactoProductoAPI.get(`/detalle/${id}`);
  return data;
};

export const useContactoProducto = (id) => {
  const contactoProductoQuery = useQuery({
    queryKey: ["contactoProducto"],
    queryFn: () => getContactoProducto(),
  });

  const contactoProductoQueryById = useQuery({
    queryKey: ["contactoProductoDetail", { contactoProductoId: id }],
    queryFn: () => getContactoProductoById(id),
    enabled: id !== undefined && id !== null,
  });

  return {
    contactoProductoQuery,
    contactoProductoQueryById,
  };
};
