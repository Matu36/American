import React from "react";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";

const HistorialFechaExcel = ({ data, fechaDesde, fechaHasta }) => {
  const handleExport = () => {
    // Crear un nuevo array con los elementos específicos
    const filteredData = data.data.map((item) => {
      let estado = "";

      // Agregar condición para el estado aquí
      // Por ejemplo, si el estado es 2, mostrar "Venta concretada"
      if (item.estado === 2) {
        estado = "Venta concretada";
      }

      return {
        "Número de Cotización": item.codigoCotizacion,
        Moneda: item.moneda,
        "Precio de Venta": item.precio,
        "Saldo a Financiar": `${item.moneda} ${parseFloat(
          item.saldoAFinanciar
        ).toFixed(2)}`,
        Cuotas: item.cuotas,
        Financiación: `${item.moneda} ${parseFloat(item.cuotaValor).toFixed(
          2
        )}`,
        "Precio Final": item.PrecioFinal,
        "Fecha de Creación": item.fechaDeCreacion,
        "Fecha de Modificación": item.fechaModi,
        Producto: `${item.Producto.marca} ${item.Producto.modelo}`,
        Cliente: `${item.Cliente.nombre} ${item.Cliente.apellido}`,
        Vendedor: `${item.Usuario.nombre} ${item.Usuario.apellido}`,
        Estado: estado,
      };
    });

    // Crear una hoja de trabajo vacía
    const worksheet = XLSX.utils.json_to_sheet([]);

    // Construir el título con las fechas desde y hasta
    const currentDate = new Date().toLocaleDateString();
    const title = `REPORTE DE HISTORIAL DESDE ${fechaDesde} HASTA ${fechaHasta} AL DÍA ${currentDate}`;
    XLSX.utils.sheet_add_aoa(worksheet, [[title]], { origin: "A1" });

    // Agregar una fila vacía después del título
    XLSX.utils.sheet_add_aoa(worksheet, [[]], { origin: -1 });

    // Agregar los datos del historial de ventas empezando en la tercera fila
    XLSX.utils.sheet_add_json(worksheet, filteredData, {
      origin: -1,
      skipHeader: false,
    });

    // Crear un libro de trabajo y agregar la hoja
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

    // Generar el archivo Excel y descargarlo
    XLSX.writeFile(workbook, "HistorialFecha.xlsx");
  };

  return (
    <button className="excel" onClick={handleExport}>
      <SiMicrosoftexcel size={34} color="#217346" />
      Excel
    </button>
  );
};

export default HistorialFechaExcel;
