import { useMutation, useQuery } from "@tanstack/react-query";
import { ContactoAPI } from "../components/api/ContactoApi";

const getContacto = async () => {
  const { data } = await ContactoAPI.get("/get");
  return data;
};

const getContactoById = async (id) => {
  const { data } = await ContactoAPI.get(`/detalle/${id}`);
  return data;
};

export const useContacto = (id) => {
  const contactoQuery = useQuery({
    queryKey: ["contactos"],
    queryFn: () => getContacto(),
  });

  const contactoQueryById = useQuery({
    queryKey: ["contactoDetail", { contactoId: id }],
    queryFn: () => getContactoById(id),
    enabled: id !== undefined && id !== null,
  });
  return {
    contactoQuery,
    contactoQueryById,
  };
};
