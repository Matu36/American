const { Contacto } = require("../db.js");
// const sendEmailWithTemplate = require("../mailer/sendEmailWithTemplate");

const createContacto = async (req, res) => {
  try {
    const { nombre, apellidos, email, telefono, direccion, consulta } =
      req.body;

    if (
      !nombre ||
      !apellidos ||
      !email ||
      !telefono ||
      !direccion ||
      !consulta
    ) {
      throw "Faltan parámetros en el cuerpo de la solicitud";
    }

    // Crea un nuevo contacto en la base de datos
    const nuevoContacto = await Contacto.create({
      nombre,
      apellidos,
      email,
      telefono,
      direccion,
      consulta,
    });

    // Devuelve el contacto creado
    return res.status(201).json(nuevoContacto);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

// Función para obtener todos los contactos
const getContactos = async (req, res) => {
  try {
    const contactos = await Contacto.findAll();

    if (!contactos || contactos.length === 0) {
      return res.status(404).send("No hay contactos");
    }

    return res.status(200).json(contactos);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

module.exports = {
  createContacto,
  getContactos,
};
