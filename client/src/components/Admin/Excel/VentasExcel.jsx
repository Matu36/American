import React from "react";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";

const VentasExcel = ({ data }) => {
  const handleExport = () => {
    // Crear un nuevo array con los elementos específicos
    const filteredData = data.map((item) => ({
      Categoria: item.Producto.familia,
      Marca: item.Producto.marca,
      Modelo: item.Producto.modelo,
      NroCotización: item.numeroCotizacion,
      Moneda: item.moneda,
      PrecioFinal: item.PrecioFinal,
      FechaVenta: item.fechaDeCreacion,
      Vendedor: `${item.Usuario.nombre} ${item.Usuario.apellido}`,
      Cliente: `${item.Cliente.nombre} ${item.Cliente.apellido}`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

    XLSX.writeFile(workbook, "Ventas.xlsx");
  };

  return (
    <button className="excel" onClick={handleExport}>
      <SiMicrosoftexcel size={34} color="#217346" />
      Excel
    </button>
  );
};

export default VentasExcel;
