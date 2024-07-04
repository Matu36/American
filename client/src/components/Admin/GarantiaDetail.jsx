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
    <div className="form-container1">
      <h3>Detalles de la Garantía</h3>

      <div className="detail-section">
        <h4>Información del Cliente</h4>
        <div className="detail-item">
          <strong>Nombre:</strong> {nombre}
        </div>
        <div className="detail-item">
          <strong>Apellido:</strong> {apellido}
        </div>
        <div className="detail-item">
          <strong>Empresa:</strong> {empresa}
        </div>
        <div className="detail-item">
          <strong>Email:</strong> {email}
        </div>
        <div className="detail-item">
          <strong>Teléfono:</strong> {telefono}
        </div>
      </div>

      <div className="detail-section">
        <h4>Detalles de la Máquina</h4>
        <div className="detail-item">
          <strong>Tipo de Máquina:</strong> {tipoDeMaquina}
        </div>
        <div className="detail-item">
          <strong>Marca:</strong> {marca}
        </div>
        <div className="detail-item">
          <strong>Modelo:</strong> {modelo}
        </div>
        <div className="detail-item">
          <strong>Número de Chasis:</strong> {numeroDeChasis}
        </div>
        <div className="detail-item">
          <strong>Fecha de Entrega del Equipo:</strong>{" "}
          {new Date(fechaEntregaDelEquipo).toLocaleDateString()}
        </div>
        <div className="detail-item">
          <strong>Ubicación:</strong> {ubicacion}
        </div>
        <div className="detail-item">
          <strong>Cantidad de Horas (Horómetro):</strong>{" "}
          {cantidadHorasHorometro}
        </div>
      </div>

      <div className="detail-section">
        <h4>Detalle de la Falla</h4>
        <div className="detail-item">
          <p>{falla}</p>
        </div>
      </div>
    </div>
  );
}
