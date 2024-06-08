const { Cotizaciones } = require("../db.js");
const { Usuarios } = require("../db.js");

// Ruta POST para crear una nueva cotización
const createCotizacion = async (req, res) => {
  try {
    if (
      !req.body?.idUsuario ||
      !req.body?.idCliente ||
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

const getCotizaciones = async (req, res) => {
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

    let cotizaciones;

    // Si el usuario tiene el rol para ver todas las cotizaciones
    if (usuario.rol === true) {
      cotizaciones = await Cotizaciones.findAll();
    } else {
      // Si el usuario solo puede ver sus propias cotizaciones
      cotizaciones = await Cotizaciones.findAll({
        where: { idUsuario },
      });
    }

    return res.status(200).json(cotizaciones);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

module.exports = {
  createCotizacion,
  getCotizaciones,
};
