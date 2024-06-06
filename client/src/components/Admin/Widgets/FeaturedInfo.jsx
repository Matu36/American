import React, { useState, useEffect } from "react";
import { useVenta } from "../../../hooks/useVentas";

export default function FeaturedInfo() {
  const { data, isLoaduing } = useVenta().ventasQuery;

  const ventas = data?.allVentas;

  const sumatoriaCuota1 = ventas?.reduce(
    (total, venta) => total + venta.cuota1,
    0
  );

  // Calcula la sumatoria de cuota2
  const sumatoriaCuota2 = ventas?.reduce(
    (total, venta) => total + venta.cuota2,
    0
  );

  const sumatoriaTotal = sumatoriaCuota1 + sumatoriaCuota2;

  // Calcula la sumatoria de costo
  const sumatoriaCosto = ventas?.reduce(
    (total, venta) => total + venta.costo,
    0
  );

  const ganancias = sumatoriaCuota1 + sumatoriaCuota2 - sumatoriaCosto;

  return (
    <div className="featuredInfo">
      <div className="infoBlock">
        <span>Ganancias</span>
        <div>
          <span>${ganancias.toLocaleString()}</span>{" "}
          {/* Ejemplo de valor de ganancias */}
        </div>
        <span>Ganancias totales</span>
      </div>

      <div className="infoBlock">
        <span>Ventas</span>
        <div>
          <span>$ {sumatoriaTotal.toLocaleString()}</span>{" "}
          {/* Ejemplo de valor de ventas */}
        </div>
        <span>Ventas totales</span>
      </div>

      <div className="infoBlock">
        <span>Costos</span>
        <div>
          <span>$ {sumatoriaCosto}</span> {/* Ejemplo de valor de costos */}
        </div>
        <span>Costos totales</span>
      </div>
    </div>
  );
}
