import React from "react";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";

const ContactoProductoExcel = ({ data }) => {
  const handleExport = () => {
    // Crear un nuevo array con los elementos específicos
    const filteredData = data.map((item) => ({
      nombre: item.nombre,
      apellidos: item.apellido,
      email: item.email,
      telefono: item.telefonoCelular,
      direccion: item.direccion,
      RazónSocial: item.razonSocial,
      createdAt: item.fechaDeRegistro,
      Marca: item.Producto.marca,
      Modelo: item.Producto.modelo,
    }));

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

    XLSX.writeFile(workbook, "ContactosProductos.xlsx");
  };

  return (
    <button className="excel" onClick={handleExport}>
      <SiMicrosoftexcel size={34} color="#217346" />
      Excel
    </button>
  );
};

export default ContactoProductoExcel;
