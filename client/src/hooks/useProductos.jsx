import { useMutation, useQuery } from "@tanstack/react-query";
import { ProductosAPI } from "../components/api/ProductosApi";
import Swal from "sweetalert2";

const getProductos = async () => {
  const { data } = await ProductosAPI.get("/getAll");
  return data;
};

const productoById = async (id) => {
  const { data } = await ProductosAPI.get(`/${id}`);
  return data;
};

const productoByFamilia = async (familia) => {
  const { data } = await ProductosAPI.get(`/familia/${familia}`);
  return data;
};

const getProductosParaCotizar = async () => {
  const { data } = await ProductosAPI.get("/getParaCotizar");
  return data;
};

const getProductosCategorias = async () => {
  const { data } = await ProductosAPI.get("/getCategorias");
  return data;
};
const getProductosMarcas = async () => {
  const { data } = await ProductosAPI.get("/getMarcas");
  return data;
};
const getProductosDivisiones = async () => {
  const { data } = await ProductosAPI.get("/getDivisiones");
  return data;
};

const editProducto = async (data) => {
  return await ProductosAPI.put(`edit`, data);
};

export const useProducto = (id, familia) => {
  const productosQuery = useQuery({
    queryKey: ["productos"],
    queryFn: () => getProductos(),
  });

  const productoQueryById = useQuery({
    queryKey: ["productodetail", { productoId: id }],
    queryFn: () => productoById(id),
    enabled: id !== undefined && id !== null,
  });

  const productoQueryByFamilia = useQuery({
    queryKey: ["productofamilia", { familia }],
    queryFn: () => productoByFamilia(familia),
    enabled: familia !== undefined && familia !== null,
  });

  const productosParaCotizarQuery = useQuery({
    queryKey: ["productoscoti"],
    queryFn: () => getProductosParaCotizar(),
  });

  const productosCategoriasQuery = useQuery({
    queryKey: ["productoscategorias"],
    queryFn: () => getProductosCategorias(),
  });
  const productosMarcasQuery = useQuery({
    queryKey: ["productosmarcas"],
    queryFn: () => getProductosMarcas(),
  });
  const productosDivisionesQuery = useQuery({
    queryKey: ["productosdivisiones"],
    queryFn: () => getProductosDivisiones(),
  });

  const productosEditMutation = useMutation({
    mutationKey: ["edit-producto"],
    mutationFn: (data) => editProducto(data),
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Los datos del Producto se actualizaron correctamente",
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
              title: "No se pudieron actualizar los datos. Intente más tarde",
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
    productosQuery,
    productosParaCotizarQuery,
    productoQueryById,
    productosEditMutation,
    productosCategoriasQuery,
    productosMarcasQuery,
    productosDivisionesQuery,
    productoQueryByFamilia,
  };
};
