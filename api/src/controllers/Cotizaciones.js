const { Cotizaciones } = require("../db.js");
const { Usuarios } = require("../db.js");
const { Clientes } = require("../db.js");
const { Productos } = require("../db.js");
const { conn } = require("../db.js");

// FUNCION PARA CREAR UNA COTIZACION //
const createCotizacion = async (req, res) => {
  try {
    if (
      !req.body?.idUsuario ||
      !req.body?.idCliente ||
      !req.body?.idProducto ||
      !req.body?.anticipo ||
      !req.body?.saldoAFinanciar ||
      !req.body?.IVA ||
      !req.body?.moneda ||
      !req.body?.interes ||
      !req.body?.saldo ||
      !req.body?.saldoConInteres ||
      !req.body?.PrecioFinal ||
      !req.body?.estado
    )
      throw "Faltan parámetros en el cuerpo de la solicitud";

    const generateNewId = async () => {
      const maxId = await Cotizaciones.max("id");
      const newId = maxId ? maxId + 1 : 1;
      return newId;
    };

    let id = await generateNewId();

    let nuevaCotizacion = await Cotizaciones.create({ id, ...req.body });

    return res.status(201).send(nuevaCotizacion);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

//TRAE TODOS LAS COTIZACIONES SI EL USUARIO ES ADMIN, SINO SOLO LAS COTIZACIONES QUE CARGO ESE USUARIO //

const getCotizaciones = async (req, res) => {
  try {
    // Verificar si se proporciona el ID de usuario
    const idUsuario = req.body?.idUsuario;
    if (!idUsuario) {
      throw "Se requiere el ID de usuario";
    }

    // Buscar el usuario en la base de datos
    const usuario = await Usuarios.findByPk(idUsuario);
    if (!usuario) {
      throw "Usuario no encontrado";
    }

    // Obtener las cotizaciones según el rol del usuario
    let cotizaciones;
    if (usuario.rol === true) {
      cotizaciones = await Cotizaciones.findAll({
        include: [
          { model: Usuarios, attributes: ["nombre", "apellido", "email"] },
          { model: Clientes, attributes: ["nombre", "apellido", "mail"] },
          { model: Productos, attributes: ["familia", "marca", "modelo"] },
        ],
      });
    } else {
      cotizaciones = await Cotizaciones.findAll({
        where: { idUsuario },
        include: [
          { model: Usuarios, attributes: ["nombre", "apellido", "email"] },
          { model: Clientes, attributes: ["nombre", "apellido", "mail"] },
          { model: Productos, attributes: ["familia", "marca", "modelo"] },
        ],
      });
    }

    // Devolver las cotizaciones
    return res.status(200).json(cotizaciones);
  } catch (error) {
    console.error("Error al obtener cotizaciones:", error);
    return res.status(400).send(error);
  }
};

// SOLO LO VE EL ADMINISTRADOR //

// FUNCION QUE MUESTRA LA CANTIDAD DE COTIZACIONES DEL VENDEDOR//

const getCantidadCotizacionesPorUsuario = async (req, res) => {
  try {
    // Consulta para contar la cantidad de cotizaciones por usuario
    const cantidadCotizacionesPorUsuario = await Cotizaciones.findAll({
      attributes: [
        [conn.fn("COUNT", conn.col("Cotizaciones.id")), "cantidadCotizaciones"],
        [conn.col("Usuario.id"), "idUsuario"],
        [conn.col("Usuario.nombre"), "nombre"],
        [conn.col("Usuario.apellido"), "apellido"],
      ],
      include: [{ model: Usuarios, attributes: [] }],
      group: ["Usuario.id"],
    });

    return res.status(200).json(cantidadCotizacionesPorUsuario);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

// FUNCION PARA MODIFICAR COTIZACIONES //

const putCotizaciones = async (req, res) => {
  try {
    const { id, ...updatedFields } = req.body;

    if (!id) {
      return res
        .status(400)
        .send("Se requiere un ID válido para actualizar la cotizacion.");
    }

    let cotizacion = await Cotizaciones.findOne({ where: { id } });

    if (!cotizacion) {
      return res.status(404).send("No se encontró el producto.");
    }

    await cotizacion.update(updatedFields);

    await cotizacion.reload();

    return res.send(cotizacion);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error interno del servidor.");
  }
};

module.exports = {
  createCotizacion,
  getCotizaciones,
  getCantidadCotizacionesPorUsuario,
  putCotizaciones,
};
