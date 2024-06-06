import React, { useState, useEffect } from "react";
import { useVenta } from "../../../hooks/useVentas";

export default function WidgetLg() {
  const { data, isLoaduing } = useVenta().fiveventasQuery;

  const lastVentas = data?.lastVentas;

  return (
    <div className="userListContainer">
      <span>Últimas ventas realizadas</span>
      <br />
      <table>
        <thead>
          <tr>
            <th>Comprador</th>
            <th>Marca</th>
            <th>Precio</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {lastVentas?.map((venta) => (
            <tr key={venta.id}>
              <td>{venta.comprador}</td>

              <td style={{ wordBreak: "break-all" }}> {venta.marca}</td>
              <td>${venta.precio.toLocaleString()}</td>
              <td>{venta.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
