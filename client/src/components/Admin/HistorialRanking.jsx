import React, { useEffect, useState } from "react";
import { useRanking } from "../../hooks/useCotizaciones";
import { FaTimes } from "react-icons/fa";
import Spinner from "../../UI/Spinner";

export default function HistorialRanking() {
  const { data, isLoading } = useRanking().rankingQuery;
  const [showRanking, setShowRanking] = useState(true);

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (!data || !showRanking) return null;

  return (
    <div className="contact-container">
      <button
        className="close-button-ranking"
        onClick={() => setShowRanking(false)}
      >
        <FaTimes />
      </button>
      <h2>Ranking</h2>
      <br />
      <div className="ranking-item">
        <h2>Vendedor con más cotizaciones</h2>
        <p>
          {data?.VendedorMasCotizaciones?.nombre}{" "}
          {data?.VendedorMasCotizaciones?.apellido} con{" "}
          {data?.VendedorMasCotizaciones?.count} cotizaciones.
        </p>
      </div>
      <div className="ranking-item">
        <h2>Vendedor con más ventas</h2>
        <p>
          {data?.VendedorMasVentas?.nombre} {data?.VendedorMasVentas?.apellido}{" "}
          con {data?.VendedorMasVentas?.count} ventas.
        </p>
      </div>
      <div className="ranking-item">
        <h2>Cliente con más cotizaciones</h2>
        <p>
          {data?.ClienteMasCotizaciones?.nombre}{" "}
          {data?.ClienteMasCotizaciones?.apellido} con{" "}
          {data?.ClienteMasCotizaciones?.count} cotizaciones.
        </p>
      </div>
      <div className="ranking-item">
        <h2>Cliente con más ventas</h2>
        <p>
          {data?.ClienteMasVentas?.nombre} {data?.ClienteMasVentas?.apellido}{" "}
          con {data?.ClienteMasVentas?.count} ventas.
        </p>
      </div>
      <div className="ranking-item">
        <h2>Producto con más cotizaciones</h2>
        <p>
          Modelo {data?.ProductoMasCotizaciones?.modelo} con{" "}
          {data.ProductoMasCotizaciones?.count} cotizaciones.
        </p>
      </div>
      <div className="ranking-item">
        <h2>Producto con más ventas</h2>
        <p>
          Modelo {data?.ProductoMasVentas?.modelo} con{" "}
          {data?.ProductoMasVentas?.count} ventas.
        </p>
      </div>
    </div>
  );
}
