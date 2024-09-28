const cotizacionEmail = (cotizacion) => {
  // Obtener detalles de las cotizaciones individuales
  const cotizacionesIndividuales = cotizacion.cotizacionesIndividuales
    .map(
      (item) => `
      <li>
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
    <h1>Cotización Detallada - N°: ${cotizacion.numeroCotizacion}</h1>
    <p><strong>Cliente:</strong> ${cotizacion.cliente.razonSocial} (${cotizacion.cliente.CUIT})</p>
    <p><strong>Fecha de creación:</strong> ${cotizacion.fechaDeCreacion}</p>

    <h2>Detalles del Producto</h2>
    <p><strong>Marca:</strong> ${cotizacion.producto.marca} <br />
    <strong>Modelo:</strong> ${cotizacion.producto.modelo} <br />
    <strong>Motor:</strong> ${cotizacion.producto.motor} <br />
    <strong>Características Generales:</strong> ${cotizacion.producto.caracteristicasGenerales}</p>

    <h2>Detalles de la Cotización</h2>
    <ul>
      ${cotizacionesIndividuales}
    </ul>

    <p><strong>IVA:</strong> ${cotizacion.IVA}% <br />
    <strong>Precio Final (con IVA):</strong> ${cotizacion.PrecioFinal} ${cotizacion.moneda}</p>

    <p>Gracias por confiar en nosotros.</p>
  `;
};

module.exports = cotizacionEmail;
