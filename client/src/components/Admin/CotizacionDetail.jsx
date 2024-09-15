import React from "react";
import { useCotizaciones } from "../../hooks/useCotizaciones";
import { useParams } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";
import Logo from "../../assets/img/LOGOAMERICANPRINCIPAL.png";
import Empresa from "../../assets/img/EmpresaPDF.jpg";
import Spinner from "../../UI/Spinner";
import americanvial from "../../assets/img/PDF/AMERICAN.png";
import ENERGY from "../../assets/img/PDF/ENERGY.png";
import AMERICANDEGRADE from "../../assets/img/PDF/AMERICANDEGRADE.png";
import SINOMACH from "../../assets/img/PDF/SINOMACH.png";
import { toWords } from "number-to-words";

import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  Image,
} from "@react-pdf/renderer";
import { styles } from "../../assets/Styles/PDFestilosDetalle";
import BackButton from "../../UI/BackButton";

export default function CotizacionDetail() {
  const { id } = useParams();

  const { data: cotizacionDetalle, isLoading } = useCotizaciones(
    null,
    id
  ).cotizacionDetalleQuery;

  console.log(cotizacionDetalle);

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const opciones = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const fecha = new Date();
  const fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);

  const {
    codigoCotizacion,
    usuario,
    cliente,
    producto,
    cotizacionesIndividuales,
    formaPago,
    mantenimientoOferta,
    lugarEntrega,
    garantia,
    entregaTecnica,
    origenFabricacion,
    patentamiento,
    plazoEntrega,
  } = cotizacionDetalle;

  // const cuotasNumber = Number(cuotas);

  // const MyDocument = ({ cotizacionDetalle }) => (
  //   <Document>
  //     <Page size="A4" style={styles.page}>
  //       <View style={styles.logoContainer}>
  //         <Image src={Logo} style={styles.logo} />
  //       </View>
  //       <View style={styles.section}>
  //         <Text style={styles.header}>Cotización {codigoCotizacion}</Text>
  //         <Text style={styles.subHeader}>Información de Cotización</Text>

  //         <Text style={styles.text}>
  //           <Text style={styles.label}>Fecha de Cotización: </Text>
  //           {new Date(fechaDeCreacion).toLocaleString()}
  //         </Text>
  //         <Text style={styles.subHeader}>Producto</Text>
  //         <Text style={styles.text}>
  //           <Text style={styles.label}>Categoría: </Text>
  //           {Producto.familia}
  //         </Text>
  //         <Text style={styles.text}>
  //           <Text style={styles.label}>Marca: </Text>
  //           {Producto.marca}
  //         </Text>
  //         <Text style={styles.text}>
  //           <Text style={styles.label}>Modelo: </Text>
  //           {Producto.modelo}
  //         </Text>
  //         <Text style={styles.subHeader}>Detalle de la Cotización</Text>
  //         <Text style={styles.text}>
  //           <Text style={styles.label}>Precio de Venta: </Text>
  //           {moneda} {parseFloat(precio).toFixed(2)}
  //         </Text>
  //         <Text style={styles.text}>
  //           <Text style={styles.label}>Anticipo: </Text>
  //           {moneda} {parseFloat(anticipo).toFixed(2)}
  //         </Text>
  //         <Text style={styles.text}>
  //           <Text style={styles.label}>Financiación: </Text>
  //           {(cuotasNumber === 1 || cuotasNumber === 0) && (
  //             <Text style={styles.text}>
  //               {moneda} {parseFloat(PrecioFinal).toFixed(2)}
  //             </Text>
  //           )}

  //           {cuotasNumber > 1 && (
  //             <Text style={styles.text}>
  //               {cuotas} Cuotas de {moneda} {parseFloat(cuotaValor).toFixed(2)}
  //             </Text>
  //           )}
  //         </Text>
  //         <Text style={styles.text}>
  //           <Text style={styles.label}>IVA: </Text>
  //           {parseFloat(IVA).toFixed(2)}
  //         </Text>
  //         <Text style={styles.text}>
  //           <Text style={styles.label}>Precio Final: </Text>
  //           {moneda} {parseFloat(PrecioFinal).toFixed(2)}
  //         </Text>

  //         <Text style={styles.subHeader}>Cliente</Text>
  //         <Text style={styles.text}>
  //           <Text style={styles.label}>Nombre: </Text>
  //           {Cliente.nombre} {Cliente.apellido}
  //         </Text>
  //         <Text style={styles.text}>
  //           <Text style={styles.label}>Email: </Text>
  //           {Cliente.mail}
  //         </Text>

  //         <Text style={styles.subHeader}>Asesor Comercial </Text>

  //         <Text style={styles.text}>
  //           <Text style={styles.subHeader}>
  //             {Usuario.nombre} {Usuario.apellido}{" "}
  //           </Text>
  //         </Text>

  //         <Text style={styles.text}>
  //           <Text style={styles.label}>Teléfono: </Text>
  //           {Usuario.telefono}
  //         </Text>
  //         <Text style={styles.text}>
  //           <Text style={styles.label}>Email: </Text>
  //           {Usuario.email}
  //         </Text>
  //       </View>
  //       <View style={styles.contactContainer}>
  //         <Image src={Empresa} style={styles.empresaImage} />
  //         <View style={styles.contactTextContainer}>
  //           <Text style={styles.contactHeader}>Contacto</Text>
  //           <Text style={[styles.contactText, styles.boldText]}>Ventas</Text>
  //           <Text style={styles.contactText}>4748-5900</Text>
  //           <Text style={styles.contactText}>11 5924-9700</Text>
  //           <Text style={[styles.contactText, styles.boldText]}>
  //             Servicio Post Venta
  //           </Text>
  //           <Text style={styles.contactText}>4748-5900</Text>
  //           <Text style={styles.contactText}>11 3928-4834</Text>
  //           <Text style={styles.contactText}>servicios@americanvial.com</Text>
  //           <Text style={[styles.contactText, styles.boldText]}>Repuestos</Text>
  //           <Text style={styles.contactText}>4748-5900</Text>
  //           <Text style={styles.contactText}>11 5146-9600</Text>
  //           <Text style={styles.contactText}>repuestos@americanvial.com</Text>
  //         </View>
  //       </View>
  //     </Page>
  //   </Document>
  // );

  const numerosEnLetras = (num) => {
    const unidades = [
      "cero",
      "Una",
      "Dos",
      "Tres",
      "Cuatro",
      "Cinco",
      "Seis",
      "Siete",
      "Ocho",
      "Nueve",
    ];
    const decenas = [
      "",
      "",
      "veinte",
      "treinta",
      "cuarenta",
      "cincuenta",
      "sesenta",
      "setenta",
      "ochenta",
      "noventa",
    ];
    const excepciones = [
      "diez",
      "once",
      "doce",
      "trece",
      "catorce",
      "quince",
      "dieciséis",
      "diecisiete",
      "dieciocho",
      "diecinueve",
    ];

    const centenas = [
      "",
      "cien",
      "doscientos",
      "trescientos",
      "cuatrocientos",
      "quinientos",
      "seiscientos",
      "setecientos",
      "ochocientos",
      "novecientos",
    ];

    const miles = [
      "mil",
      "dos mil",
      "tres mil",
      "cuatro mil",
      "cinco mil",
      "seis mil",
      "siete mil",
      "ocho mil",
      "nueve mil",
    ];

    // Convertir unidades y decenas
    if (num < 10) return unidades[num];
    if (num < 20) return excepciones[num - 10];
    if (num < 100) {
      const decena = Math.floor(num / 10);
      const unidad = num % 10;
      return unidad === 0
        ? decenas[decena]
        : `${decenas[decena]} y ${unidades[unidad]}`;
    }

    // Convertir centenas
    if (num < 1000) {
      const centena = Math.floor(num / 100);
      const resto = num % 100;
      return resto === 0
        ? centenas[centena]
        : `${centenas[centena]} ${numerosEnLetras(resto)}`;
    }

    // Convertir miles
    if (num < 10000) {
      const mil = Math.floor(num / 1000);
      const resto = num % 1000;
      return resto === 0
        ? miles[mil - 1]
        : `${miles[mil - 1]} ${numerosEnLetras(resto)}`;
    }

    // Convertir números mayores a 10000
    const mil = Math.floor(num / 1000);
    const resto = num % 1000;
    return resto === 0
      ? `${numerosEnLetras(mil)} mil`
      : `${numerosEnLetras(mil)} mil ${numerosEnLetras(resto)}`;
  };

  return (
    <div className="cotizacionDetailSimilPdf">
      <BackButton />
      <div className="imagenesPDF">
        <img className="sino" src={SINOMACH} alt="" />
        <img className="american" src={americanvial} alt="" />
      </div>
      <h3>SINOMACH CONSTRUCTION MACHINERY GROUP I/E CO., LTD.</h3>
      <h5>Distribuidor en Argentina -</h5>
      <hr />
      Don Torcuato, {fechaFormateada}
      <div>
        <h5>Razon Social: {cliente.razonSocial}</h5>
        <h5>Cuit: {cliente.CUIT}</h5>
        <p>
          <strong>COTIZACION AVG:</strong>{" "}
          {codigoCotizacion ? codigoCotizacion : null}
        </p>
      </div>
      <div>De nuestra mayor consideración,</div>
      <div>
        <h5>
          SINOMACH, como el más importante fabricante de equipos para
          construcción de China y mediante nuestro representante en Argentina,
          nos dirigimos a ustedes para ofrecerles el suministro y cotización
          por:
        </h5>
      </div>
      {cotizacionesIndividuales.map((cotizacion, index) => (
        <div key={index} className="cotizacion-item">
          <div className="bordeSINOMACH">
            <p>
              {numerosEnLetras(cotizacion.cantidadProducto)} (
              {cotizacion.cantidadProducto}) {producto.familia} SINOMACH modelo{" "}
              {producto.modelo}
            </p>
          </div>
          <h3>
            Precio Unitario del equipo:………….…… {cotizacion.moneda}{" "}
            {cotizacion.precio} + IVA.- ({cotizacion.IVA}%)
          </h3>
          <p>
            Son dólares estadounidenses, {numerosEnLetras(cotizacion.precio)},
            más IVA.- Ejemplo hoy BNA $ 977 ( $ 180.012.250 + IVA 10.5% )
          </p>

          <div className="condicionesgenerales">
            <h4>Condiciones Generales de Venta</h4>
          </div>
          {/* <p>
            <strong>Anticipo:</strong> {cotizacion.moneda}{" "}
            {parseFloat(cotizacion.anticipo).toFixed(2)}
          </p>
          <p>
            <strong>Financiación: </strong>
            {cotizacion.cuotas} Cuotas de {cotizacion.moneda}{" "}
            {parseFloat(cotizacion.cuotaValor).toFixed(2)}
          </p>
          <p>
            <strong>IVA:</strong> {cotizacion.moneda}{" "}
            {parseFloat(cotizacion.IVA).toFixed(2)}
          </p>
          <p>
            <strong>Precio Final:</strong> {cotizacion.moneda}{" "}
            {parseFloat(cotizacion.PrecioFinal).toFixed(2)}
          </p> */}
        </div>
      ))}
      <div>
        <h3>Producto</h3>
        <p>
          <strong>Familia:</strong> {producto.familia}
        </p>
        <p>
          <strong>Marca:</strong> {producto.marca}
        </p>
        <p>
          <strong>Modelo:</strong> {producto.modelo}
        </p>
      </div>
      <div>
        <h3>Detalle Financiero</h3>
      </div>
      <div>
        <h3>Asesor Comercial</h3>
        <p>
          <strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}
        </p>
        <p>
          <strong>Teléfono:</strong> {usuario.telefono}
        </p>
        <p>
          <strong>Email:</strong> {usuario.email}
        </p>
      </div>
      {/* <PDFDownloadLink
        document={<MyDocument cotizacionDetalle={cotizacionDetalle} />}
        fileName={`cotizacion_${codigoCotizacion}.pdf`}
      >
        {({ loading }) => (
          <button className="form-submit">
            {loading ? (
              "Generando PDF..."
            ) : (
              <>
                <FaFilePdf /> Descargar PDF
              </>
            )}
          </button>
        )}
      </PDFDownloadLink> */}
    </div>
  );
}
