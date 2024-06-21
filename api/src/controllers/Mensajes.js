const { Mensajes, Usuarios } = require("../db.js");
const { Op } = require("sequelize");

const createMessage = async (req, res) => {
  try {
    const { idUsuario, idDestino, Mensaje } = req.body;

    if (!idUsuario || !idDestino || !Mensaje) {
      throw "Faltan parámetros en el cuerpo de la solicitud";
    }

    const nuevoMensaje = await Mensajes.create({
      idUsuario,
      idDestino,
      Mensaje,
    });

    return res
      .status(201)
      .json({ message: "Mensaje creado correctamente", nuevoMensaje });
  } catch (error) {
    console.error("Error al crear mensaje:", error);
    return res.status(400).json({ error: "Error al crear mensaje" });
  }
};

const getMessagesByUserAndDestination = async (req, res) => {
  try {
    const { idUsuario } = req.body;

    if (!idUsuario) {
      throw "Se requiere el ID de usuario";
    }

    const mensajes = await Mensajes.findAll({
      where: {
        [Op.or]: [{ idUsuario }, { idDestino: idUsuario }],
      },
    });

    return res.status(200).json({ mensajes });
  } catch (error) {
    console.error("Error al obtener mensajes por usuario y destino:", error);
    return res
      .status(400)
      .json({ error: "Error al obtener mensajes por usuario y destino" });
  }
};

// FUNCION QUE CUENTA LOS MENSAJES NO LEIDOS DE CADA USUARIO SI EL ESTADO ES 1 (NO LEIDO)

const countMessagesByDestination = async (req, res) => {
  try {
    const { idUsuario } = req.params;

    if (!idUsuario) {
      throw "Se requiere el ID de usuario";
    }

    const count = await Mensajes.count({
      where: {
        estado: 1,
        idDestino: idUsuario,
      },
    });

    return res.status(200).json({ count });
  } catch (error) {
    console.error("Error al contar mensajes por destino:", error);
    return res
      .status(400)
      .json({ error: "Error al contar mensajes por destino" });
  }
};

// ESTADO 1= NO LEIDO    ESTADO 2: LEIDO

const updateMessageState = async (req, res) => {
  try {
    const { idMensaje } = req.body;

    if (!idMensaje) {
      throw "Se requiere el ID del mensaje";
    }

    const mensaje = await Mensajes.findByPk(idMensaje);

    if (!mensaje) {
      throw "Mensaje no encontrado";
    }

    await mensaje.update({ estado: 2 });

    return res.status(200).json({ mensaje });
  } catch (error) {
    console.error("Error al actualizar el estado del mensaje:", error);
    return res
      .status(400)
      .json({ error: "Error al actualizar el estado del mensaje" });
  }
};

const getMensajesByUsuario = async (req, res) => {
  try {
    const { idUsuario } = req.params;

    if (!idUsuario) {
      return res.status(400).json({ error: "Se requiere el ID de usuario" });
    }

    const mensajes = await Mensajes.findAll({
      where: {
        idUsuario: idUsuario,
      },
      include: [
        {
          model: Usuarios,

          attributes: ["email"],
        },
      ],
    });

    if (!mensajes || mensajes.length === 0) {
      return res.status(404).json({ error: "No se encontraron mensajes" });
    }

    return res.status(200).json(mensajes);
  } catch (error) {
    console.error("Error al obtener los mensajes:", error);
    return res.status(500).json({ error: "Error al obtener los mensajes" });
  }
};

const getMensajesByDestino = async (req, res) => {
  try {
    const { idUsuario } = req.params;

    if (!idUsuario) {
      return res.status(400).json({ error: "Se requiere el ID de usuario" });
    }

    const mensajes = await Mensajes.findAll({
      where: {
        idDestino: idUsuario,
      },
      include: [
        {
          model: Usuarios,

          attributes: ["email"],
        },
      ],
    });

    if (!mensajes || mensajes.length === 0) {
      return res.status(404).json({ error: "No se encontraron mensajes" });
    }

    return res.status(200).json(mensajes);
  } catch (error) {
    console.error("Error al obtener los mensajes:", error);
    return res.status(500).json({ error: "Error al obtener los mensajes" });
  }
};
module.exports = {
  createMessage,
  getMessagesByUserAndDestination,
  updateMessageState,
  countMessagesByDestination,
  getMensajesByUsuario,
  getMensajesByDestino,
};
