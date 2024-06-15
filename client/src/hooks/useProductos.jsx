import { useMutation, useQuery } from "@tanstack/react-query";
import { ProductosAPI } from "../components/api/ProductosApi";

const getProductos = async () => {
  const { data } = await ProductosAPI.get("/");
  return data;
};

export const useProducto = () => {
  const productosQuery = useQuery({
    queryKey: ["productos"],
    queryFn: () => getProductos(),
  });

  return {
    productosQuery,
  };
};
