const { Productos } = require("../db.js");

const getProductos = async (req, res) => {
  try {
    let productos = await Productos.findAll();

    return !productos
      ? res.status(404).send("No hay Productos")
      : res.send(
          productos.map(
            ({
              id,
              familia,
              marca,
              modelo,
              imagen,
              imagen1,
              imagen2,
              imagen3,
              imagen4,
              imagen5,
              imagen6,
              cantidadTotal,
              precio,
              codigo,
              potencia,
              motor,
              capacidadDeCarga,
              capacidadDeBalde,
              detalles,
            }) => ({
              id,
              familia,
              marca,
              modelo,
              imagen,
              imagen1,
              imagen2,
              imagen3,
              imagen4,
              imagen5,
              imagen6,
              cantidadTotal,
              precio,
              codigo,
              potencia,
              motor,
              capacidadDeCarga,
              capacidadDeBalde,
              detalles,
            })
          )
        );
  } catch (error) {
    console.log(error);
    return res.status(404).send("Error 404");
  }
};

// FUNCION PARA TRAER SOLO LAS CATEGORIAS PARA EL INPUT QUE VA MOSTRANDO LAS CATEGORIAS //

const getProductosPorCategoria = async (req, res) => {
  try {
    let familias = await Productos.findAll({
      attributes: ["familia"],
      group: ["familia"],
    });

    if (!familias || familias.length === 0) {
      return res.status(404).send("No hay familias de productos");
    }

    // Obtener solo los nombres de las familias
    const nombresFamilias = familias.map(({ familia }) => familia);

    // Crear un string con las familias separadas por comas
    const familiasString = nombresFamilias.join(", ");

    return res.send(familiasString);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error interno del servidor");
  }
};

// FUNCION PARA VER EL DETALLE DEL PRODUCTO //

const getProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Productos.findByPk(id);

    if (!producto) {
      return res.status(404).send("Producto no encontrado");
    }

    // Devolver el producto encontrado
    return res.send({
      id: producto.id,
      familia: producto.familia,
      marca: producto.marca,
      modelo: producto.modelo,
      imagen: producto.imagen,
      imagen1: producto.imagen1,
      imagen2: producto.imagen2,
      imagen3: producto.imagen3,
      imagen4: producto.imagen4,
      imagen5: producto.imagen5,
      imagen6: producto.imagen6,
      precio: producto.precio,
      codigo: producto.codigo,
      potencia: producto.potencia,
      cantidadTotal: producto.cantidadTotal,
      motor: producto.motor,
      capacidadDeCarga: producto.capacidadDeCarga,
      capacidadDeBalde: producto.capacidadDeBalde,
      Detalles: producto.detalles,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error interno del servidor");
  }
};

// FUNCION PARA MODIFICAR LOS PRODUCTOS  //

const putProductos = async (req, res) => {
  try {
    const { id, ...updatedFields } = req.body;

    if (!id) {
      return res
        .status(400)
        .send("Se requiere un ID válido para actualizar el producto.");
    }

    let producto = await Productos.findOne({ where: { id } });

    if (!producto) {
      return res.status(404).send("No se encontró el producto.");
    }

    await producto.update(updatedFields);

    await producto.reload();

    return res.send(producto);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error interno del servidor.");
  }
};

const createProducto = async (req, res) => {
  try {
    if (
      !req.body?.familia ||
      !req.body?.marca ||
      !req.body?.modelo ||
      !req.body?.precio
    )
      throw "No body params";

    const generateNewId = async () => {
      const maxId = await Productos.max("id");
      const newId = maxId ? maxId + 1 : 1;
      return newId;
    };

    let id = await generateNewId();

    let createdProducto = await Productos.create({ id, ...req.body });

    return res.status(201).send(createdProducto);
  } catch (e) {
    console.log(e);
    return res.status(400).send(e);
  }
};

// FUNCION PARA ELIMINAR EL PRODUCTO //

const deleteProducto = async (req, res) => {
  try {
    const { id } = req.body;
    await Productos.destroy({
      where: {
        id,
      },
    });

    res.status(200).send("Producto eliminado exitosamente");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const getProductosParaCotizar = async (req, res) => {
  try {
    const productos = await Productos.findAll({
      attributes: ["id", "familia", "marca", "modelo"],
    });
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

module.exports = {
  getProductos,
  putProductos,
  createProducto,
  deleteProducto,
  getProductoById,
  getProductosParaCotizar,
  getProductosPorCategoria,
};
