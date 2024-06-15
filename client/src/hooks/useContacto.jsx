import { useMutation, useQuery } from "@tanstack/react-query";
import { ContactoAPI } from "../components/api/ContactoApi";

const getContacto = async () => {
  const { data } = await ContactoAPI.get("/get");
  return data;
};

export const useContacto = () => {
  const contactoQuery = useQuery({
    queryKey: ["contactos"],
    queryFn: () => getContacto(),
  });

  return {
    contactoQuery,
  };
};
