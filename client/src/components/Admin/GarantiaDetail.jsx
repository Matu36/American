import React from "react";
import { useGarantia } from "../../hooks/useGarantia";
import { useParams } from "react-router-dom";

export default function GarantiaDetail() {
  const { id } = useParams();
  const { data: garantiaData, isLoading } = useGarantia(id).garantiaQueryById;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const {
    nombre,
    apellido,
    empresa,
    email,
    telefono,
    tipoDeMaquina,
    marca,
    modelo,
    numeroDeChasis,
    fechaEntregaDelEquipo,
    ubicacion,
    cantidadHorasHorometro,
    falla,
  } = garantiaData;

  return (
    <div className="garantia-detail">
      <h1>Detalles de la Garantía</h1>
      <div className="garantia-detail-card">
        <h2>Información del Cliente</h2>
        <p>
          <strong>Nombre:</strong> {nombre}
        </p>
        <p>
          <strong>Apellido:</strong> {apellido}
        </p>
        <p>
          <strong>Empresa:</strong> {empresa}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Teléfono:</strong> {telefono}
        </p>

        <div className="machine-details">
          <h2>Detalles de la Máquina</h2>
          <p>
            <strong>Tipo de Máquina:</strong> {tipoDeMaquina}
          </p>
          <p>
            <strong>Marca:</strong> {marca}
          </p>
          <p>
            <strong>Modelo:</strong> {modelo}
          </p>
          <p>
            <strong>Número de Chasis:</strong> {numeroDeChasis}
          </p>
          <p>
            <strong>Fecha de Entrega del Equipo:</strong>{" "}
            {new Date(fechaEntregaDelEquipo).toLocaleDateString()}
          </p>
          <p>
            <strong>Ubicación:</strong> {ubicacion}
          </p>
          <p>
            <strong>Cantidad de Horas (Horómetro):</strong>{" "}
            {cantidadHorasHorometro}
          </p>
        </div>

        <div className="failure-details">
          <h2>Detalle de la Falla</h2>
          <p>{falla}</p>
        </div>
      </div>
    </div>
  );
}
