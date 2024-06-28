const { ContactoProducto, Productos } = require("../db.js");

const createContactoProducto = async (req, res) => {
  try {
    const {
      idProducto,
      nombre,
      apellido,
      razonSocial,
      email,
      telefonoCelular,
      direccion,
      pagoContado,
      cuotas,
      anticipo,
      moneda,
    } = req.body;

    // Verificar que los parámetros obligatorios están presentes
    if (
      !idProducto ||
      !nombre ||
      !apellido ||
      !razonSocial ||
      !email ||
      !telefonoCelular
    ) {
      return res.status(400).json({
        error: "Faltan parámetros obligatorios en el cuerpo de la solicitud",
      });
    }

    // Crear el nuevo contacto
    const nuevoContacto = await ContactoProducto.create({
      idProducto,
      nombre,
      apellido,
      razonSocial,
      email,
      telefonoCelular,
      direccion,
      pagoContado,
      cuotas,
      anticipo,
      moneda,
    });

    return res.status(201).json(nuevoContacto);
  } catch (error) {
    console.error("Error al crear el contacto de producto:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getContactoProducto = async (req, res) => {
  try {
    const contactos = await ContactoProducto.findAll({
      include: [
        {
          model: Productos,
          attributes: ["familia", "marca", "modelo"],
        },
      ],
    });

    return res.status(200).json(contactos);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

const getContactoProductoById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send("Se requiere el ID del contacto");
    }

    const contacto = await ContactoProducto.findByPk(id, {
      include: [
        {
          model: Productos,
          attributes: ["familia", "marca", "modelo"],
        },
      ],
    });

    if (!contacto) {
      return res.status(404).send("Contacto no encontrado");
    }

    return res.status(200).json(contacto);
  } catch (error) {
    console.error("Error al obtener el contacto:", error);
    return res.status(500).send("Error al obtener el contacto");
  }
};

module.exports = {
  createContactoProducto,
  getContactoProductoById,
  getContactoProducto,
};
