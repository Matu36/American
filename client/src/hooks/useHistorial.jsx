import { useMutation, useQuery } from "@tanstack/react-query";
import { HistorialAPI } from "../components/api/HistorialApi";
import Swal from "sweetalert2";

const postHistorialVendedor = async (data) => {
  return await HistorialAPI.post(`/vendedor`, data);
};

export const useHistorial = () => {
  const historialVendedorMutation = useMutation({
    mutationKey: ["historialVendedor-mutation"],
    mutationFn: (data) => postHistorialVendedor(data),
    onError: (error) => {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            Swal.fire({
              position: "center",
              icon: "warning",
              title:
                "No se encontraron cotizaciones para los valores ingresados",
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
              title:
                "No se encontraron cotizaciones para los valores ingresados",
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
    historialVendedorMutation,
  };
};
