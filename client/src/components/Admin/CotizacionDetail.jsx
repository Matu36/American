import React, { useState } from "react";
import { useCotizaciones } from "../../hooks/useCotizaciones";
import { useCotizacionIndividual } from "../../hooks/useCotizacionIndividual";
import { useParams } from "react-router-dom";
import { FaFilePdf, FaEnvelope, FaCog } from "react-icons/fa";
import Spinner from "../../UI/Spinner";
import americanvial from "../../assets/img/PDF/AMERICAN.png";
import SINOMACH from "../../assets/img/PDF/SINOMACH.png";
import useAuth from "../../hooks/useAuth";
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  Image,
  pdf,
} from "@react-pdf/renderer";
import { styles } from "../../assets/Styles/PDFestilosDetalle";
import BackButton from "../../UI/BackButton";

const Clouddinary = import.meta.env.VITE_CLOUDINARY_URL;

export default function CotizacionDetail() {
  const { id } = useParams();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isPdfGenerated, setIsPdfGenerated] = useState(false);
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: envioDeCotiPorEmail } =
    useCotizaciones().cotizacionPorEmailMutation;

  const { mutate: UpdatePdfCoti } = useCotizaciones().cotizacionEditPDFMutation;

  const { mutate: estado3 } =
    useCotizacionIndividual().cotizacionMutationState3;

  const {
    data: cotizacionDetalle,
    isLoading,
    refetch: detalle,
  } = useCotizaciones(null, id).cotizacionDetalleQuery;

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
    CotizacionPDF,
  } = cotizacionDetalle;

  const handleSubmitPorEmail = (e) => {
    e.preventDefault();

    const emailEmisor = auth.email;
    const emailReceptor = cotizacionDetalle.cliente.email;

    const requestBody = {
      emailEmisor,
      emailReceptor,
      idCotizacion: id,
      password,
    };
    envioDeCotiPorEmail(requestBody);
    console.log(requestBody);
  };

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

  const generateAndUploadPDF = async () => {
    setLoading(true);
    try {
      const doc = <MyDocument />;
      const asPdf = pdf(doc);
      const blob = await asPdf.toBlob();

      // Prepare form data to upload to Cloudinary
      const data = new FormData();
      data.append("file", blob);
      data.append("upload_preset", "Images");

      // Upload the PDF Blob to Cloudinary
      const res = await fetch(Clouddinary, {
        method: "POST",
        body: data,
      });

      const pdfData = await res.json();
      setLoading(false);
      setIsPdfGenerated(true);

      const pdfUpdateData = {
        id: cotizacionDetalle.idCotizacion,
        CotizacionPDF: pdfData.secure_url,
      };

      UpdatePdfCoti(pdfUpdateData);
    } catch (error) {
      console.error("Error uploading PDF:", error);
      setLoading(false);
    }
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
              <Text key={index} style={styles.listItem}>
                • {caracteristica}
              </Text>
            ))}
        </View>
        <View style={styles.footerDetail}>
          <Text style={styles.hr} />
          <Text>
            Panamericana Km 28.250 Paris 256 esq. Colectora Este 1611 - Don
            Torcuato - Bs. As. Argentina
          </Text>
          <Text>Tel./Fax: (5411) 4748-5900 </Text>{" "}
          <Text>www.americanvial.com</Text>
        </View>
      </Page>
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
        </View>
        <Text style={styles.especificacionesPrincipales}>
          Motores de Traslación y Zapatas:
        </Text>
        <View style={styles.especificaciones}>
          {producto.motoresdeTraslacionyZapatas
            .split("\n")
            .map((motor, index) => (
              <Text key={index} style={styles.listItem}>
                • {motor}
              </Text>
            ))}
        </View>
        <Text style={styles.especificacionesPrincipales}>
          Sistema Hidráulico:
        </Text>
        <View style={styles.especificaciones}>
          {producto.sistemaHidraulico.split("\n").map((sistema, index) => (
            <Text key={index} style={styles.listItem}>
              • {sistema}
            </Text>
          ))}
        </View>
        <Text style={styles.especificacionesPrincipales}>Motor:</Text>
        <View style={styles.especificaciones}>
          {producto.motor.split("\n").map((motor, index) => (
            <Text key={index} style={styles.listItem}>
              • {motor}
            </Text>
          ))}
        </View>
        <Text style={styles.especificacionesPrincipales}>Capacidades:</Text>
        <View style={styles.especificaciones}>
          {producto.capacidades.split("\n").map((capacidad, index) => (
            <Text key={index} style={styles.listItem}>
              • {capacidad}
            </Text>
          ))}
        </View>
        <Text style={styles.especificacionesPrincipales}>Cabina:</Text>
        <View style={styles.especificaciones}>
          {producto.Cabina.split("\n").map((cabina, index) => (
            <Text key={index} style={styles.listItem}>
              • {cabina}
            </Text>
          ))}
        </View>
        <View style={styles.footerDetail}>
          <Text style={styles.hr} />
          <Text>
            Panamericana Km 28.250 Paris 256 esq. Colectora Este 1611 - Don
            Torcuato - Bs. As. Argentina
          </Text>
          <Text>Tel./Fax: (5411) 4748-5900 </Text>{" "}
          <Text>www.americanvial.com</Text>
        </View>
      </Page>
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
        </View>

        <Text style={styles.especificacionesPrincipales}>
          Dimensiones Generales:
        </Text>
        <View style={styles.especificaciones}>
          {producto.dimensionesGenerales.split("\n").map((dimension, index) => (
            <Text key={index} style={styles.listItem}>
              • {dimension}
            </Text>
          ))}
        </View>

        <Text style={styles.consideracion}>
          En los últimos diez años SINOMACH ha desarrollado un programa de
          fabricación en cooperación con compañías de prestigio mundial como
          Caterpillar (USA), Krupp (Alemania), Liebherr (Alemania), etc.,
          obteniendo como resultado una transferencia y aporte de tecnología y
          calidad aplicada para el diseño, fabricación y servicio de todos los
          equipos.
        </Text>

        {/* Imagen del producto */}
        {/* <Image src={producto?.imagen} /> */}

        {/* Asesor comercial */}
        {/* <View>
          <Text>Asesor Comercial</Text>
          <Text>
            Nombre: {usuario.nombre} {usuario.apellido}
          </Text>
          <Text>Email: {usuario.email}</Text>
        </View> */}

        {/* Pie de página */}

        <View style={styles.footerDetail}>
          <Text style={styles.hr} />
          <Text>
            Panamericana Km 28.250 Paris 256 esq. Colectora Este 1611 - Don
            Torcuato - Bs. As. Argentina
          </Text>
          <Text>Tel./Fax: (5411) 4748-5900 </Text>{" "}
          <Text>www.americanvial.com</Text>
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

          {/* Condiciones Generales de Venta */}
          <div className="condicionesgenerales">
            <h4>Condiciones Generales de Venta</h4>
            <br />
            <div className="caractcoti">
              <ul>
                <li>
                  <strong>Plazo de Entrega:</strong> {plazoEntrega}
                </li>
                <li>
                  <strong>Forma de Pago:</strong> {formaPago}
                </li>
                <li>
                  <strong>Mantenimiento de Oferta:</strong>{" "}
                  {mantenimientoOferta}
                </li>
                <li>
                  <strong>Lugar de Entrega:</strong> {lugarEntrega}
                </li>
                <li>
                  <strong>Garantía:</strong> {garantia}
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

          {/* Detalles Financieros */}
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
          <div className="concrectarVenta">
            <button
              onClick={() => estado3({ id: cotizacion.id })}
              className="btn-concretar-venta"
              disabled={cotizacion.estado === 3 || cotizacion.estado === 2}
            >
              {cotizacion.estado === 3
                ? "Pendiente de Aprobación"
                : cotizacion.estado === 2
                ? "Venta Concretada"
                : "Concretar Venta"}
            </button>
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
        <div>
          <button
            className="form-submit"
            onClick={generateAndUploadPDF}
            disabled={loading}
          >
            <FaCog /> {loading ? "Generando PDF..." : "Generar PDF"}
          </button>
        </div>
        <div>
          <PDFDownloadLink
            document={<MyDocument cotizacionDetalle={cotizacionDetalle} />}
            fileName={`cotizacion_${codigoCotizacion}.pdf`}
          >
            {({ loading }) => (
              <button
                className="form-submit"
                disabled={!isPdfGenerated}
                style={{
                  backgroundColor: !isPdfGenerated ? "#ccc" : "#ffcc00",
                  color: !isPdfGenerated ? "#666" : "#000",
                  cursor: !isPdfGenerated ? "not-allowed" : "pointer",
                  opacity: !isPdfGenerated ? 0.6 : 1,
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.3s",
                }}
              >
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

        <div>
          <button
            className="form-submit"
            disabled={!isPdfGenerated}
            onClick={() => setIsModalOpen(true)}
            style={{
              backgroundColor: !isPdfGenerated ? "#ccc" : "#ffcc00",
              color: !isPdfGenerated ? "#666" : "#000",
              cursor: !isPdfGenerated ? "not-allowed" : "pointer",
              opacity: !isPdfGenerated ? 0.6 : 1,
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.3s",
            }}
          >
            <FaEnvelope /> Enviar Email
          </button>
        </div>

        <div>
          {isModalOpen && (
            <div
              className="modal-overlay"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                zIndex: 999,
              }}
            >
              <div
                className="modal-content"
                style={{
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "10px",
                  width: "100%",
                  maxWidth: "400px",
                  textAlign: "center",
                }}
              >
                <h2
                  style={{
                    color: "#ffc107",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "24px",
                  }}
                >
                  Ingresá tu contraseña
                </h2>
                <br />
                <form onSubmit={handleSubmitPorEmail}>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      margin: "10px 0",
                      fontSize: "16px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      textAlign: "center",
                    }}
                  />
                  <div
                    className="modal-buttons"
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      marginTop: "20px",
                    }}
                  >
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#ffcc00",
                        color: "#000",
                        padding: "10px 20px",
                        fontSize: "16px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#e6b800")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#ffcc00")
                      }
                    >
                      Enviar
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      style={{
                        backgroundColor: "#ffcc00",
                        color: "#000",
                        padding: "10px 20px",
                        fontSize: "16px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#e6b800")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#ffcc00")
                      }
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
