import { useMutation, useQuery } from "@tanstack/react-query";
import { ProductosAPI } from "../components/api/ProductosApi";

const getProductos = async () => {
  const { data } = await ProductosAPI.get("/");
  return data;
};

const getProductosParaCotizar = async () => {
  const { data } = await ProductosAPI.get("/getParaCotizar");
  return data;
};

export const useProducto = () => {
  const productosQuery = useQuery({
    queryKey: ["productos"],
    queryFn: () => getProductos(),
  });

  const productosParaCotizarQuery = useQuery({
    queryKey: ["productoscoti"],
    queryFn: () => getProductosParaCotizar(),
  });

  return {
    productosQuery,
    productosParaCotizarQuery,
  };
};
