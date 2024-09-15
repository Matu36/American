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
        <View style={styles.logoContainer}>
          <Image src={SINOMACH} />
          <Image src={americanvial} />
        </View>

        {/* Título y fecha */}
        <Text style={styles.subHeader}>
          SINOMACH CONSTRUCTION MACHINERY GROUP I/E CO., LTD.
        </Text>
        <Text>Distribuidor en Argentina -</Text>
        <Text>{fechaFormateada}</Text>
        <Text style={styles.hr} />

        {/* Información del cliente */}
        <View>
          <Text>Razon Social: {cliente.razonSocial}</Text>
          <Text>Cuit: {cliente.CUIT}</Text>
          <Text>COTIZACION AVG: {cotizacionDetalle.codigoCotizacion}</Text>
        </View>

        {/* Texto principal */}
        <View>
          <Text>De nuestra mayor consideración,</Text>
          <Text>
            SINOMACH, como el más importante fabricante de equipos para
            construcción de China y mediante nuestro representante en Argentina,
            nos dirigimos a ustedes para ofrecerles el suministro y cotización
            por:
          </Text>
        </View>

        {/* Detalles de la cotización */}
        {cotizacionesIndividuales.map((cotizacion, index) => (
          <View key={index} style={styles.cotizacionItem}>
            <Text>
              {cotizacion.cantidadProducto} {producto.familia} SINOMACH modelo{" "}
              {producto.modelo}
            </Text>
            <Text>
              Precio Unitario del equipo: {cotizacion.moneda}{" "}
              {cotizacion.precio} + IVA ({cotizacion.IVA}%)
            </Text>
            {cotizacion.anticipo && (
              <Text>
                Anticipo: {cotizacion.moneda} {cotizacion.anticipo}
              </Text>
            )}

            {cotizacion.cuotas && cotizacion.cuotaValor && (
              <Text>
                Financiación: {cotizacion.cuotas} Pagos de {cotizacion.moneda}{" "}
                {cotizacion.cuotaValor}
              </Text>
            )}

            <Text>
              Precio Final: {cotizacion.moneda} {cotizacion.PrecioFinal}
            </Text>
          </View>
        ))}

        {/* Condiciones generales de venta */}
        <View style={styles.condicionesgenerales}>
          <Text>Condiciones Generales de Venta</Text>
          <Text>Plazo de Entrega: {plazoEntrega}</Text>
          <Text>Forma de Pago: {formaPago}</Text>
          <Text>Mantenimiento de Oferta: {mantenimientoOferta}</Text>
          <Text>Lugar de Entrega: {lugarEntrega}</Text>
          <Text>Garantía: {garantia}</Text>
          <Text>Entrega Técnica: {entregaTecnica}</Text>
          <Text>Origen de Fabricación: {origenFabricacion}</Text>
          <Text>Patentamiento: {patentamiento}</Text>
        </View>

        {cotizacionesIndividuales.map((cotizacion, index) => (
          <View key={index}>
            <Text>
              <strong>Anticipo:</strong> {cotizacion.moneda}{" "}
              {parseFloat(cotizacion.anticipo).toFixed(2)}
            </Text>
            <Text>
              <strong>Financiación:</strong> {cotizacion.cuotas} Pagos de{" "}
              {cotizacion.moneda} {parseFloat(cotizacion.cuotaValor).toFixed(2)}
            </Text>
            <Text>
              <strong>IVA:</strong> {parseFloat(cotizacion.IVA).toFixed(2)}%
            </Text>
            <Text>
              <strong>Precio Final:</strong> {cotizacion.moneda}{" "}
              {parseFloat(cotizacion.PrecioFinal).toFixed(2)}
            </Text>
          </View>
        ))}

        <View>
          <Text>Características Técnicas Generales:</Text>

          <View>
            <Text>Especificaciones Principales:</Text>
            <View>
              {producto.caracteristicasGenerales
                .split("\n")
                .map((caracteristica, index) => (
                  <Text key={index}>{caracteristica}</Text>
                ))}
            </View>

            <Text>Motores de Traslación y Zapatas:</Text>
            <View>
              {producto.motoresdeTraslacionyZapatas
                .split("\n")
                .map((motor, index) => (
                  <Text key={index}>{motor}</Text>
                ))}
            </View>

            <Text>Sistema Hidráulico:</Text>
            <View>
              {producto.sistemaHidraulico.split("\n").map((sistema, index) => (
                <Text key={index}>{sistema}</Text>
              ))}
            </View>

            <Text>Motor:</Text>
            <View>
              {producto.motor.split("\n").map((motor, index) => (
                <Text key={index}>{motor}</Text>
              ))}
            </View>

            <Text>Capacidades:</Text>
            <View>
              {producto.capacidades.split("\n").map((capacidad, index) => (
                <Text key={index}>{capacidad}</Text>
              ))}
            </View>

            <Text>Cabina:</Text>
            <View>
              {producto.Cabina.split("\n").map((cabina, index) => (
                <Text key={index}>{cabina}</Text>
              ))}
            </View>

            <Text>Dimensiones Generales:</Text>
            <View>
              {producto.dimensionesGenerales
                .split("\n")
                .map((dimension, index) => (
                  <Text key={index}>{dimension}</Text>
                ))}
            </View>
          </View>
        </View>

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
            <ul>
              <li>Plazo de Entrega: {plazoEntrega}</li>
              <li>Forma de Pago: {formaPago}</li>
              <li>Manteniemiento de Oferta: {mantenimientoOferta}</li>
              <li>Lugar de Entrega: {lugarEntrega}</li>
              <li> Garantía: {garantia}</li>
              <li>Entrega Técnica: {entregaTecnica}</li>
              <li>Origen de Fabricación: {origenFabricacion}</li>
              <li>Patentamiento: {patentamiento}</li>
            </ul>
          </div>
          {cotizacion.anticipo && (
            <p>
              <strong>Anticipo:</strong> {cotizacion.moneda}{" "}
              {parseFloat(cotizacion.anticipo).toFixed(2)}
            </p>
          )}

          {cotizacion.cuotas && cotizacion.cuotaValor && (
            <p>
              <strong>Financiación:</strong> {cotizacion.cuotas} Pagos de{" "}
              {cotizacion.moneda} {parseFloat(cotizacion.cuotaValor).toFixed(2)}
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
      ))}
      <div>
        <h3>Características Técnicas Generales:</h3>

        <div>
          <h4>Especificaciones Principales:</h4>
          <ul>
            {producto.caracteristicasGenerales
              .split("\n")
              .map((caracteristica, index) => (
                <li key={index}>{caracteristica}</li>
              ))}
          </ul>

          <h4>Motores de Traslación y Zapatas:</h4>
          <ul>
            {producto.motoresdeTraslacionyZapatas
              .split("\n")
              .map((motor, index) => (
                <li key={index}>{motor}</li>
              ))}
          </ul>

          <h4>Sistema Hidráulico:</h4>
          <ul>
            {producto.sistemaHidraulico.split("\n").map((sistema, index) => (
              <li key={index}>{sistema}</li>
            ))}
          </ul>

          <h4>Motor:</h4>
          <ul>
            {producto.motor.split("\n").map((motor, index) => (
              <li key={index}>{motor}</li>
            ))}
          </ul>

          <h4>Capacidades:</h4>
          <ul>
            {producto.capacidades.split("\n").map((capacidad, index) => (
              <li key={index}>{capacidad}</li>
            ))}
          </ul>

          <h4>Cabina:</h4>
          <ul>
            {producto.Cabina.split("\n").map((cabina, index) => (
              <li key={index}>{cabina}</li>
            ))}
          </ul>

          <h4>Dimensiones Generales:</h4>
          <ul>
            {producto.dimensionesGenerales
              .split("\n")
              .map((dimension, index) => (
                <li key={index}>{dimension}</li>
              ))}
          </ul>
        </div>
      </div>
      <div className="parrafoSINOMACH">
        <p>
          En los últimos diez años SINOMACH ha desarrollado un programa de
          fabricación en cooperación con compañías de prestigio mundial como
          Caterpillar (USA), Krupp (Alemania), Liebherr (Alemania), etc.,
          obteniendo como resultado una transferencia y aporte de tecnología y
          calidad aplicada para el diseño, fabricación y servicio de todos los
          equipos.
        </p>
      </div>
      <div>
        {" "}
        <img src={producto.imagen} alt="" />
      </div>
      <div>
        <h3>Asesor Comercial</h3>
        <p>
          <strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}
        </p>

        <p>
          <strong>Email:</strong> {usuario.email}
        </p>
      </div>
      Dto. Comercial. Lucas Pedro Pulice 1123404859
      <div className="footerDetail">
        <hr />
        Panamericana Km 28.250 Paris 256 esq. Colectora Este 1611 - Don Torcuato
        - Bs. As. Argentina. Tel./Fax : (5411) 4748-5900 www.americanvial.com
      </div>
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
  );
}
