import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useCotizaciones } from "../../hooks/useCotizaciones";
import BackButton from "../../UI/BackButton";
import Select from "react-select";

export default function CotizacionEdit() {
  const { auth } = useAuth();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const idUsuario = token;

  const {
    cotizacionDetalleQuery: {
      data: cotizacionDetalle,
      isLoading: isLoadingCotizacion,
    },
    cotizacionEditMutation: { mutate: cotizacionEdit },
  } = useCotizaciones(null, id);

  const [formData, setFormData] = useState({
    idUsuario: idUsuario,
    idCotizacion: "",
    idCliente: "",
    idProducto: "",
    notasEmail: "",
    notasUsuario: "",
    plazoEntrega: "",
    formaPago: "",
    mantenimientoOferta: "",
    lugarEntrega: "",
    garantia: "",
    entregaTecnica: "",
    origenFabricacion: "",
    patentamiento: "",
    cotizacionesIndividuales: [
      {
        id: "",
        precio: "",
        anticipo: 0,
        saldoAFinanciar: 0,
        IVA: 10.5,
        moneda: "USD",
        saldoConInteres: 0,
        interes: 0,
        cuotas: 1,
        cuotaValor: null,
        PrecioFinal: "",
        cantidadProducto: 0,
        estado: 1,
      },
    ],
  });

  useEffect(() => {
    if (!isLoadingCotizacion && cotizacionDetalle) {
      // Verificar si existe cotizacionDetalle y si tiene cotizacionesIndividuales
      const cotizaciones = cotizacionDetalle.cotizacionesIndividuales || [];

      // Actualizar formData con la información del detalle de cotización
      setFormData({
        idUsuario: idUsuario,
        id: cotizacionDetalle.idCotizacion || "",
        idCliente: cotizacionDetalle.idCliente || "",
        idProducto: cotizacionDetalle.idProducto || "",
        notasEmail: cotizacionDetalle.notasEmail || "",
        cliente: cotizacionDetalle.cliente.email || "",
        familia: cotizacionDetalle.producto.familia || "",
        CUIT: cotizacionDetalle.cliente.CUIT || "",
        razonSocial: cotizacionDetalle.cliente.razonSocial || "",
        marca: cotizacionDetalle.producto.marca || "",
        modelo: cotizacionDetalle.producto.modelo || "",
        notasUsuario: cotizacionDetalle.notasUsuario || "",
        plazoEntrega: cotizacionDetalle.plazoEntrega || "",
        formaPago: cotizacionDetalle.formaPago || "",
        mantenimientoOferta: cotizacionDetalle.mantenimientoOferta || "",
        lugarEntrega: cotizacionDetalle.lugarEntrega || "",
        garantia: cotizacionDetalle.garantia || "",
        entregaTecnica: cotizacionDetalle.entregaTecnica || "",
        origenFabricacion: cotizacionDetalle.origenFabricacion || "",
        patentamiento: cotizacionDetalle.patentamiento || "",
        cotizacionesIndividuales: cotizaciones.map((cotizacionIndividual) => ({
          id: cotizacionIndividual.id || "",
          precio: cotizacionIndividual.precio || "",
          anticipo: cotizacionIndividual.anticipo || 0,
          saldoAFinanciar: cotizacionIndividual.saldoAFinanciar || 0,
          IVA: cotizacionIndividual.IVA || 10.5,
          moneda: cotizacionIndividual.moneda || "USD",
          saldoConInteres: cotizacionIndividual.saldoConInteres || 0,
          interes: cotizacionIndividual.interes || 0,
          cuotas: cotizacionIndividual.cuotas || 1,
          cuotaValor: cotizacionIndividual.cuotaValor || null,
          PrecioFinal: cotizacionIndividual.PrecioFinal || "",
          cantidadProducto: cotizacionIndividual.cantidadProducto || 0,
          estado: cotizacionIndividual.estado || 1,
        })),
      });
    }
  }, [isLoadingCotizacion, cotizacionDetalle, idUsuario, id]);

  const handleCotizacionIndividualChange = (index, field, value) => {
    // Crea una copia del array de cotizaciones para no mutar el estado directamente
    const updatedCotizaciones = [...formData.cotizacionesIndividuales];

    // Convierte el valor a número si el campo es 'cuotas' o 'anticipo' para cálculos precisos
    const newValue =
      field === "cuotas" ||
      field === "anticipo" ||
      field === "precio" ||
      field === "IVA"
        ? parseFloat(value)
        : value;

    // Actualiza el campo específico en la cotización correspondiente
    updatedCotizaciones[index] = {
      ...updatedCotizaciones[index],
      [field]: newValue,
    };

    // Recalcula los valores derivados si el campo cambiado afecta esos cálculos
    const cotizacion = updatedCotizaciones[index];
    if (field === "cuotas" || field === "anticipo" || field === "precio") {
      // Recalcula saldoAFinanciar
      cotizacion.saldoAFinanciar = (
        cotizacion.precio - cotizacion.anticipo
      ).toFixed(2);

      // Recalcula saldoConInteres
      cotizacion.saldoConInteres = (
        cotizacion.saldoAFinanciar *
        (1 + cotizacion.interes / 100)
      ).toFixed(2);

      // Recalcula cuotaValor
      cotizacion.cuotaValor = (
        cotizacion.saldoConInteres / cotizacion.cuotas
      ).toFixed(2);

      // Recalcula PrecioFinal
      cotizacion.PrecioFinal = (
        cotizacion.cuotaValor * cotizacion.cantidadProducto
      ).toFixed(2);
    }

    // Actualiza el interés si el campo cambiado es cuotas
    if (field === "cuotas") {
      const nuevoInteres = newValue > 1 ? newValue * 3.5 : 0;
      cotizacion.interes = nuevoInteres;

      // Recalcula los valores derivados que dependen de interés
      cotizacion.saldoConInteres = (
        cotizacion.saldoAFinanciar *
        (1 + nuevoInteres / 100)
      ).toFixed(2);
      cotizacion.cuotaValor = (
        cotizacion.saldoConInteres / cotizacion.cuotas
      ).toFixed(2);
      cotizacion.PrecioFinal = (
        cotizacion.cuotaValor * cotizacion.cantidadProducto
      ).toFixed(2);
    }

    // Actualiza el estado con las cotizaciones modificadas
    setFormData({
      ...formData,
      cotizacionesIndividuales: updatedCotizaciones,
    });
  };

  const addCotizacionIndividual = () => {
    setFormData({
      ...formData,
      cotizacionesIndividuales: [
        ...formData.cotizacionesIndividuales,
        {
          id: formData.id,
          precio: "",
          anticipo: 0,
          saldoAFinanciar: 0,
          IVA: 10.5,
          moneda: "USD",
          interes: 0,
          cuotas: 1,
          cuotaValor: null,
          saldoConInteres: 0,
          PrecioFinal: "",
          cantidadProducto: 0,
          estado: 1,
        },
      ],
    });
  };

  const removeCotizacionIndividual = (index) => {
    const updatedCotizaciones = formData.cotizacionesIndividuales.filter(
      (_, i) => i !== index
    );
    setFormData({
      ...formData,
      cotizacionesIndividuales: updatedCotizaciones,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const updatedCotizaciones = formData.cotizacionesIndividuales.map(
      (cotizacion, idx) => {
        if (cotizacion.cuotas > 1) {
          const nuevoInteres = cotizacion.cuotas * 3.5;
          return {
            ...cotizacion,
            interes: nuevoInteres,
          };
        }
        return cotizacion;
      }
    );

    setFormData((prevData) => ({
      ...prevData,
      cotizacionesIndividuales: updatedCotizaciones,
    }));
  }, []);

  const calcularValoresCotizacion = (cotizacion) => {
    let precio = parseFloat(cotizacion.precio) || 0;
    let anticipo = parseFloat(cotizacion.anticipo) || 0;
    let IVA = parseFloat(cotizacion.IVA) || 0;
    let interes = parseFloat(cotizacion.interes) || 0;

    let saldoAFinanciar = precio - anticipo;
    let saldoConInteres = saldoAFinanciar * (1 + interes / 100);
    let cuotaValor = null;
    if (cotizacion.cuotas > 0) {
      cuotaValor = saldoConInteres / cotizacion.cuotas;
    }
    let PrecioFinal =
      cotizacion.cuotas === 1
        ? precio * (1 + IVA / 100)
        : (saldoConInteres + anticipo) * 1.105;

    return {
      saldoAFinanciar: saldoAFinanciar.toFixed(2),
      saldoConInteres: saldoConInteres.toFixed(2),
      cuotaValor: cuotaValor !== null ? cuotaValor.toFixed(2) : null,
      PrecioFinal: PrecioFinal.toFixed(2),
    };
  };

  useEffect(() => {
    const updatedCotizaciones = formData.cotizacionesIndividuales.map(
      (cotizacion) => {
        const valoresCalculados = calcularValoresCotizacion(cotizacion);
        return {
          ...cotizacion,
          ...valoresCalculados,
        };
      }
    );

    setFormData((prevData) => ({
      ...prevData,
      cotizacionesIndividuales: updatedCotizaciones,
    }));
  }, [
    formData.cotizacionesIndividuales.map((c) => c.precio).join(),
    formData.cotizacionesIndividuales.map((c) => c.anticipo).join(),
    formData.cotizacionesIndividuales.map((c) => c.IVA).join(),
    formData.cotizacionesIndividuales.map((c) => c.cuotas).join(),
    formData.cotizacionesIndividuales.map((c) => c.interes).join(),
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    cotizacionEdit(formData);
  };

  return (
    <div className="cotizadorform">
      <form onSubmit={handleSubmit}>
        <BackButton />
        <div className="form-container3">
          <div>
            <h2 className="tituloCompo">Cotizador</h2> <br />
          </div>
          <div></div>
          <div className="form-group">
            <label className="form-label">Vendedor</label>
            <input
              type="number"
              name="idUsuario"
              placeholder={`${auth?.nombre || ""} ${auth?.apellido || ""}`}
              onChange={handleChange}
              readOnly
              className="form-input"
              value={formData.idUsuario}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Cliente</label>
            <Select
              name="idCliente"
              value={{
                label: formData.cliente || "",
                value: formData.idCliente || "",
              }}
              isDisabled={true}
              onChange={(option) =>
                setFormData({ ...formData, cliente: option?.value || "" })
              }
              options={[]}
              className="form-select"
            />
            <span>
              CUIT: {formData.CUIT} {""}
              RAZÓN SOCIAL: {formData.razonSocial}
            </span>
          </div>
          <div></div>
          <div className="form-group">
            <label className="form-label">Familia</label>
            <input
              type="text"
              name="idProducto"
              value={formData.familia}
              onChange={handleChange}
              className="form-input"
              disabled
            />
          </div>
          <div className="form-group">
            <label className="form-label">Marca</label>
            <input
              type="text"
              name="idProducto"
              value={formData.marca}
              onChange={handleChange}
              className="form-input"
              disabled
            />
          </div>
          <div className="form-group">
            <label className="form-label">Modelo</label>
            <input
              type="text"
              name="idProducto"
              value={formData.modelo}
              onChange={handleChange}
              className="form-input"
              disabled
            />
          </div>
          <div className="form-group">
            <label className="form-label">Notas Email</label>
            <textarea
              name="notasEmail"
              value={formData.notasEmail}
              onChange={handleChange}
              className="form-textarea"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Notas Usuario</label>
            <textarea
              name="notasUsuario"
              value={formData.notasUsuario}
              onChange={handleChange}
              className="form-textarea"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Plazo de Entrega</label>
            <input
              type="text"
              name="plazoEntrega"
              value={formData.plazoEntrega}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Forma de Pago</label>
            <input
              type="text"
              name="formaPago"
              value={formData.formaPago}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Mantenimiento Oferta</label>
            <input
              type="text"
              name="mantenimientoOferta"
              value={formData.mantenimientoOferta}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Lugar de Entrega</label>
            <input
              type="text"
              name="lugarEntrega"
              value={formData.lugarEntrega}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Garantía</label>
            <input
              type="text"
              name="garantia"
              value={formData.garantia}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Entrega Técnica</label>
            <input
              type="text"
              name="entregaTecnica"
              value={formData.entregaTecnica}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Origen de Fabricación</label>
            <input
              type="text"
              name="origenFabricacion"
              value={formData.origenFabricacion}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Patentamiento</label>
            <input
              type="text"
              name="patentamiento"
              value={formData.patentamiento}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          {formData.cotizacionesIndividuales.map((cotizacion, index) => (
            <div key={index} className="form-group">
              <label className="form-label">Cantidad</label>
              <input
                type="number"
                value={cotizacion.cantidadProducto}
                onChange={(e) =>
                  handleCotizacionIndividualChange(
                    index,
                    "cantidadProducto",
                    e.target.value
                  )
                }
                className="form-input"
              />
              <label className="form-label">Moneda</label>
              <input
                type="text"
                value={cotizacion.moneda}
                onChange={(e) =>
                  handleCotizacionIndividualChange(
                    index,
                    "moneda",
                    e.target.value
                  )
                }
                className="form-input"
              />
              <label className="form-label">Precio de Venta</label>
              <input
                type="text"
                value={cotizacion.precio}
                onChange={(e) =>
                  handleCotizacionIndividualChange(
                    index,
                    "precio",
                    e.target.value
                  )
                }
                className="form-input"
              />
              <label className="form-label">IVA</label>
              <input
                type="number"
                value={cotizacion.IVA}
                onChange={(e) =>
                  handleCotizacionIndividualChange(index, "IVA", e.target.value)
                }
                className="form-input"
              />
              <div className="form-group">
                <label className="form-label">Cuotas</label>
                <select
                  name={`cotizacionesIndividuales[${index}].cuotas`}
                  value={cotizacion.cuotas}
                  onChange={(e) =>
                    handleCotizacionIndividualChange(
                      index,
                      "cuotas",
                      e.target.value
                    )
                  }
                  className="form-input"
                >
                  <option value={1}>Contado</option>
                  {Array.from({ length: 11 }, (_, i) => i + 2).map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              {cotizacion.cuotas > 1 && (
                <>
                  <div className="form-group">
                    <label className="form-label">Anticipo:</label>
                    <input
                      type="number"
                      name={`cotizacionesIndividuales[${index}].anticipo`}
                      value={cotizacion.anticipo}
                      onChange={(e) =>
                        handleCotizacionIndividualChange(
                          index,
                          "anticipo",
                          e.target.value
                        )
                      }
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Valor de Cuota:</label>
                    <input
                      type="number"
                      name={`cotizacionesIndividuales[${index}].cuotaValor`}
                      value={cotizacion.cuotaValor}
                      onChange={(e) =>
                        handleCotizacionIndividualChange(
                          index,
                          "cuotaValor",
                          e.target.value
                        )
                      }
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Saldo a Financiar:</label>
                    <input
                      type="number"
                      name={`cotizacionesIndividuales[${index}].saldoAFinanciar`}
                      value={cotizacion.saldoAFinanciar}
                      onChange={(e) =>
                        handleCotizacionIndividualChange(
                          index,
                          "saldoAFinanciar",
                          e.target.value
                        )
                      }
                      required
                      className="form-input"
                    />
                  </div>
                </>
              )}

              <label className="form-label">Saldo con Interés</label>
              <input
                type="text"
                value={cotizacion.saldoConInteres}
                readOnly
                className="form-input"
              />
              <label className="form-label">Interés</label>
              <input
                type="number"
                value={cotizacion.interes}
                onChange={(e) =>
                  handleCotizacionIndividualChange(
                    index,
                    "interes",
                    e.target.value
                  )
                }
                className="form-input"
              />

              <label className="form-label">Precio Final</label>
              <input
                type="text"
                value={cotizacion.PrecioFinal}
                readOnly
                className="form-input"
              />

              <br />
              <br />
              <div>
                <button
                  type="button"
                  onClick={() => removeCotizacionIndividual(index)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div>
            <button type="button" onClick={addCotizacionIndividual}>
              Añadir Cotización
            </button>
            <button type="submit" className="form-submit">
              Guardar cambios
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
