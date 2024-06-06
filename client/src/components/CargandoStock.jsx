import React, { useEffect } from "react";

export default function CargandoStock({ onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return <div className="cargando">Estamos Cargando Stock</div>;
}
