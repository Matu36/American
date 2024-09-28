const cotizacionEmail = (cotizacion) => {
  const PDFUrl =
    "https://png.pngtree.com/png-vector/20220606/ourlarge/pngtree-pdf-file-icon-png-png-image_4899509.png"; // URL pública de la imagen para el PDF
  const americanVialImage =
    "https://res.cloudinary.com/dmfzplfra/image/upload/v1727536957/Images/american_ftok3h.png"; // URL de la imagen de American Vial

  const notasEmail = cotizacion.notasEmail || "";

  // Obtener detalles de las cotizaciones individuales
  const cotizacionesIndividuales = cotizacion.cotizacionesIndividuales
    .map((item, index) => {
      const cuotasOption =
        item.cuotas > 1
          ? `Opción ${index + 1}: ${item.anticipoPorcentaje}% y ${
              item.cuotas
            } E-Cheq`
          : `${item.anticipoPorcentaje}% y ${item.cuotas} E-Cheq`;
      const saldoConInteres = item.saldoConInteres || 0;
      const cuotaValorEnPesos = item.cuotaValorEnPesos || 0;

      return `
        <li style="margin-bottom: 10px; list-style: none; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
          <strong>Forma de Pago:</strong> ${item.anticipoPorcentaje}% - Anticipo USD: ${item.anticipo} <br />
          <strong>${cuotasOption}:</strong> <br />
          <strong>Saldo en Cuotas:</strong> ${item.cuotas} E-Cheq de $${cuotaValorEnPesos} <br />
          <strong>IVA con E-Cheq a 30 días:</strong> $${saldoConInteres} <br />
        </li>`;
    })
    .join("");

  return `
    <div style="font-family: 'Arial', sans-serif; color: #333; padding: 20px; background-color: #f9f9f9; border: 1px solid #ccc; border-radius: 8px; width: 80%; margin: auto; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
      <p style="text-align: center; font-weight: bold; background-color: #ffcc00; padding: 10px; font-size: 18px;">${notasEmail}</p>

      <h1 style="text-align: center; color: #444; font-weight: normal; font-size: 24px;">Cotización N°: ${cotizacion.codigoCotizacion}</h1>
      <p style="text-align: center; margin: 0; font-weight: bold;">Cliente: ${cotizacion.cliente.razonSocial} (${cotizacion.cliente.CUIT})</p>
      
      <h2 style="text-align: center; color: #555; font-size: 20px;">Detalles de la Cotización</h2>
      <p style="text-align: center;">
        <strong>VALOR PAGO DE CONTADO:</strong> U$S 184.250 + IVA 10.5% <br />
        <strong>Cotización Dólar BNA:</strong> Ejemplo Hoy BNA $ 977, Precio en Pesos: $180.012.250 + IVA 10.5%
      </p>
      
      <p style="text-align: center; font-weight: bold; color: #f00;">Propuesta de financiación POR TIEMPO LIMITADO sujeto a aprobación:</p>
      <ul style="padding: 0; margin: 0; list-style-type: none; text-align: center;">
        ${cotizacionesIndividuales}
      </ul>

      <p style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 18px;">Descargá la Cotización:</p>
      <a href="${cotizacion.CotizacionPDF}" download style="text-decoration: none; display: inline-block; margin-bottom: 20px;">
        <img src="${PDFUrl}" alt="Descargar PDF" style="width: 50px; height: auto; border: none;" />
      </a>

      <p style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 18px;">Descargá la Ficha del Producto:</p>
      <a href="${cotizacion.Producto.fichaPDF}" download style="text-decoration: none; display: inline-block; margin-bottom: 20px;">
        <img src="${PDFUrl}" alt="Descargar Ficha" style="width: 50px; height: auto; border: none;" />
      </a>

       <img src="${americanVialImage}" alt="American Vial" style="width: 150px; height: auto; display: block; margin: 0 auto;" />

      <p style="text-align: center; margin: 10px 0; font-weight: bold;">Paris 256 esq. Colectora Este <br />
        1611 - Don Torcuato - Bs. As.<br />
        Tel./Fax : (+54) 11 4748 5900 / int. 273
      </p>
      <a href="http://www.americanvial.com" style="text-align: center; display: block; margin-bottom: 20px; font-weight: bold;">www.americanvial.com</a>

     
    </div>
  `;
};

module.exports = cotizacionEmail;
