import React from "react";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";

const ClientesExcel = ({ data }) => {
  const handleExport = () => {
    // Crear un nuevo array con los elementos específicos
    const filteredData = data.map((item) => ({
      nombre: item.nombre,
      apellidos: item.apellido,
      email: item.mail,
      CUIT: item.CUIT,
      razonSocial: item.razonSocial,
      fecharegistro: item.fechaDeCreacion,
    }));

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

    XLSX.writeFile(workbook, "Clientes.xlsx");
  };

  return (
    <button className="excel" onClick={handleExport}>
      <SiMicrosoftexcel size={34} color="#217346" />
      Excel
    </button>
  );
};

export default ClientesExcel;
