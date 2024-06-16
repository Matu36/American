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
      !req.body?.telefono
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

//TRAE TODOS LOS CLIENTES SIN EXCEPCION //

const getClientesAll = async (req, res) => {
  try {
    const clientes = await Clientes.findAll();

    if (clientes.length === 0) {
      return res.status(404).send("No hay clientes");
    }

    return res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error al obtener los clientes");
  }
};

//TRAE TODOS LOS CLIENTES SI EL USUARIO ES ADMIN, SINO SOLO LOS CLIENTES QUE CARGO ESE USUARIO //

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
      clientes = await Clientes.findAll({
        include: [
          {
            model: Usuarios,
            attributes: ["nombre", "apellido"],
          },
        ],
      });
    } else {
      // Si el usuario solo puede ver sus propios clientes
      clientes = await Clientes.findAll({
        where: { idUsuario },
        include: [
          {
            model: Usuarios,
            attributes: ["nombre", "apellido"],
          },
        ],
      });
    }

    return res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

// MODIFICACION DE LOS DATOS DEL CLIENTE //

const updateCliente = async (req, res) => {
  try {
    if (!req.body?.id) {
      throw "Se requiere el ID del cliente";
    }

    const id = req.body.id;

    // Verifica que al menos uno de los campos para actualizar esté presente en el cuerpo de la solicitud
    const { idUsuario, CUIT, domicilio, nombre, apellido, mail, telefono } =
      req.body;

    if (
      !idUsuario &&
      !CUIT &&
      !domicilio &&
      !nombre &&
      !apellido &&
      !mail &&
      !telefono
    ) {
      throw "No hay parámetros para actualizar";
    }

    // Busca el cliente por ID
    let cliente = await Clientes.findByPk(id);

    if (!cliente) {
      return res.status(404).send("Cliente no encontrado");
    }

    // Actualiza los campos del cliente
    await cliente.update({
      idUsuario: idUsuario ?? cliente.idUsuario,
      CUIT: CUIT ?? cliente.CUIT,
      domicilio: domicilio ?? cliente.domicilio,
      nombre: nombre ?? cliente.nombre,
      apellido: apellido ?? cliente.apellido,
      mail: mail ?? cliente.mail,
      telefono: telefono ?? cliente.telefono,
    });

    return res.status(200).send(cliente);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

const getClientesParaCotizar = async (req, res) => {
  try {
    const clientes = await Clientes.findAll({
      attributes: ["id", "nombre", "apellido", "mail", "CUIT"],
    });

    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los clientes" });
  }
};

module.exports = {
  getClientesAll,
  createCliente,
  getClientes,
  updateCliente,
  getClientesParaCotizar,
};
