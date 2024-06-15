import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useVentas } from "../../hooks/useCotizaciones";

export default function Ventas() {
  const { auth, setAuth } = useAuth();
  const idUsuario = auth?.id;

  const { ventasQueryById } = useVentas(idUsuario);

  if (ventasQueryById.isLoading) {
    return <div>Loading...</div>;
  }

  if (ventasQueryById.error) {
    return <div>Error: {ventasQueryById.error.message}</div>;
  }

  const ventas = ventasQueryById.data;

  return (
    <div>
      <h1>Ventas</h1>
      {ventas.map((venta) => (
        <div key={venta.id}>
          <p>ID: {venta.id}</p>
          <p>Cliente: {venta.Cliente.nombre}</p>
          <p>Producto: {venta.Producto.familia}</p>
        </div>
      ))}
    </div>
  );
}
