import React, { useState, useEffect } from "react";
import { useProducto } from "../../hooks/useProductos";
import { useParams } from "react-router-dom";
import BackButton from "../../UI/BackButton";

const Clouddinary = import.meta.env.VITE_CLOUDINARY_URL;

export default function ProductosEdit() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const {
    productoQueryById: { data: productoDetalle, isLoading: isLoadingDetalle },

    productosEditMutation: { mutate: productoEdit },
  } = useProducto(id);

  const uploadImage = async (e, imageNumber) => {
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
    switch (imageNumber) {
      case 0:
        setProducto({ ...producto, imagen: uploadedImages[0] });
        break;
      case 1:
        setProducto({ ...producto, imagen1: uploadedImages[0] });
        break;
      case 2:
        setProducto({ ...producto, imagen2: uploadedImages[0] });
        break;
      case 3:
        setProducto({ ...producto, imagen3: uploadedImages[0] });
        break;
      case 4:
        setProducto({ ...producto, imagen4: uploadedImages[0] });
        break;
      case 5:
        setProducto({ ...producto, imagen5: uploadedImages[0] });
        break;
      case 6:
        setProducto({ ...producto, imagen6: uploadedImages[0] });
        break;
      default:
        break;
    }
  };

  const uploadPDF = async (e) => {
    const file = e.target.files[0];

    setLoading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Images");

    const res = await fetch(Clouddinary, {
      method: "POST",
      body: data,
    });

    const pdfData = await res.json();
    setLoading(false);
    setProducto({ ...producto, fichaPDF: pdfData.secure_url });
  };

  //CLOUDDINARY//

  const [producto, setProducto] = useState({
    id: id,
    empresa: "",
    familia: "",
    division: "",
    marca: "",
    modelo: "",
    precio: "",
    precioUSD: "",
    imagen: "",
    imagen1: "",
    imagen2: "",
    imagen3: "",
    imagen4: "",
    imagen5: "",
    imagen6: "",
    cantidadTotal: "",
    codigo: "",
    potencia: "",
    motor: "",
    capacidadDeCarga: "",
    capacidadDeBalde: "",
    detalles: "",
    fichaPDF: "",
  });

  useEffect(() => {
    if (productoDetalle) {
      setProducto({
        id: productoDetalle.id || id,
        empresa: productoDetalle.empresa || "",
        division: productoDetalle.division || "",
        familia: productoDetalle.familia || "",
        marca: productoDetalle.marca || "",
        modelo: productoDetalle.modelo || "",
        precio: productoDetalle.precio || "",
        precioUSD: productoDetalle.precioUSD || "",
        imagen: productoDetalle.imagen || "",
        imagen1: productoDetalle.imagen1 || "",
        imagen2: productoDetalle.imagen2 || "",
        imagen3: productoDetalle.imagen3 || "",
        imagen4: productoDetalle.imagen4 || "",
        imagen5: productoDetalle.imagen5 || "",
        imagen6: productoDetalle.imagen6 || "",
        cantidadTotal: productoDetalle.cantidadTotal || "",
        codigo: productoDetalle.codigo || "",
        fichaPDF: productoDetalle.fichaPDF || "",
        potencia: productoDetalle.potencia || "",
        motor: productoDetalle.motor || "",
        capacidadDeCarga: productoDetalle.capacidadDeCarga || "",
        capacidadDeBalde: productoDetalle.capacidadDeBalde || "",
        detalles: productoDetalle.Detalles || "",
      });
    }
  }, [productoDetalle, id]);

  const saveProduct = async (e) => {
    e.preventDefault();
    productoEdit(producto, {
      onSuccess: () => {
        setProducto({
          familia: "",
          empresa: "",
          marca: "",
          division: "",
          modelo: "",
          precio: "",
          precioUSD: "",
          imagen: "",
          imagen1: "",
          imagen2: "",
          imagen3: "",
          imagen4: "",
          imagen5: "",
          imagen6: "",
          cantidadTotal: "",
          codigo: "",
          fichaPDF: "",
          potencia: "",
          motor: "",
          capacidadDeCarga: "",
          capacidadDeBalde: "",
          detalles: "",
        });
      },
    });
  };

  return (
    <div className="form-container1">
      <BackButton />
      <h2 className="tituloCompo">Modificar Producto</h2> <br />
      <form onSubmit={saveProduct}>
        <div className="form-group">
          <label htmlFor="empresa">Empresa</label>
          <input
            type="text"
            id="empresa"
            name="empresa"
            value={producto.empresa}
            autoComplete="off"
            placeholder="Empresa"
            onChange={(e) =>
              setProducto({ ...producto, empresa: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="division">División</label>
          <input
            type="text"
            id="division"
            name="division"
            value={producto.division}
            autoComplete="off"
            placeholder="División"
            onChange={(e) =>
              setProducto({ ...producto, division: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="familia">Categoría</label>
          <input
            type="text"
            id="familia"
            name="familia"
            value={producto.familia}
            autoComplete="off"
            placeholder="Familia"
            onChange={(e) =>
              setProducto({ ...producto, familia: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="marca">Marca</label>
          <input
            id="marca"
            name="marca"
            type="text"
            value={producto.marca}
            onChange={(e) =>
              setProducto({
                ...producto,
                marca: e.target.value,
              })
            }
            placeholder="Marca"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="modelo">Modelo</label>
          <div>
            <input
              type="text"
              id="modelo"
              name="modelo"
              value={producto.modelo}
              autoComplete="off"
              placeholder="Modelo"
              onChange={(e) =>
                setProducto({ ...producto, modelo: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="precio">Precio</label>
          <div>
            <input
              type="number"
              id="precio"
              name="precio"
              value={producto.precio}
              autoComplete="off"
              placeholder="Precio"
              onChange={(e) =>
                setProducto({ ...producto, precio: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="precio">Precio USD</label>
          <div>
            <input
              type="number"
              id="precioUSD"
              name="precioUSD"
              value={producto.precioUSD}
              autoComplete="off"
              placeholder="Precio USD"
              onChange={(e) =>
                setProducto({ ...producto, precioUSD: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="imagen">Imagen</label>
          <input
            type="file"
            id="imagen"
            name="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => uploadImage(e, 0)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imagen">Imagen 1</label>
          <input
            type="file"
            id="imagen1"
            name="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => uploadImage(e, 1)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imagen">Imagen 2</label>
          <input
            type="file"
            id="imagen2"
            name="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => uploadImage(e, 2)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imagen">Imagen 3</label>
          <input
            type="file"
            id="imagen3"
            name="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => uploadImage(e, 3)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imagen">Imagen 4</label>
          <input
            type="file"
            id="imagen4"
            name="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => uploadImage(e, 4)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imagen">Imagen 5</label>
          <input
            type="file"
            id="imagen5"
            name="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => uploadImage(e, 5)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imagen">Imagen 6</label>
          <input
            type="file"
            id="imagen6"
            name="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => uploadImage(e, 6)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fichaPDF">Ficha PDF</label>
          <input
            id="fichaPDF"
            name="fichaPDF"
            type="file"
            accept="application/pdf"
            onChange={uploadPDF}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cantidadTotal">Cantidad Total</label>
          <div>
            <input
              type="text"
              id="cantidadTotal"
              name="cantidadTotal"
              value={producto.cantidadTotal || ""}
              autoComplete="off"
              placeholder="Cantidad Total"
              onChange={(e) =>
                setProducto({ ...producto, cantidadTotal: e.target.value })
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="codigo">Código</label>
          <div>
            <input
              type="text"
              id="codigo"
              name="codigo"
              value={producto.codigo || ""}
              autoComplete="off"
              placeholder="Código"
              onChange={(e) =>
                setProducto({ ...producto, codigo: e.target.value })
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="potencia">Potencia</label>
          <div>
            <input
              type="text"
              id="potencia"
              name="potencia"
              value={producto.potencia || ""}
              autoComplete="off"
              placeholder="Potencia"
              onChange={(e) =>
                setProducto({ ...producto, potencia: e.target.value })
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="motor">Motor</label>
          <div>
            <input
              type="text"
              id="motor"
              name="motor"
              value={producto.motor || ""}
              autoComplete="off"
              placeholder="Motor"
              onChange={(e) =>
                setProducto({ ...producto, motor: e.target.value })
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="capacidadDeCarga">Capacidad de Carga</label>
          <div>
            <input
              type="text"
              id="capacidadDeCarga"
              name="capacidadDeCarga"
              value={producto.capacidadDeCarga || ""}
              autoComplete="off"
              placeholder="Capacidad de Carga"
              onChange={(e) =>
                setProducto({ ...producto, capacidadDeCarga: e.target.value })
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="capacidadDeBalde">Capacidad de Balde</label>
          <div>
            <input
              type="text"
              id="capacidadDeBalde"
              name="capacidadDeBalde"
              value={producto.capacidadDeBalde || ""}
              autoComplete="off"
              placeholder="Capacidad de Balde"
              onChange={(e) =>
                setProducto({ ...producto, capacidadDeBalde: e.target.value })
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="detalles">Detalles</label>
          <div>
            <textarea
              id="detalles"
              name="detalles"
              value={producto.detalles || ""}
              autoComplete="off"
              placeholder="Detalles"
              onChange={(e) =>
                setProducto({ ...producto, detalles: e.target.value })
              }
              style={{ width: "100%", height: "150px", padding: "8px" }}
            />
          </div>
        </div>

        <div className="agregarProducto">
          <button className="form-submit" type="submit">
            Modificar Producto
          </button>
        </div>
      </form>
    </div>
  );
}
