import React, { useState } from "react";
import Swal from "sweetalert2";
import { useProducto } from "../../hooks/useProductos";
import Select from "react-select";

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
  const [selectedFamilia, setSelectedFamilia] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedMarca, setSelectedMarca] = useState(null);
  const { data: productos } = useProducto().productosParaCotizarQuery;
  const { data: marcas } = useProducto().productosMarcasQuery;
  const { data: divisiones } = useProducto().productosDivisionesQuery;
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);

  const opcionesEmpresa = [
    { value: "AGRO", label: "AGRO" },
    { value: "VIAL", label: "VIAL" },
  ];

  const handleChangeEmpresa = (selectedOption) => {
    setSelectedEmpresa(selectedOption);
    setProducto({ ...producto, empresa: selectedOption.value });
  };

  const opcionesFamilias =
    productos?.map((producto) => ({
      value: producto.familia,
      label: producto.familia,
    })) || [];

  const opcionesConNuevaFamilia = [
    ...opcionesFamilias,
    { value: "nueva", label: "Agregar nueva" },
  ];

  const handleChangeFamilia = (selectedOption) => {
    if (selectedOption.value === "nueva") {
      const nuevaFamilia = prompt("Ingrese la nueva Categoría:");
      if (nuevaFamilia) {
        const newFamiliaOption = { value: nuevaFamilia, label: nuevaFamilia };
        setSelectedFamilia(newFamiliaOption);
        setProducto({ ...producto, familia: nuevaFamilia });
      }
    } else {
      setSelectedFamilia(selectedOption);
      setProducto({ ...producto, familia: selectedOption.value });
    }
  };

  const opcionesDivisiones =
    divisiones?.map((division) => ({
      value: division,
      label: division,
    })) || [];

  const opcionesConNuevaDivision = [
    ...opcionesDivisiones,
    { value: "nueva", label: "Agregar nueva" },
  ];

  const handleChangeDivision = (selectedOption) => {
    if (selectedOption.value === "nueva") {
      const nuevaDivision = prompt("Ingrese la nueva División:");
      if (nuevaDivision) {
        const newDivisionOption = {
          value: nuevaDivision,
          label: nuevaDivision,
        };
        setSelectedDivision(newDivisionOption);
        setProducto({ ...producto, division: nuevaDivision });
      }
    } else {
      setSelectedDivision(selectedOption);
      setProducto({ ...producto, division: selectedOption.value });
    }
  };

  const opcionesMarcas =
    marcas?.map((marca) => ({
      value: marca,
      label: marca,
    })) || [];

  const opcionesConNuevaMarca = [
    ...opcionesMarcas,
    { value: "nueva", label: "Agregar nueva" },
  ];

  const handleChangeMarca = (selectedOption) => {
    if (selectedOption.value === "nueva") {
      const nuevaMarca = prompt("Ingrese la nueva Marca:");
      if (nuevaMarca) {
        const newMarcaOption = { value: nuevaMarca, label: nuevaMarca };
        setSelectedMarca(newMarcaOption);
        setProducto({ ...producto, marca: nuevaMarca });
      }
    } else {
      setSelectedMarca(selectedOption);
      setProducto({ ...producto, marca: selectedOption.value });
    }
  };

  const [producto, setProducto] = useState({
    familia: "",
    empresa: "",
    marca: "",
    modelo: "",
    division: "",
    precio: 0,
    imagen: "",
    imagen1: "",
    imagen2: "",
    imagen3: "",
    imagen4: "",
    imagen5: "",
    imagen6: "",
    cantidadTotal: 0,
    codigo: "",
    potencia: "",
    motor: "",
    capacidadDeCarga: "",
    capacidadDeBalde: "",
    detalles: "",
    fichaPDF: "",
  });

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

      Swal.fire({
        position: "center",
        icon: "info",
        title: "El Producto ha sido creado corréctamente",
        showConfirmButton: false,
        timer: 2000,
        background: "#ffffff",
        iconColor: "#ffc107",
        customClass: {
          title: "text-dark",
        },
      });

      setProducto({
        marca: "",
        empresa: "",
        familia: "",
        modelo: "",
        imagen: "",
        imagen1: "",
        imagen2: "",
        imagen3: "",
        cantidadTotal: "",
        precio: "",
        codigo: "",
        division: "",
        potencia: "",
        fichaPDF: "",
        motor: "",
        capacidadDeCarga: "",
        capacidadDeBalde: "",
        detalles: "",
      });
    } catch (error) {
      console.error("Error al crear el producto:", error);

      Swal.fire({
        position: "center",
        icon: "info",
        title: "El producto no pudo crearse. Intente más tarde  ",
        showConfirmButton: false,
        timer: 2000,
        background: "#ffffff",
        iconColor: "#ffc107",
        customClass: {
          title: "text-dark",
        },
      });
    }
  };

  return (
    <div className="form-container1">
      <h2 className="tituloCompo">Cargar Producto</h2> <br />
      <form onSubmit={saveProduct}>
        <div className="form-group">
          <div className="form-group">
            <div className="form-group">
              <label htmlFor="empresa">
                Empresa <span className="obligatorio">*</span>
              </label>

              <Select
                id="empresa"
                name="empresa"
                options={opcionesEmpresa}
                value={selectedEmpresa}
                onChange={handleChangeEmpresa}
                required
                placeholder="Selecciona una Empresa"
              />
            </div>
            <label htmlFor="division">
              División <span className="obligatorio">*</span>
            </label>
            <Select
              id="division"
              name="division"
              type="text"
              options={opcionesConNuevaDivision}
              value={selectedDivision}
              onChange={handleChangeDivision}
              placeholder="Selecciona o agrega una nueva división"
              isClearable
            />
          </div>
          <label htmlFor="familia">
            Categoría <span className="obligatorio">*</span>
          </label>
          <Select
            id="familia"
            name="familia"
            options={opcionesConNuevaFamilia}
            value={selectedFamilia}
            onChange={handleChangeFamilia}
            placeholder="Selecciona o agrega una nueva categoría"
            isClearable
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="marca">
            Marca <span className="obligatorio">*</span>
          </label>

          <Select
            id="marca"
            name="marca"
            type="text"
            options={opcionesConNuevaMarca}
            value={selectedMarca}
            onChange={handleChangeMarca}
            placeholder="Selecciona o agrega una nueva marca"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="modelo">
            Modelo<span className="obligatorio">*</span>
          </label>
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
          <label htmlFor="precio">
            Precio <span className="obligatorio">*</span>
          </label>
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
            Agregar Producto
          </button>
        </div>
      </form>
    </div>
  );
}
