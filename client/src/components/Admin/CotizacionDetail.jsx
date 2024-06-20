import React from "react";
import { useCotizaciones } from "../../hooks/useCotizaciones";
import { useParams } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";
import Logo from "../../assets/img/logoAmerican.png";

import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  Image,
} from "@react-pdf/renderer";
import { styles } from "../../assets/Styles/PDFestilosDetalle";

export default function CotizacionDetail() {
  const { id } = useParams();

  const { data: cotizacionDetalle, isLoading } = useCotizaciones(
    null,
    id
  ).cotizacionDetalleQuery;

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  const {
    numeroCotizacion,
    precio,
    anticipo,
    saldoAFinanciar,
    IVA,
    moneda,
    // interes,
    // saldo,
    // saldoConInteres,
    PrecioFinal,
    fechaDeCreacion,
    Usuario,
    Cliente,
    Producto,
  } = cotizacionDetalle;

  const MyDocument = ({ cotizacionDetalle }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.logoContainer}>
          <Image src={Logo} style={styles.logo} />
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Cotización {numeroCotizacion}</Text>
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
            <Text style={styles.label}>Precio: </Text>
            {moneda} {parseFloat(precio).toFixed(2)}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Anticipo: </Text>
            {moneda} {parseFloat(anticipo).toFixed(2)}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Saldo a Financiar: </Text>
            {moneda} {parseFloat(saldoAFinanciar).toFixed(2)}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>IVA: </Text>
            {moneda} {parseFloat(IVA).toFixed(2)}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Precio Final: </Text>
            {moneda} {parseFloat(PrecioFinal).toFixed(2)}
          </Text>
          <Text style={styles.subHeader}>Vendedor</Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Nombre: </Text>
            {Usuario.nombre} {Usuario.apellido}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Email: </Text>
            {Usuario.email}
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
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="cotizacion-detail">
      <h2 className="titulo">Detalles de Cotización</h2>

      <div className="seccion">
        <h3>Información de Cotización</h3>
        <p>
          <strong>Número de Cotización:</strong>{" "}
          {numeroCotizacion ? numeroCotizacion : null}
        </p>
        <p>
          <strong>Fecha de la Cotización:</strong>{" "}
          {new Date(fechaDeCreacion).toLocaleString()}
        </p>
      </div>
      <div className="seccion">
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

      <div className="seccion">
        <h3>Detalle de la Cotización</h3>
        <p>
          <strong>Precio:</strong> {moneda} {parseFloat(precio).toFixed(2)}
        </p>
        <p>
          <strong>Anticipo:</strong> {moneda} {parseFloat(anticipo).toFixed(2)}
        </p>
        <p>
          <strong>Saldo a Financiar:</strong> {moneda}{" "}
          {parseFloat(saldoAFinanciar).toFixed(2)}
        </p>
        <p>
          <strong>IVA:</strong> {moneda} {parseFloat(IVA).toFixed(2)}
        </p>
        {/* <p>
          <strong>Interés:</strong> {parseFloat(interes).toFixed(2)}%
        </p>
        <p>
          <strong>Saldo:</strong> {moneda} {parseFloat(saldo).toFixed(2)}
        </p>
        <p>
          <strong>Saldo con Interés:</strong> {moneda}{" "}
          {parseFloat(saldoConInteres).toFixed(2)}
        </p> */}
        <p>
          <strong>Precio Final:</strong> {moneda}{" "}
          {parseFloat(PrecioFinal).toFixed(2)}
        </p>
      </div>

      <div className="seccion">
        <h3>Vendedor</h3>
        <p>
          <strong>Nombre:</strong> {Usuario.nombre} {Usuario.apellido}
        </p>
        <p>
          <strong>Email:</strong> {Usuario.email}
        </p>
      </div>

      <div className="seccion">
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
        fileName={`cotizacion_${numeroCotizacion}.pdf`}
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
