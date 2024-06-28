import React, { useEffect, useState } from "react";
import { useRanking } from "../../hooks/useCotizaciones";

export default function HistorialRanking() {
  const { data, isLoading } = useRanking().rankingQuery;
  const [showRanking, setShowRanking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRanking(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <div>Cargando...</div>;
  if (!data || !showRanking) return null;

  return (
    <div className="ranking-container">
      <div className="ranking-item">
        <h2>Vendedor con más cotizaciones</h2>
        <p>
          {data.VendedorMasCotizaciones.nombre}{" "}
          {data.VendedorMasCotizaciones.apellido} con{" "}
          {data.VendedorMasCotizaciones.count} cotizaciones.
        </p>
      </div>
      <div className="ranking-item">
        <h2>Vendedor con más ventas</h2>
        <p>
          {data.VendedorMasVentas.nombre} {data.VendedorMasVentas.apellido} con{" "}
          {data.VendedorMasVentas.count} ventas.
        </p>
      </div>
      <div className="ranking-item">
        <h2>Producto con más cotizaciones</h2>
        <p>
          Modelo {data.ProductoMasCotizaciones.modelo} con{" "}
          {data.ProductoMasCotizaciones.count} cotizaciones.
        </p>
      </div>
      <div className="ranking-item">
        <h2>Producto con más ventas</h2>
        <p>
          Modelo {data.ProductoMasVentas.modelo} con{" "}
          {data.ProductoMasVentas.count} ventas.
        </p>
      </div>
    </div>
  );
}
