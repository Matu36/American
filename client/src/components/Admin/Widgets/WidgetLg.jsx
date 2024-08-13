import React, { useState, useEffect } from "react";
import { useUltimasCotizaciones } from "../../../hooks/useCotizaciones";
import useAuth from "../../../hooks/useAuth";

export default function WidgetLg() {
  const { auth } = useAuth();
  const token = localStorage.getItem("token");
  const idUsuario = token;

  const { data, isLoading } =
    useUltimasCotizaciones(idUsuario).ultimasCotizacionesQuery;

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="userListContainer">
      <span>Últimas cotizaciones realizadas</span>
      <br />
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Modelo</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((cotizacion, index) => (
            <tr key={index}>
              <td>
                {cotizacion.Cliente.nombre} {cotizacion.Cliente.apellido}
              </td>
              <td>{cotizacion.Producto.modelo}</td>
              <td>$ {cotizacion.PrecioFinal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
