const cotizacionEmail = (cotizacion) => {
  const PDFUrl =
    "https://png.pngtree.com/png-vector/20220606/ourlarge/pngtree-pdf-file-icon-png-png-image_4899509.png"; // URL pública de la imagen

  // Obtener detalles de las cotizaciones individuales
  const cotizacionesIndividuales = cotizacion.cotizacionesIndividuales
    .map(
      (item) => `
      <li style="margin-bottom: 10px; list-style: none; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
        <strong>Producto:</strong> ${item.idProducto} <br />
        <strong>Precio:</strong> ${item.precio} ${cotizacion.moneda} <br />
        <strong>Cuotas:</strong> ${item.cuotas} <br />
        <strong>Cuota Valor:</strong> ${item.cuotaValor} <br />
        <strong>Anticipo:</strong> ${item.anticipoPorcentaje}% - ${item.anticipo} ${cotizacion.moneda} <br />
        <strong>Precio Final:</strong> ${item.PrecioFinal} ${cotizacion.moneda} <br />
      </li>`
    )
    .join("");

  // Generar el template del email
  return `
    <div style="font-family: 'Arial', sans-serif; color: #333; padding: 20px; background-color: #f9f9f9; border: 1px solid #ccc; border-radius: 8px; width: 80%; margin: auto; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
      <h1 style="text-align: center; color: #444; font-weight: normal; font-size: 24px;">Cotización Detallada - N°: ${cotizacion.codigoCotizacion}</h1>
      <p style="text-align: center; margin: 0; font-weight: bold;">Cliente: ${cotizacion.cliente.razonSocial} (${cotizacion.cliente.CUIT})</p>
      <p style="text-align: center; margin: 5px 0;">Fecha de creación: ${cotizacion.fechaDeCreacion}</p>

      <h2 style="text-align: center; color: #555; font-size: 20px;">Detalles del Producto</h2>
      <p style="text-align: center; margin: 5px 0; font-size: 16px;">
        <strong>Marca:</strong> ${cotizacion.producto.marca} <br />
        <strong>Modelo:</strong> ${cotizacion.producto.modelo} <br />
        <strong>Motor:</strong> ${cotizacion.producto.motor} <br />
        <strong>Características Generales:</strong> ${cotizacion.producto.caracteristicasGenerales}
      </p>

      <h2 style="text-align: center; color: #555; font-size: 20px;">Detalles de la Cotización</h2>
      <ul style="padding: 0; margin: 0; list-style-type: none; text-align: center;">
        ${cotizacionesIndividuales}
      </ul>

      <p style="text-align: center; margin: 5px 0; font-size: 16px;"><strong>IVA:</strong> ${cotizacion.IVA}%</p>
      <p style="text-align: center; margin: 5px 0; font-size: 16px;"><strong>Precio Final (con IVA):</strong> ${cotizacion.PrecioFinal} ${cotizacion.moneda}</p>

      <p style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 18px;">Descargá la Cotización:</p>
      <a href="${cotizacion.CotizacionPDF}" download style="text-decoration: none; display: inline-block; margin-bottom: 20px;">
        <img src="${PDFUrl}" alt="Descargar PDF" style="width: 50px; height: auto; border: none;" />
      </a>

      <p style="text-align: center; margin: 0; color: #666; font-size: 16px;">Gracias por confiar en nosotros.</p>
    </div>
  `;
};

module.exports = cotizacionEmail;
