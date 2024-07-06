import { useMutation, useQuery } from "@tanstack/react-query";
import { ContactoProductoAPI } from "../components/api/ContactoProductoApi";
import Swal from "sweetalert2";

const getContactoProducto = async () => {
  const { data } = await ContactoProductoAPI.get("/get");
  return data;
};

const getContactoProductoById = async (id) => {
  const { data } = await ContactoProductoAPI.get(`/detalle/${id}`);
  return data;
};

const postContactoProducto = async (data) => {
  return await ContactoProductoAPI.post(`create`, data);
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

  const contactoProductoMutation = useMutation({
    mutationKey: ["create-contactoProducto"],
    mutationFn: (data) => postContactoProducto(data),
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "info",
        title:
          "Gracias por contactactarte con Nosotros! A la brevedad te responderemos!",
        showConfirmButton: false,
        timer: 2000,
        background: "#ffffff",
        iconColor: "#ffc107",
        customClass: {
          title: "text-dark",
        },
      });
    },
    onError: (error) => {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            Swal.fire({
              position: "center",
              icon: "warning",
              title:
                "Hay errores en el formulario; por favor, intente nuevamente",
              background: "#ffffff",
              iconColor: "#ffc107",
              customClass: {
                title: "text-dark",
              },
              showConfirmButton: false,
              timer: 5000,
            });
            break;
          default:
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Hubo un error",
              showConfirmButton: false,
              timer: 2000,
              background: "#ffffff",
              iconColor: "#ffc107",
              customClass: {
                title: "text-dark",
              },
            });
            break;
        }
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Hubo un error al procesar la solicitud",
          showConfirmButton: false,
          timer: 2000,
          background: "#ffffff",
          iconColor: "#ffc107",
          customClass: {
            title: "text-dark",
          },
        });
      }
    },
  });

  return {
    contactoProductoQuery,
    contactoProductoQueryById,
    contactoProductoMutation,
  };
};
