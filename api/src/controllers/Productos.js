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

const getProductoById = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del parámetro de la URL
    const producto = await Productos.findByPk(id); // Buscar el producto por su ID

    // Verificar si se encontró el producto
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
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error interno del servidor");
  }
};

const putProductos = async (req, res) => {
  try {
    const { id, ...updatedFields } = req.body;

    // Validar que el ID sea un valor válido
    if (!id) {
      return res
        .status(400)
        .send("Se requiere un ID válido para actualizar el producto.");
    }

    // Buscar el producto por ID
    let producto = await Productos.findOne({ where: { id } });

    // Verificar si se encontró el producto
    if (!producto) {
      return res.status(404).send("No se encontró el producto.");
    }

    // Actualizar el producto con los campos actualizados
    await producto.update(updatedFields);

    // Recargar el producto actualizado
    await producto.reload();

    // Enviar el producto actualizado como respuesta
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

module.exports = {
  getProductos,
  putProductos,
  createProducto,
  deleteProducto,
  getProductoById,
};
