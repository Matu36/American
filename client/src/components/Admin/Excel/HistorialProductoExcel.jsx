import React from "react";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";

const HistorialProductoExcel = ({ data }) => {
  const handleExport = () => {
    // Crear un nuevo array con los elementos específicos
    const filteredData = data.data.map((item) => {
      let estado = "";
      if (item.estado === 2) {
        estado = "Venta concretada";
      }

      return {
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
        Vendedor: `${item.Usuario.nombre} ${item.Usuario.apellido}`,
        Estado: estado,
      };
    });

    // Obtener el nombre completo del producto
    const producto = data.data[0]
      ? `${data.data[0].Producto.familia} ${data.data[0].Producto.marca} ${data.data[0].Producto.modelo}`
      : "Producto";

    // Crear una hoja de trabajo vacía
    const worksheet = XLSX.utils.json_to_sheet([]);

    // Agregar el título y la fecha al principio de la hoja
    const currentDate = new Date().toLocaleDateString();
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [[`REPORTE DE HISTORIAL DE PRODUCTO ${producto} AL DÍA ${currentDate}`]],
      { origin: "A1" }
    );

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
