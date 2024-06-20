import React, { useState, useEffect } from "react";
import { useInfoHomeAdmin } from "../../../hooks/useCotizaciones";
import useAuth from "../../../hooks/useAuth";

export default function FeaturedInfo() {
  const { auth } = useAuth();
  const idUsuario = auth?.id;

  const { data, isLoading } = useInfoHomeAdmin(idUsuario).infoAdminQuery;

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="featuredInfo">
      <div className="infoBlock">
        <span>Cotizaciones</span>
        <div>
          <span>$ {data.COTIZACIONES.totalPesos}</span>
        </div>
        <div>
          <span>USD {data.COTIZACIONES.totalUSD}</span>
        </div>
        <span>Cotizaciones totales</span>
      </div>

      <div className="infoBlock">
        <span>Ventas</span>
        <div>
          <span>$ {data.VENTAS.totalPesos}</span>
        </div>
        <div>
          <span>USD {data.VENTAS.totalUSD}</span>
        </div>
        <span>Ventas totales</span>
      </div>

      <div className="infoBlock">
        <span>Cotizaciones Totales</span>
        <div>
          <span>{data.COTIZACIONES.CANTIDADTOTAL}</span>
        </div>
        <span>Ventas Totales</span>
        <div>
          <span>{data.VENTAS.CANTIDADTOTAL}</span>
        </div>
      </div>
    </div>
  );
}
