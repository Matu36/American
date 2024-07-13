import React from "react";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";

const HistorialProductoExcel = ({ data }) => {
  const handleExport = () => {
    // Crear un nuevo array con los elementos específicos
    const filteredData = data.data.map((item) => ({
      "Número de Cotización": item.numeroCotizacion,
      Precio: item.precio,
      Anticipo: item.anticipo,
      "Saldo a Financiar": item.saldoAFinanciar,
      IVA: item.IVA,
      "Precio Final": item.PrecioFinal,
      "Fecha de Creación": item.fechaDeCreacion,
      "Fecha de Modificación": item.fechaModi,
      Producto: `${item.Producto.familia} ${item.Producto.marca} ${item.Producto.modelo}`,
      Cliente: `${item.Cliente.nombre} ${item.Cliente.apellido}`,
      Vendedor: `${item.nombreUsuario} ${item.apellidoUsuario}`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

    XLSX.writeFile(workbook, "HistorialProducto.xlsx");
  };

  return (
    <button className="excel" onClick={handleExport}>
      <SiMicrosoftexcel size={34} color="#217346" />
      Excel
    </button>
  );
};

export default HistorialProductoExcel;
