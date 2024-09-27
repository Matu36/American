const cotizacionEmail = (cotizacion) => {
  const detalles = cotizacion.cotizacionIndividual
    .map((item) => `<li>${item.detalle}</li>`)
    .join("");

  return `
      <h1>Cotización Detallada - ID: ${cotizacion.Id}</h1>
      <ul>
        ${detalles}
      </ul>
    `;
};

module.exports = cotizacionEmail;
