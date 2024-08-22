import React from "react";
import { useCotizaciones } from "../../hooks/useCotizaciones";
import { useParams } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";
import Logo from "../../assets/img/LOGOAMERICANPRINCIPAL.png";
import Empresa from "../../assets/img/EmpresaPDF.jpg";
import Spinner from "../../UI/Spinner";

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

  const {
    numeroCotizacion,
    precio,
    anticipo,
    codigoCotizacion,
    IVA,
    moneda,
    cuotas,
    cuotaValor,
    PrecioFinal,
    fechaDeCreacion,
    Usuario,
    Cliente,
    Producto,
  } = cotizacionDetalle;

  const cuotasNumber = Number(cuotas);

  const MyDocument = ({ cotizacionDetalle }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.logoContainer}>
          <Image src={Logo} style={styles.logo} />
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Cotización {codigoCotizacion}</Text>
          <Text style={styles.subHeader}>Información de Cotización</Text>

          <Text style={styles.text}>
            <Text style={styles.label}>Fecha de Cotización: </Text>
            {new Date(fechaDeCreacion).toLocaleString()}
          </Text>
          <Text style={styles.subHeader}>Producto</Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Categoría: </Text>
            {Producto.familia}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Marca: </Text>
            {Producto.marca}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Modelo: </Text>
            {Producto.modelo}
          </Text>
          <Text style={styles.subHeader}>Detalle de la Cotización</Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Precio de Venta: </Text>
            {moneda} {parseFloat(precio).toFixed(2)}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Anticipo: </Text>
            {moneda} {parseFloat(anticipo).toFixed(2)}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Financiación: </Text>
            {(cuotasNumber === 1 || cuotasNumber === 0) && (
              <Text style={styles.text}>
                {moneda} {parseFloat(PrecioFinal).toFixed(2)}
              </Text>
            )}

            {cuotasNumber > 1 && (
              <Text style={styles.text}>
                {cuotas} Cuotas de {moneda} {parseFloat(cuotaValor).toFixed(2)}
              </Text>
            )}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>IVA: </Text>
            {parseFloat(IVA).toFixed(2)}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Precio Final: </Text>
            {moneda} {parseFloat(PrecioFinal).toFixed(2)}
          </Text>

          <Text style={styles.subHeader}>Cliente</Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Nombre: </Text>
            {Cliente.nombre} {Cliente.apellido}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Email: </Text>
            {Cliente.mail}
          </Text>

          <Text style={styles.subHeader}>Asesor Comercial </Text>

          <Text style={styles.text}>
            <Text style={styles.subHeader}>
              {Usuario.nombre} {Usuario.apellido}{" "}
            </Text>
          </Text>

          <Text style={styles.text}>
            <Text style={styles.label}>Teléfono: </Text>
            {Usuario.telefono}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Email: </Text>
            {Usuario.email}
          </Text>
        </View>
        <View style={styles.contactContainer}>
          <Image src={Empresa} style={styles.empresaImage} />
          <View style={styles.contactTextContainer}>
            <Text style={styles.contactHeader}>Contacto</Text>
            <Text style={[styles.contactText, styles.boldText]}>Ventas</Text>
            <Text style={styles.contactText}>4748-5900</Text>
            <Text style={styles.contactText}>11 5924-9700</Text>
            <Text style={[styles.contactText, styles.boldText]}>
              Servicio Post Venta
            </Text>
            <Text style={styles.contactText}>4748-5900</Text>
            <Text style={styles.contactText}>11 3928-4834</Text>
            <Text style={styles.contactText}>servicios@americanvial.com</Text>
            <Text style={[styles.contactText, styles.boldText]}>Repuestos</Text>
            <Text style={styles.contactText}>4748-5900</Text>
            <Text style={styles.contactText}>11 5146-9600</Text>
            <Text style={styles.contactText}>repuestos@americanvial.com</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="form-container1">
      <BackButton />
      <h2>Detalle Cotización</h2>
      <br />

      <div>
        <p>
          <strong>Número de Cotización:</strong>{" "}
          {codigoCotizacion ? codigoCotizacion : null}
        </p>
        <p>
          <strong>Fecha de la Cotización:</strong>{" "}
          {new Date(fechaDeCreacion).toLocaleString()}
        </p>
      </div>
      <div>
        <h3>Producto</h3>
        <p>
          <strong>Categoría:</strong> {Producto.familia}
        </p>
        <p>
          <strong>Marca:</strong> {Producto.marca}
        </p>
        <p>
          <strong>Modelo:</strong> {Producto.modelo}
        </p>
      </div>

      <div>
        <h3>Detalle Financiero</h3>
        <p>
          <strong>Precio de Venta:</strong> {moneda}{" "}
          {parseFloat(precio).toFixed(2)}
        </p>
        <p>
          <strong>Anticipo:</strong> {moneda} {parseFloat(anticipo).toFixed(2)}
        </p>
        <p>
          <strong>Financiación: </strong>
          {cuotas} Cuotas de {moneda} {parseFloat(cuotaValor).toFixed(2)}
        </p>
        <p>
          <strong>IVA:</strong> {moneda} {parseFloat(IVA).toFixed(2)}
        </p>

        <p>
          <strong>Precio Final:</strong> {moneda}{" "}
          {parseFloat(PrecioFinal).toFixed(2)}
        </p>
      </div>

      <div>
        <h3>Asesor Comercial</h3>
        <p>
          <strong>Nombre:</strong> {Usuario.nombre} {Usuario.apellido}
        </p>
        <p>
          <strong>Teléfono:</strong> {Usuario.telefono}
        </p>
        <p>
          <strong>Email:</strong> {Usuario.email}
        </p>
      </div>

      <div>
        <h3>Cliente</h3>
        <p>
          <strong>Nombre:</strong> {Cliente.nombre} {Cliente.apellido}
        </p>
        <p>
          <strong>Email:</strong> {Cliente.mail}
        </p>
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
