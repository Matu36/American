import React, { useState, useEffect, useRef } from "react";
import Layout from "../../pages/Layout";
import { useContacto } from "../../hooks/useContacto";
import { FaWhatsapp, FaPhoneSquareAlt, FaEnvelope } from "react-icons/fa";
import Card from "../Card";
import { useProducto } from "../../hooks/useProductos";
import Spinner from "../../UI/Spinner";

export default function AmericanContacto() {
  const { mutate: createContacto } = useContacto().contactoMutation;
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [consulta, setConsulta] = useState("");
  const [busquedaActiva, setBusquedaActiva] = useState(false);
  const [selectedMarca, setSelectedMarca] = useState("");
  const cardsContainerRef = useRef(null);

  const { data: productos, isLoading } = useProducto().productosQuery;

  const handleFamiliaClick = (familia) => {
    const familiaNormalized =
      familia.charAt(0).toUpperCase() + familia.slice(1).toLowerCase();
    setSelectedMarca(familiaNormalized);
    setBusquedaActiva(true);
  };

  const handleSearchByMarca = (familia) => {
    const marcaNormalized =
      familia.charAt(0).toUpperCase() + familia.slice(1).toLowerCase();
    setSelectedMarca(marcaNormalized);
    setBusquedaActiva(true);
  };

  useEffect(() => {
    if (busquedaActiva && cardsContainerRef.current) {
      const firstCard = cardsContainerRef.current.querySelector(".card");
      if (firstCard) {
        firstCard.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [busquedaActiva, selectedMarca]);

  const filteredProductos = productos?.filter((producto) =>
    producto.familia.toLowerCase().includes(selectedMarca.toLowerCase())
  );

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !nombre ||
      !apellidos ||
      !email ||
      !telefono ||
      !direccion ||
      !consulta
    ) {
      alert("Por favor completa todos los campos del formulario.");
      return;
    }

    const formData = {
      nombre,
      apellidos,
      email,
      telefono,
      direccion,
      consulta,
    };

    try {
      await createContacto(formData);

      setNombre("");
      setApellidos("");
      setEmail("");
      setTelefono("");
      setDireccion("");
      setConsulta("");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <Layout
      onSearchByMarca={handleSearchByMarca}
      onSelectFamilia={handleFamiliaClick}
    >
      <div className="AmericanContactoContainer">
        <div className="AmericanContacto">
          <h3>CONTACTO</h3>
          <div>
            <h3>Horario de Atención</h3>
            <h5>Lunes a Viernes 9 a 18 hs.</h5>
            <br />
            <div>
              <p className="text-muted">
                Consulte sobre nuestros Equipos y Servicios a través de nuestro
                formulario.
              </p>
              <p style={{ color: "grey", fontWeight: "bold" }}>
                Un asesor de Ventas se contactará con usted de inmediato.
              </p>
            </div>
          </div>

          <div className="AmericanContacto-content">
            <form className="AmericanContacto-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="apellidos">Apellidos:</label>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefono">Teléfono:</label>
                <input
                  type="number"
                  id="telefono"
                  name="telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="direccion">Dirección:</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                />
              </div>
              <div className="form-group"></div>
              <div
                className="form-group"
                style={{ width: "100%", marginTop: "-3rem" }}
              >
                <label htmlFor="consulta">Consulta:</label>
                <textarea
                  id="consulta"
                  name="consulta"
                  rows="4"
                  value={consulta}
                  onChange={(e) => setConsulta(e.target.value)}
                  required
                ></textarea>
              </div>

              <div
                className="form-actions"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "-20px",
                }}
              >
                <button type="submit" className="submit-button">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="datosAmericanContacto">
          <div className="grupoAmericanContacto">
            <div className="grupoContacto">
              <h3>Ventas</h3>
              <a href="tel:47485900" target="_blank" rel="noopener noreferrer">
                <FaPhoneSquareAlt size={40} color="#FF7F50" />
                4748-5900
              </a>
              <a
                href="https://wa.me/1159249700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={40} color="#25D366" />
                11 5924-9700
              </a>
            </div>
          </div>
          <div className="grupoContacto">
            <h3>Post Venta</h3>
            <a href="tel:47485900" target="_blank" rel="noopener noreferrer">
              <FaPhoneSquareAlt size={40} color="#FF7F50" />
              4748-5900
            </a>
            <a
              href="https://wa.me/1139284834"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={40} color="#25D366" />
              11 3928-4834
            </a>
            <a
              href="mailto:servicios@americanvial.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEnvelope size={40} color="#808080" />
              servicios@americanvial.com
            </a>
          </div>
          <div className="grupoContacto">
            <h3>Repuestos</h3>
            <a href="tel:47485900" target="_blank" rel="noopener noreferrer">
              <FaPhoneSquareAlt size={40} color="#FF7F50" />
              4748-5900
            </a>
            <a
              href="https://wa.me/1151469600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={40} color="#25D366" />
              11 5146-9600
            </a>
            <a
              href="mailto:repuestos@americanvial.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEnvelope size={40} color="#808080" />
              repuestos@americanvial.com
            </a>
          </div>
        </div>
      </div>
      {busquedaActiva && (
        <div ref={cardsContainerRef} className="cards-container">
          {filteredProductos.length > 0 ? (
            filteredProductos.map((maquina) => (
              <Card key={maquina.id} {...maquina} />
            ))
          ) : (
            <p>No se encontraron productos.</p>
          )}
        </div>
      )}
    </Layout>
  );
}
