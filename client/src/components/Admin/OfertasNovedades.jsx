import React, { useState } from "react";
import { useOfertasNovedades } from "../../hooks/useOfertasNovedades";
import BackButton from "../../UI/BackButton";

const Clouddinary = import.meta.env.VITE_CLOUDINARY_URL;

export default function OfertasNovedades() {
  const [oferta, setOferta] = useState({
    novedades: "",
    foto: "",
  });

  const { mutate: crearOferta } = useOfertasNovedades().ofertaNovedadMutation;

  const { data } = useOfertasNovedades().ofertaNovedadQuery;

  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;

    setLoading(true);

    const uploadedImages = [];

    for (const file of files) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Images");

      const res = await fetch(Clouddinary, {
        method: "POST",
        body: data,
      });

      const imageData = await res.json();
      uploadedImages.push(imageData.secure_url);
    }

    setLoading(false);

    setOferta({ ...oferta, foto: uploadedImages[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOferta((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!oferta.novedades) {
      alert("El campo novedades es obligatorio");
      return;
    }

    crearOferta(oferta);

    setOferta({
      novedades: "",
      foto: "",
    });
  };

  return (
    <div className="form-container2">
      <BackButton />
      <div>
        <h2>Crear Nueva Oferta/Novedad</h2>
      </div>
      <br />

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="novedades">Novedades:</label>
          <textarea
            type="text"
            id="novedades"
            name="novedades"
            value={oferta.novedades}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="foto">Foto:</label>
          <input
            type="file"
            id="foto"
            onChange={uploadImage}
            disabled={loading}
          />
          {loading && <p>Cargando imagen...</p>}
          {oferta.foto && (
            <img
              src={oferta.foto}
              alt="Imagen cargada"
              style={{ width: "200px", marginTop: "10px" }}
            />
          )}
        </div>
        <button type="submit" className="form-submit" disabled={loading}>
          Crear Oferta/Novedad
        </button>
      </form>
      <div className="ofertas-list">
        <h3>Ofertas y Novedades</h3>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="oferta-item">
              <p>{item.novedades}</p>
              {item.foto && (
                <img
                  src={item.foto}
                  alt={`Oferta ${index + 1}`}
                  style={{ width: "150px", marginTop: "10px" }}
                />
              )}
            </div>
          ))
        ) : (
          <p>No hay ofertas o novedades disponibles.</p>
        )}
      </div>
    </div>
  );
}
