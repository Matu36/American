import React from "react";
import { useParams } from "react-router-dom";
import { useProducto } from "../../hooks/useProductos";
import Spinner from "../../UI/Spinner";

export default function ProductosDetalle() {
  const { id } = useParams();
  const { data: productoData, isLoading } = useProducto(id).productoQueryById;

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  const excludedFields = [
    "fichaPDF",
    "imagen",
    "imagen1",
    "imagen2",
    "imagen3",
    "imagen4",
    "imagen5",
    "imagen6",
    "Detalles",
    "id",
  ];

  // Convert the "Detalles" string into an array of key-value pairs
  const detallesArray = productoData.Detalles
    ? productoData.Detalles.split("\n").map((detail) => {
        const [key, value] = detail.split(": ");
        return { key, value };
      })
    : [];

  const itemStyle = {
    marginBottom: "10px",
    textTransform: "capitalize", // Capitaliza la primera letra de cada palabra
  };

  return (
    <div className="form-container1">
      <h3 style={itemStyle}>Detalle del Producto</h3>
      <div>
        {Object.keys(productoData)
          .filter((key) => !excludedFields.includes(key))
          .map((key) => (
            <div key={key} style={itemStyle}>
              <strong>{key}:</strong> {productoData[key]}
            </div>
          ))}
      </div>
      <div className="contactoDerivado">
        <h3 style={{ color: "black" }}>ESPECIFICACIONES</h3>
        {detallesArray.map(({ key, value }, index) => (
          <div key={index} style={itemStyle}>
            <strong>{key}:</strong> {value}
          </div>
        ))}
      </div>
    </div>
  );
}
