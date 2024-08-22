import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useClientes } from "../../hooks/useClientes";
import BackButton from "../../UI/BackButton";
import InputMask from "react-input-mask";
import { soloNumeros } from "../../utils/soloNumeros";

export default function CargaClientes() {
  const { auth } = useAuth();
  const { mutate: clienteCreate } = useClientes().clientesMutation;
  const token = localStorage.getItem("token");
  const idUsuario = token;

  const handleMaskedChange = (e) => {
    const unmaskedValue = e.target.value.replace(/-/g, "").replace(/\s+/g, "");
    handleChange({
      target: {
        name: e.target.name,
        value: unmaskedValue,
      },
    });
  };

  // Estado local para manejar los datos del formulario
  const [formData, setFormData] = useState({
    idUsuario: idUsuario,
    CUIT: "",
    domicilio: "",
    nombre: "",
    apellido: "",
    mail: "",
    telefono: "",
    razonSocial: "",
  });

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { ...formData, idUsuario };

    await clienteCreate(data);

    setFormData({
      CUIT: "",
      domicilio: "",
      nombre: "",
      apellido: "",
      mail: "",
      telefono: "",
      razonSocial: "",
    });
  };

  return (
    <div className="form-container1">
      <BackButton />
      <h2 className="tituloCompo">Cargar Clientes</h2> <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="domicilio">
            CUIT<span className="obligatorio">*</span>
          </label>
          <InputMask
            mask="99 - 99999999 - 9"
            maskChar=" "
            value={formData.CUIT}
            onChange={handleMaskedChange}
            required
          >
            {(inputProps) => (
              <input
                {...inputProps}
                type="text"
                id="CUIT"
                name="CUIT"
                required
              />
            )}
          </InputMask>
        </div>
        <div className="form-group">
          <label htmlFor="domicilio">
            Domicilio<span className="obligatorio">*</span>
          </label>
          <input
            type="text"
            id="domicilio"
            name="domicilio"
            value={formData.domicilio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombre">Razón Social</label>
          <input
            type="text"
            id="razonSocial"
            name="razonSocial"
            value={formData.razonSocial}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombre">
            Nombre<span className="obligatorio">*</span>
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">
            Apellido<span className="obligatorio">*</span>
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mail">
            Email<span className="obligatorio">*</span>
          </label>
          <input
            type="email"
            id="mail"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">
            Teléfono<span className="obligatorio">*</span>
          </label>
          <input
            type="number"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={(e) => handleChange(soloNumeros(e))}
            required
          />
        </div>
        <button type="submit" className="form-submit">
          Guardar Cliente
        </button>
      </form>
    </div>
  );
}
