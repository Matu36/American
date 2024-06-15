import React, { useState, useEffect } from "react";

export default function FeaturedInfo() {
  return (
    <div className="featuredInfo">
      <div className="infoBlock">
        <span>Ganancias</span>
        <div>
          <span>$ Ganancias</span> {/* Ejemplo de valor de ganancias */}
        </div>
        <span>Ganancias totales</span>
      </div>

      <div className="infoBlock">
        <span>Ventas</span>
        <div>
          <span>$ Ventas</span> {/* Ejemplo de valor de ventas */}
        </div>
        <span>Ventas totales</span>
      </div>

      <div className="infoBlock">
        <span>Cotis</span>
        <div>
          <span>$ Cotizaciones</span> {/* Ejemplo de valor de costos */}
        </div>
        <span>Cotis</span>
      </div>
    </div>
  );
}
