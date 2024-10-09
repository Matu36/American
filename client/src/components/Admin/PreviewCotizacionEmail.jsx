import React from "react";

export default function PreviewCotizacionEmail({ cotizacionDetalle }) {
  const PDFUrl =
    "https://res.cloudinary.com/dmfzplfra/image/upload/v1727730981/PDF_b1hsox.png"; // URL pública de la imagen para el PDF
  const americanVialImage =
    "https://res.cloudinary.com/dmfzplfra/image/upload/v1727536957/Images/american_ftok3h.png"; // URL de la imagen de American Vial

  const notasEmail = cotizacionDetalle.notasEmail || "";

  // Filtrar cotizacionesIndividuales para incluir solo aquellas con más de 1 cuota
  const cotizacionesIndividuales = cotizacionDetalle.cotizacionesIndividuales
    .filter((item) => item.cuotas > 1) // Filtra las que tienen más de 1 cuota
    .map((item, index) => {
      const cuotasOption =
        item.cuotas > 1
          ? `Opción ${index + 1}: ${item.anticipoPorcentaje}% anticipo y ${
              item.cuotas
            } E-Cheq`
          : `${item.anticipoPorcentaje}% anticipo y ${item.cuotas} E-Cheq`;
      const saldoConInteres = item.saldoConInteres || 0;
      const cuotaValorEnPesos = item.cuotaValorEnPesos || 0;

      return `        
      <div style="margin-bottom: 30px; list-style: none; padding: 10px 0; text-align: left; position: relative;">
        <span style="position: absolute; left: -20px; top: 10px; width: 10px; height: 10px; border-radius: 50%; background-color: #000;"></span>
        <strong style="text-decoration: underline; margin-bottom: 5px; display: block;">${cuotasOption}:</strong> 
        <strong>${cotizacionDetalle.formaPago}</strong> $${item.anticipoPorcentaje}% - Anticipo USD: ${item.anticipo} equivalentes a $ ${(
          item.anticipo * item.cotizacionDolar
        ).toLocaleString("es-ES", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
         <br />
        <span style="background-color: #ffeaa7; border-radius: 3px;">
          <strong>Saldo en</strong> $${item.cuotas} E-Cheq de $${(Number(cuotaValorEnPesos) || 0).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} cada 30 días fijos
        </span> en pesos. <br />
       <strong>IVA con otro E-Cheq a 30 días de:</strong> $${(item.anticipo > 0
         ? (item.cuotaValorEnPesos * item.cuotas +
             item.anticipo * item.cotizacionDolar) *
           item.IVA
         : item.cuotaValorEnPesos * item.cuotas * item.IVA
       ).toLocaleString("es-ES", {
         minimumFractionDigits: 2,
         maximumFractionDigits: 2,
       })}
       <br />
      </li>`;
    })
    .join("");

  const primerCotizacion = cotizacionDetalle.cotizacionesIndividuales[0];

  return (
    <div
      style={{
        fontFamily: "'Arial', sans-serif",
        color: "#333",
        padding: "10px",
        backgroundColor: "#f9f9f9",
        border: "1px solid #ccc",
        borderRadius: "4px",
        width: "95%",
        margin: "auto",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h5
        style={{
          textAlign: "right",
          color: "#444",
          fontWeight: "normal",
          fontSize: "16px",
          opacity: 0.8,
        }}
      >
        Cotización N°: {cotizacionDetalle.codigoCotizacion}
      </h5>
      <p style={{ textAlign: "left", margin: 0, fontWeight: "bold" }}>
        Cliente:
      </p>
      <p style={{ textAlign: "left", margin: 0, color: "rgba(0, 0, 0, 0.6)" }}>
        Razón Social: {cotizacionDetalle.cliente.razonSocial} &nbsp; CUIT: (
        {cotizacionDetalle.cliente.CUIT})
      </p>
      <p style={{ textAlign: "left", margin: 0, color: "rgba(0, 0, 0, 0.6)" }}>
        {cotizacionDetalle.cliente.nombre} {cotizacionDetalle.cliente.apellido}
      </p>
      <p
        style={{
          textAlign: "left",
          fontWeight: 600,
          fontSize: "16px",
          marginTop: "35px",
        }}
      >
        {notasEmail}
      </p>
      <h2
        style={{
          textAlign: "center",
          color: "#555",
          fontSize: "20px",
          textDecoration: "underline",
          marginTop: "35px",
        }}
      >
        Detalles de la Cotización
      </h2>
      <p style={{ textAlign: "center" }}>
        <strong>VALOR PAGO DE CONTADO:</strong> U$S {primerCotizacion.precio} +
        IVA 10.5% <br />
        <strong>Cotización Dólar BNA:</strong> Ejemplo Hoy BNA ${" "}
        {primerCotizacion.cotizacionDolar}, Precio en Pesos: $$
        {(Number(primerCotizacion.precioEnPesos) || 0).toLocaleString("es-ES", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        + IVA 10.5%
      </p>
      <p style={{ textAlign: "center", fontWeight: "bold", color: "#f00" }}>
        Propuesta de financiación POR TIEMPO LIMITADO sujeto a aprobación
      </p>
      <ul
        style={{
          padding: 0,
          margin: 0,
          listStyleType: "none",
          textAlign: "center",
        }}
        dangerouslySetInnerHTML={{ __html: cotizacionesIndividuales }}
      />
      <p
        style={{
          fontWeight: "bold",
          textDecoration: "underline",
          textAlign: "center",
        }}
      >
        ENTREGA INMEDIATA
      </p>
      <div
        style={{ textAlign: "center", margin: "20px 0", fontWeight: "bold" }}
      >
        <p>Plazo de Entrega: {cotizacionDetalle.plazoEntrega}</p>
        <p>Mantenimiento de Oferta: {cotizacionDetalle.mantenimientoOferta}</p>
        <p>Lugar de Entrega: {cotizacionDetalle.lugarEntrega}</p>
        <p>Garantía: {cotizacionDetalle.garantia}</p>
        <p>Entrega Técnica: {cotizacionDetalle.entregaTecnica}</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: "40px",
          marginBottom: "50px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <a
            href={cotizacionDetalle.CotizacionPDF}
            download
            style={{ textDecoration: "none" }}
          >
            <img
              src={PDFUrl}
              alt="Descargar PDF"
              style={{ width: "50px", height: "auto", border: "none" }}
            />
          </a>
          <div
            style={{ marginTop: "5px", fontWeight: "bold", fontSize: "16px" }}
          >
            Cotización
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <a
            href={cotizacionDetalle.producto.fichaPDF}
            download
            style={{ textDecoration: "none" }}
          >
            <img
              src={PDFUrl}
              alt="Descargar Ficha"
              style={{ width: "50px", height: "auto", border: "none" }}
            />
          </a>
          <div
            style={{ marginTop: "5px", fontWeight: "bold", fontSize: "16px" }}
          >
            Ficha Técnica de {cotizacionDetalle.producto.familia}{" "}
            {cotizacionDetalle.producto.marca}{" "}
            {cotizacionDetalle.producto.modelo}
          </div>
        </div>
      </div>
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <img
          src={americanVialImage}
          alt="American Vial"
          style={{
            width: "150px",
            height: "auto",
            display: "block",
            margin: "20px auto",
          }}
        />
        <p style={{ margin: "10px 0", fontWeight: "bold" }}>
          Paris 256 esq. Colectora Este <br />
          1611 - Don Torcuato - Argentina <br />
          Teléfono: (011) 5771-0073 <br />
          Email: ventas@americanvial.com
        </p>
      </div>
    </div>
  );
}
