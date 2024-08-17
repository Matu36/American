const { Clientes } = require("../db.js");
const { Usuarios } = require("../db.js");
const { JWTSECRET } = process.env;
const jwt = require("../services/jwt.js");
const { Op } = require("sequelize");
const { conn } = require("../db.js");

const createCliente = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({ error: "Token no proporcionado" });
    }

    const decodedToken = jwt.decodeToken(
      token.replace("Bearer ", ""),
      JWTSECRET
    );

    const idUsuario = decodedToken.id;
    if (
      !idUsuario ||
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

    let nuevoCliente = await Clientes.create({ id, ...req.body, idUsuario });

    return res.status(201).send(nuevoCliente);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

//TRAE TODOS LOS CLIENTES SI EL USUARIO ES ADMIN, SINO SOLO LOS CLIENTES QUE CARGO ESE USUARIO //

const getClientesPorIdDeUsuario = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({ error: "Token no proporcionado" });
    }

    const decodedToken = jwt.decodeToken(
      token.replace("Bearer ", ""),
      JWTSECRET
    );

    const idUsuario = decodedToken.id;

    // Busca el usuario en la base de datos
    const usuario = await Usuarios.findByPk(idUsuario);

    if (!usuario) {
      throw "Usuario no encontrado";
    }

    // Fecha límite: 3 meses atrás desde hoy
    const tresMesesAtras = new Date();
    tresMesesAtras.setMonth(tresMesesAtras.getMonth() - 3);

    let clientes;

    if (usuario.rol === true) {
      // Administrador: Ver todos los clientes
      clientes = await Clientes.findAll({
        attributes: [
          "id",
          "nombre",
          "apellido",
          "mail",
          "fechaDeCreacion",
          "CUIT",
          "razonSocial",
        ],
        include: [
          {
            model: Usuarios,
            attributes: [],
          },
        ],
        order: [["fechaDeCreacion", "DESC"]],
      });
    } else {
      // Vendedor: Ver clientes exclusivos y aquellos sin cotizaciones recientes
      clientes = await Clientes.findAll({
        where: {
          [Op.or]: [
            // Clientes a los que el vendedor ha realizado una cotización en los últimos 3 meses
            {
              id: {
                [Op.in]: conn.literal(
                  `(SELECT "idCliente" FROM "Cotizaciones"
                    WHERE "idUsuario" = '${idUsuario}' 
                    AND "fechaDeCreacion" > '${tresMesesAtras.toISOString()}')`
                ),
              },
            },
            // Clientes que no han tenido ninguna cotización en los últimos 3 meses
            {
              id: {
                [Op.in]: conn.literal(
                  `(SELECT "idCliente" FROM "Cotizaciones"
                    WHERE "fechaDeCreacion" <= '${tresMesesAtras.toISOString()}'
                    GROUP BY "idCliente"
                    HAVING COUNT("idCliente") = 0)`
                ),
              },
            },
          ],
        },
        attributes: [
          "id",
          "nombre",
          "apellido",
          "mail",
          "fechaDeCreacion",
          "CUIT",
          "razonSocial",
        ],
        include: [
          {
            model: Usuarios,
            attributes: [],
          },
        ],
        order: [["fechaDeCreacion", "DESC"]],
      });
    }

    // Devuelve los clientes encontrados
    return res.status(200).json(clientes);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    return res.status(400).send(error);
  }
};

const getClientePorId = async (req, res) => {
  try {
    // Verifica si se proporciona el ID del cliente desde los parámetros de la ruta
    if (!req.params.idCliente) {
      throw "Se requiere el ID de cliente";
    }

    const idCliente = req.params.idCliente;

    // Busca el cliente en la base de datos por su ID
    const cliente = await Clientes.findByPk(idCliente, {
      include: [
        {
          model: Usuarios,
          attributes: ["nombre", "apellido"],
        },
      ],
    });

    if (!cliente) {
      throw "Cliente no encontrado";
    }

    // Devuelve la información del cliente encontrado
    return res.status(200).json(cliente);
  } catch (error) {
    console.error("Error al obtener cliente:", error);
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
      fechaModi: new Date(),
    });

    return res.status(200).send(cliente);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

const getClientesParaCotizar = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({ error: "Token no proporcionado" });
    }

    const decodedToken = jwt.decodeToken(
      token.replace("Bearer ", ""),
      JWTSECRET
    );

    const idUsuario = decodedToken.id;

    const usuario = await Usuarios.findByPk(idUsuario, { attributes: ["rol"] });

    if (!usuario) {
      throw "Usuario no encontrado";
    }

    // Fecha límite: 3 meses atrás desde hoy
    const tresMesesAtras = new Date();
    tresMesesAtras.setMonth(tresMesesAtras.getMonth() - 3);

    let clientes;

    if (usuario.rol === true) {
      // Administrador: Ver todos los clientes
      clientes = await Clientes.findAll({
        attributes: ["id", "nombre", "apellido", "mail", "CUIT"],
      });
    } else {
      // Vendedor: Ver clientes exclusivos y aquellos sin cotizaciones recientes
      clientes = await Clientes.findAll({
        where: {
          [Op.or]: [
            // Clientes a los que el usuario ha realizado una cotización en los últimos 3 meses
            {
              id: {
                [Op.in]: conn.literal(
                  `(SELECT "idCliente" FROM "Cotizaciones"
                    WHERE "idUsuario" = '${idUsuario}' 
                    AND "fechaDeCreacion" > '${tresMesesAtras.toISOString()}')`
                ),
              },
            },
            // Clientes que no tienen cotizaciones recientes (más de 3 meses) y no están asociados a otros usuarios
            {
              id: {
                [Op.notIn]: conn.literal(
                  `(SELECT "idCliente" FROM "Cotizaciones"
                    WHERE "fechaDeCreacion" > '${tresMesesAtras.toISOString()}')`
                ),
              },
            },
          ],
        },
        attributes: ["id", "nombre", "apellido", "mail", "CUIT"],
      });
    }

    res.json(clientes);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener los clientes para cotizar" });
  }
};

module.exports = {
  createCliente,
  getClientesPorIdDeUsuario,
  updateCliente,
  getClientesParaCotizar,
  getClientePorId,
};
