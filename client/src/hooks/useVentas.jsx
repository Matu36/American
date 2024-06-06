import { useMutation, useQuery } from "@tanstack/react-query";
import { VentasAPI } from "../components/api/VentasApi";
import Swal from "sweetalert2";

const getVentas = async () => {
  const { data } = await VentasAPI.get("/");
  return data;
};

const getLastFiveVentas = async () => {
  const { data } = await VentasAPI.get("/lastfive");
  return data;
};

const postVenta = async (data) => {
  return await VentasAPI.post("/create", data);
};

export const useVenta = () => {
  const ventasQuery = useQuery({
    queryKey: ["ventas"],
    queryFn: () => getVentas(),
  });

  const fiveventasQuery = useQuery({
    queryKey: ["fiveVentas"],
    queryFn: () => getLastFiveVentas(),
  });

  const ventaMutation = useMutation({
    mutationKey: ["venta-mutation"],
    mutationFn: (data) => postVenta(data),
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "La venta se registró correctamente",
        showConfirmButton: false,
        timer: 2000,
      });
    },
    onError: (data) => {
      // Manejar errores de manera diferente según el status de la respuesta
      switch (data.response.status) {
        case 404:
          Swal.fire({
            position: "center",
            icon: "warning",
            text: "No se pudo registrar la venta",
            title: "Hubo un error",
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
          });
          break;
      }
    },
  });

  return {
    ventasQuery,
    fiveventasQuery,
    ventaMutation,
  };
};
