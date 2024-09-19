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

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Logos */}
        <View style={styles.imagenesPDF}>
          <Image style={styles.sino} src={SINOMACH} />
          <Image style={styles.american} src={americanvial} />
        </View>

        {/* Título y fecha */}
        <View style={styles.SINOMACH}>
          <Text style={styles.SINOMACHtitle}>
            SINOMACH CONSTRUCTION MACHINERY GROUP I/E CO., LTD.
          </Text>
          <Text style={styles.distribuidor}>Distribuidor en Argentina -</Text>
          <Text style={styles.hr} />
          <Text style={styles.fechaformateada}>
            Don Torcuato, {fechaFormateada}
          </Text>
        </View>

        {/* Información del cliente */}
        <View style={styles.razonSOCIAL}>
          <Text style={styles.datosCliente}>
            Razon Social: {cliente.razonSocial}
          </Text>
          <Text style={styles.datosCliente}>Cuit: {cliente.CUIT}</Text>
        </View>

        {/* Cotización AVG */}
        <View>
          <Text style={styles.avg}>
            COTIZACION AVG: {codigoCotizacion ? codigoCotizacion : null}
          </Text>
        </View>

        {/* Texto principal */}
        <Text style={styles.consideracion}>
          De nuestra mayor consideración,
        </Text>
        <View style={styles.LEYENDASINOMACH}>
          <Text style={styles.consideracion}>
            <Text style={styles.sinomachh}>SINOMACH,</Text> como el más
            importante fabricante de equipos para construcción de China y
            mediante nuestro representante en Argentina, nos dirigimos a ustedes
            para ofrecerles el suministro y cotización por:
          </Text>
        </View>

        {/* Detalles de la cotización */}
        {cotizacionesIndividuales.map((cotizacion, index) => (
          <View key={index}>
            <Text style={styles.opcion}>Opción {index + 1}:</Text>
            <View style={styles.cotizacionItem}>
              <Text>
                {numerosEnLetras(cotizacion.cantidadProducto)} (
                {cotizacion.cantidadProducto}) {producto.familia}
                <Text style={styles.cursiva}> SINOMACH </Text>
                modelo {producto.modelo}
              </Text>
            </View>
            <Text style={styles.precioUnitario}>
              Precio Unitario del equipo:………….…… U$D {""} {cotizacion.precio} +
              IVA ({cotizacion.IVA}%)
            </Text>
            <Text style={styles.dolares}>
              (Son dólares estadounidenses, Ciento ochenta y cuatro mil
              doscientos cincuenta más IVA.-) Ejemplo hoy BNA $ 977 ( $
              180.012.250 + IVA 10.5% )
            </Text>
            <Text style={styles.hr} />
            <View style={styles.cotizacion}>
              <Text style={styles.cotizacionText}>
                Anticipo: {cotizacion.moneda} {cotizacion.anticipo}
              </Text>
              <Text style={styles.cotizacionText}>
                Financiación: {cotizacion.cuotas} Pagos de {cotizacion.moneda}{" "}
                {cotizacion.cuotaValor}
              </Text>
              <Text style={styles.cotizacionText}>
                Precio Final: {cotizacion.moneda} {cotizacion.PrecioFinal}
              </Text>
            </View>
          </View>
        ))}

        {/* Condiciones generales de venta */}
        {/* <View style={styles.condicionesgenerales}>
          <Text>Condiciones Generales de Venta</Text>
          <Text>Plazo de Entrega: {plazoEntrega}</Text>
          <Text>Forma de Pago: {formaPago}</Text>
          <Text>Mantenimiento de Oferta: {mantenimientoOferta}</Text>
          <Text>Lugar de Entrega: {lugarEntrega}</Text>
          <Text>Garantía: {garantia}</Text>
          <Text>Entrega Técnica: {entregaTecnica}</Text>
          <Text>Origen de Fabricación: {origenFabricacion}</Text>
          <Text>Patentamiento: {patentamiento}</Text>
        </View> */}

        {/* Características técnicas generales */}
        <View>
          <Text style={styles.caracgenerales}>
            Características Técnicas Generales:
          </Text>
          <Text style={styles.especificacionesPrincipales}>
            Especificaciones Principales:
          </Text>
          <View style={styles.especificaciones}>
            {producto.caracteristicasGenerales
              .split("\n")
              .map((caracteristica, index) => (
                <Text key={index}>{caracteristica}</Text>
              ))}
          </View>
          <Text style={styles.caracgenerales}>
            Motores de Traslación y Zapatas:
          </Text>
          <View style={styles.especificaciones}>
            {producto.motoresdeTraslacionyZapatas
              .split("\n")
              .map((motor, index) => (
                <Text key={index}>{motor}</Text>
              ))}
          </View>
          <Text style={styles.caracgenerales}>Sistema Hidráulico:</Text>
          <View style={styles.especificaciones}>
            {producto.sistemaHidraulico.split("\n").map((sistema, index) => (
              <Text key={index}>{sistema}</Text>
            ))}
          </View>
          <Text style={styles.caracgenerales}>Motor:</Text>
          <View style={styles.especificaciones}>
            {producto.motor.split("\n").map((motor, index) => (
              <Text key={index}>{motor}</Text>
            ))}
          </View>
          <Text style={styles.caracgenerales}>Capacidades:</Text>
          <View style={styles.especificaciones}>
            {producto.capacidades.split("\n").map((capacidad, index) => (
              <Text key={index}>{capacidad}</Text>
            ))}
          </View>
          <Text style={styles.caracgenerales}>Cabina:</Text>
          <View style={styles.especificaciones}>
            {producto.Cabina.split("\n").map((cabina, index) => (
              <Text key={index}>{cabina}</Text>
            ))}
          </View>
          <Text style={styles.caracgenerales}>Dimensiones Generales:</Text>
          <View style={styles.especificaciones}>
            {producto.dimensionesGenerales
              .split("\n")
              .map((dimension, index) => (
                <Text key={index}>{dimension}</Text>
              ))}
          </View>
        </View>

        {/* Imagen del producto */}
        <Image src={producto.imagen} />

        {/* Asesor comercial */}
        <View>
          <Text>Asesor Comercial</Text>
          <Text>
            Nombre: {usuario.nombre} {usuario.apellido}
          </Text>
          <Text>Email: {usuario.email}</Text>
        </View>

        {/* Pie de página */}
        <View style={styles.footerDetail}>
          <Text>
            Panamericana Km 28.250 Paris 256 esq. Colectora Este 1611 - Don
            Torcuato - Bs. As. Argentina
          </Text>
          <Text>Tel./Fax: (5411) 4748-5900 www.americanvial.com</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="cotizacionDetailSimilPdf">
      <BackButton />
      <div className="imagenesPDF">
        <img className="sino" src={SINOMACH} alt="" />
        <img className="american" src={americanvial} alt="" />
      </div>
      <div className="SINOMACH">
        <h3>SINOMACH CONSTRUCTION MACHINERY GROUP I/E CO., LTD.</h3>
        <span className="distribuidor">Distribuidor en Argentina -</span>
        <hr className="hrdontorcuato" />
        <span className="dontorcuato">Don Torcuato, {fechaFormateada}</span>
      </div>
      <div className="razonSOCIAL">
        <h5>Razon Social: {cliente.razonSocial}</h5>
        <h5>Cuit: {cliente.CUIT}</h5>
      </div>
      <div className="AVG">
        <div></div>
        <p>COTIZACION AVG: {codigoCotizacion ? codigoCotizacion : null}</p>
      </div>
      <span className="consideracion">De nuestra mayor consideración,</span>
      <div className="LEYENDASINOMACH">
        <span className="consideracion">
          <strong>SINOMACH, </strong>como el más importante fabricante de
          equipos para construcción de China y mediante nuestro representante en
          Argentina, nos dirigimos a ustedes para ofrecerles el suministro y
          cotización por:
        </span>
      </div>
      {cotizacionesIndividuales.map((cotizacion, index) => (
        <div key={index} className="cotizacion-item">
          <br />
          <span style={{ textDecoration: "underline" }}>
            <strong>Opción {index + 1}:</strong>
          </span>
          <div className="bordeSINOMACH">
            <p>
              {numerosEnLetras(cotizacion.cantidadProducto)} (
              {cotizacion.cantidadProducto}) {producto.familia}{" "}
              <strong>
                <em>SINOMACH</em>
              </strong>{" "}
              modelo {producto.modelo}
            </p>
          </div>
          <h5 className="precioUnitario">
            Precio Unitario del equipo:………….…… U$D {""}
            {cotizacion.precio} + IVA.- ({cotizacion.IVA}%)
          </h5>
          <p>
            Son dólares estadounidenses, {numerosEnLetras(cotizacion.precio)},
            más IVA.- Ejemplo hoy BNA $ 977 ( $ 180.012.250 + IVA 10.5% )
          </p>
          <hr className="masIva" />
          <div className="condicionesgenerales">
            <h4>Condiciones Generales de Venta</h4>
            <br />
            <div className="caractcoti">
              <ul>
                <li>
                  {" "}
                  <strong>Plazo de Entrega:</strong> {plazoEntrega}
                </li>
                <li>
                  <strong>Forma de Pago:</strong> {formaPago}
                </li>
                <li>
                  <strong>Manteniemiento de Oferta: </strong>
                  {mantenimientoOferta}
                </li>
                <li>
                  <strong>Lugar de Entrega: </strong>
                  {lugarEntrega}
                </li>
                <li>
                  <strong> Garantía: </strong>
                  {garantia}
                </li>
                <li>
                  <strong>Entrega Técnica:</strong> {entregaTecnica}
                </li>
                <li>
                  <strong>Origen de Fabricación:</strong> {origenFabricacion}
                </li>
                <li>
                  <strong>Patentamiento:</strong> {patentamiento}
                </li>
              </ul>
            </div>
          </div>

          <div className="caractcotizar">
            {cotizacion.anticipo > 0 && (
              <p>
                <strong>Anticipo:</strong> {cotizacion.moneda}{" "}
                {parseFloat(cotizacion.anticipo).toFixed(2)}
              </p>
            )}

            {cotizacion.cuotas && cotizacion.cuotaValor && (
              <p>
                <strong>Financiación:</strong> {cotizacion.cuotas} Pagos de{" "}
                {cotizacion.moneda}{" "}
                {parseFloat(cotizacion.cuotaValor).toFixed(2)}
              </p>
            )}

            <p>
              <strong>IVA:</strong> {parseFloat(cotizacion.IVA).toFixed(2)}%
            </p>
            <p>
              <strong>Precio Final:</strong> {cotizacion.moneda}{" "}
              {parseFloat(cotizacion.PrecioFinal).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
      <div>
        <div className="caracgenerales">
          <h5 style={{ fontWeight: "bold" }}>
            Características Técnicas Generales:
          </h5>
        </div>
        <div>
          <h5 style={{ textDecoration: "underline", marginLeft: "10rem" }}>
            Especificaciones Principales:
          </h5>
          <div className="especificaciones">
            <ul>
              {producto.caracteristicasGenerales
                .split("\n")
                .map((caracteristica, index) => (
                  <li key={index}>{caracteristica}</li>
                ))}
            </ul>
          </div>
          <h5 style={{ textDecoration: "underline", marginLeft: "10rem" }}>
            Motores de Traslación y Zapatas:
          </h5>
          <div className="especificaciones">
            <ul>
              {producto.motoresdeTraslacionyZapatas
                .split("\n")
                .map((motor, index) => (
                  <li key={index}>{motor}</li>
                ))}
            </ul>
          </div>
          <h5 style={{ textDecoration: "underline", marginLeft: "10rem" }}>
            Sistema Hidráulico:
          </h5>
          <div className="especificaciones">
            <ul>
              {producto.sistemaHidraulico.split("\n").map((sistema, index) => (
                <li key={index}>{sistema}</li>
              ))}
            </ul>
          </div>
          <h5 style={{ textDecoration: "underline", marginLeft: "10rem" }}>
            Motor:
          </h5>
          <div className="especificaciones">
            <ul>
              {producto.motor.split("\n").map((motor, index) => (
                <li key={index}>{motor}</li>
              ))}
            </ul>
          </div>
          <h5 style={{ textDecoration: "underline", marginLeft: "10rem" }}>
            Capacidades:
          </h5>
          <div className="especificaciones">
            <ul>
              {producto.capacidades.split("\n").map((capacidad, index) => (
                <li key={index}>{capacidad}</li>
              ))}
            </ul>
          </div>
          <h5 style={{ textDecoration: "underline", marginLeft: "10rem" }}>
            Cabina:
          </h5>
          <div className="especificaciones">
            <ul>
              {producto.Cabina.split("\n").map((cabina, index) => (
                <li key={index}>{cabina}</li>
              ))}
            </ul>
          </div>
          <h5 style={{ textDecoration: "underline", marginLeft: "10rem" }}>
            Dimensiones Generales:
          </h5>
          <div className="especificaciones">
            <ul>
              {producto.dimensionesGenerales
                .split("\n")
                .map((dimension, index) => (
                  <li key={index}>{dimension}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="parrafoSINOMACH">
        <p>
          En los últimos diez años <strong>SINOMACH</strong> ha desarrollado un
          programa de fabricación en cooperación con compañías de prestigio
          mundial como Caterpillar (USA), Krupp (Alemania), Liebherr (Alemania),
          etc., obteniendo como resultado una transferencia y aporte de
          tecnología y calidad aplicada para el diseño, fabricación y servicio
          de todos los equipos.
        </p>
      </div>
      <div className="imagenDetail">
        {" "}
        <img src={producto.imagen} alt="" />
      </div>

      {/* <div className="asesorComercial">
        <h4 style={{ textDecoration: "underline" }}>Asesor Comercial</h4>
        <p>
          <strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}
        </p>

        <p>
          <strong>Email:</strong> {usuario.email}
        </p>
      </div> */}
      <div className="deptoComercial">
        <span>Dto. Comercial.</span> <span> Lucas Pedro Pulice </span>{" "}
        <span>1123404859</span>
      </div>
      <div className="footerDetail">
        <hr />
        <span>
          {" "}
          Panamericana Km 28.250 Paris 256 esq. Colectora Este 1611 - Don
          Torcuato - Bs. As. Argentina.{" "}
        </span>{" "}
        <span>Tel./Fax : (5411) 4748-5900 </span>{" "}
        <span>www.americanvial.com</span>
      </div>
      <div className="buttonpdf">
        <PDFDownloadLink
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
        </PDFDownloadLink>
      </div>
    </div>
  );
}
