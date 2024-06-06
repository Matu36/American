import { useMutation, useQuery } from "@tanstack/react-query";
import { ProductosAPI } from "../components/api/ProductosApi";

const getProductos = async () => {
  const { data } = await ProductosAPI.get("/");
  return data;
};

const getProductosVentas = async () => {
  const { data } = await ProductosAPI.get("/ventas");
  return data;
};

export const useProducto = () => {
  const productosQuery = useQuery({
    queryKey: ["productos"],
    queryFn: () => getProductos(),
  });

  const productosventasQuery = useQuery({
    queryKey: ["productosventas"],
    queryFn: () => getProductosVentas(),
  });

  return {
    productosQuery,
    productosventasQuery,
  };
};
