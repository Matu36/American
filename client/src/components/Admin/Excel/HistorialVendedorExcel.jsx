import React from "react";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";

const HistorialVendedorExcel = ({ data }) => {
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
      Producto: `${item.familia} ${item.marca} ${item.modelo}`,
      Cliente: `${item.nombreCliente} ${item.apellidoCliente}`,
      Vendedor: `${item.nombreUsuario} ${item.apellidoUsuario}`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

    XLSX.writeFile(workbook, "HistorialVendedor.xlsx");
  };

  return (
    <button className="excel" onClick={handleExport}>
      <SiMicrosoftexcel size={34} color="#217346" />
      Excel
    </button>
  );
};

export default HistorialVendedorExcel;
