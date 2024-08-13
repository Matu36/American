import React from "react";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";

const VentasExcel = ({ data }) => {
  console.log(data);
  const handleExport = () => {
    const filteredData = data.map((item) => ({
      Categoria: item.Producto.familia,
      Marca: item.Producto.marca,
      Modelo: item.Producto.modelo,
      NroCotización: item.codigoCotizacion,

      Moneda: item.moneda,
      "Precio de Venta": item.precio,
      "Saldo a Financiar": `${item.moneda} ${parseFloat(
        item.saldoAFinanciar
      ).toFixed(2)}`,
      Cuotas: item.cuotas,
      Financiación: `${item.moneda} ${parseFloat(item.cuotaValor).toFixed(2)}`,
      Anticipo: item.anticipo,
      PrecioFinal: item.PrecioFinal,
      FechaVenta: item.fechaDeCreacion,
      Vendedor: `${item.Usuario.nombre} ${item.Usuario.apellido}`,
      Cliente: `${item.Cliente.nombre} ${item.Cliente.apellido}`,
    }));

    // Crear una hoja de trabajo vacía
    const worksheet = XLSX.utils.json_to_sheet([]);

    // Agregar el título y la fecha al principio de la hoja
    const currentDate = new Date().toLocaleDateString();
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [["REPORTE DE VENTAS AL DÍA " + currentDate]],
      { origin: "A1" }
    );

    // Agregar una fila vacía después del título
    XLSX.utils.sheet_add_aoa(worksheet, [[]], { origin: -1 });

    // Agregar los datos de las ventas empezando en la tercera fila
    XLSX.utils.sheet_add_json(worksheet, filteredData, {
      origin: -1,
      skipHeader: false,
    });

    // Crear un libro de trabajo y agregar la hoja
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

    // Generar el archivo Excel y descargarlo
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
