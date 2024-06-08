const { Clientes } = require("../db.js");
const { Usuarios } = require("../db.js");

const createCliente = async (req, res) => {
  try {
    if (
      !req.body?.idUsuario ||
      !req.body?.CUIT ||
      !req.body?.domicilio ||
      !req.body?.nombre ||
      !req.body?.apellido ||
      !req.body?.mail ||
      !req.body?.telefono ||
      !req.body?.usuarioDeCreacion
    )
      throw "Faltan parámetros en el cuerpo de la solicitud";

    const generateNewId = async () => {
      const maxId = await Clientes.max("id");
      const newId = maxId ? maxId + 1 : 1;
      return newId;
    };

    let id = await generateNewId();

    let nuevoCliente = await Clientes.create({ id, ...req.body });

    return res.status(201).send(nuevoCliente);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

const getClientes = async (req, res) => {
  try {
    // Verifica si se proporciona el ID de usuario
    if (!req.body?.idUsuario) {
      throw "Se requiere el ID de usuario";
    }

    const idUsuario = req.body.idUsuario;

    // Busca el usuario en la base de datos
    const usuario = await Usuarios.findByPk(idUsuario);

    if (!usuario) {
      throw "Usuario no encontrado";
    }

    let clientes;

    // Si el usuario tiene el rol para ver todos los clientes
    if (usuario.rol === true) {
      clientes = await Clientes.findAll();
    } else {
      // Si el usuario solo puede ver sus propios clientes
      clientes = await Clientes.findAll({
        where: { idUsuario },
      });
    }

    return res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

module.exports = {
  createCliente,
  getClientes,
};
