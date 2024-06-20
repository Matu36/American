import React, { useState } from "react";
import Swal from "sweetalert2";

const Clouddinary = import.meta.env.VITE_CLOUDINARY_URL;

export default function FormProduct() {
  //CLOUDDINARY//

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

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

  //CLOUDDINARY//

  const [producto, setProducto] = useState({
    familia: "",
    marca: "",
    modelo: "",
    precio: "",
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
  });

  console.log(producto);

  const saveProduct = async (e) => {
    e.preventDefault();

    try {
      const request = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}productos/create`,
        {
          method: "POST",
          body: JSON.stringify(producto),
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await request.json();
      console.log("Producto creado:", data);

      await Swal.fire({
        position: "center",
        icon: "success",
        title: "El producto ha sido creado",
        showConfirmButton: false,
        timer: 2000,
      });

      setProducto({
        marca: "",
        imagen: "",
        imagen1: "",
        imagen2: "",
        imagen3: "",
        cantidadTotal: "",
        precio: "",
        codigo: "",
        talle: "",
      });
    } catch (error) {
      console.error("Error al crear el producto:", error);

      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Hubo un error al crear el producto",
        showConfirmButton: false,
        timer: 2000, // 2 segundos
      });
    }
  };

  //FIN EDITAR COSTOS

  return (
    <div className="form-container1">
      <h2 className="tituloCompo">Cargar Producto</h2> <br />
      <form onSubmit={saveProduct}>
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="marca">Marca</label>

          <input
            id="amrca"
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
            Agregar Producto
          </button>
        </div>
      </form>
    </div>
  );
}
