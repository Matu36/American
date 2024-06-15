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

//SETEAR EL ESTADO EN 2 (ESTO QUIERE DECIR QUE LA COTIZACION SE CONCRETO) //
//VENTAS//

const updateCotizacionEstado = async (req, res) => {
  try {
    if (!req.body?.id) {
      throw "Se requiere el ID de la cotización";
    }

    const { id } = req.body;

    let cotizacion = await Cotizaciones.findByPk(id, {
      include: [
        { model: Productos, attributes: ["modelo"] },
        { model: Usuarios, attributes: ["nombre", "apellido"] },
        { model: Clientes, attributes: ["nombre", "apellido"] },
      ],
    });

    if (!cotizacion) {
      throw "Cotización no encontrada";
    }

    await cotizacion.update({ estado: 2, fechaVenta: new Date() });

    return res.status(200).send(cotizacion);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

// SUMA EL PRECIO FINAL DE TODAS LAS COTIZACIONES DISCRIMINADO EN PESOS Y DOLARES //

const sumarPreciosFinales = async (req, res) => {
  try {
    const sumaPreciosFinalesUSD = await Cotizaciones.sum("PrecioFinal", {
      where: { moneda: "USD" },
    });

    const sumaPreciosFinalesARS = await Cotizaciones.sum("PrecioFinal", {
      where: { moneda: "$" },
    });

    return res.status(200).json({
      sumaPreciosFinalesUSD,
      sumaPreciosFinalesARS,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

//ESTA FUNCION SUMA LAS VENTAS TOTALES, LE TRAE EL TOTAL AL ADMIN, Y EL TOTAL DE SUS VENTAS AL VENDEDOR //

const sumarPreciosFinalesPorMonedaYEstado = async (req, res) => {
  try {
    const idUsuario = req.body.idUsuario;
    const usuario = await Usuarios.findByPk(idUsuario);
    const esRolTrue = usuario.rol === true;

    let whereCondition = { estado: 2 };

    // Si el usuario no tiene rol true, limita la búsqueda a sus propias cotizaciones
    if (!esRolTrue) {
      whereCondition.idUsuario = idUsuario;
    }

    // Suma los valores de PrecioFinal para USD
    const sumaPreciosFinalesUSD = await Cotizaciones.sum("PrecioFinal", {
      where: { ...whereCondition, moneda: "USD" },
    });

    // Suma los valores de PrecioFinal para ARS
    const sumaPreciosFinalesARS = await Cotizaciones.sum("PrecioFinal", {
      where: { ...whereCondition, moneda: "$" },
    });

    return res.status(200).json({
      sumaPreciosFinalesUSD,
      sumaPreciosFinalesARS,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

// FUNCION QUE MUESTRA LAS VENTAS DE CADA USUARIO Y TODAS SI EL USUARIO ES ADMIN //

const getCotizacionesEstadoDos = async (req, res) => {
  try {
    const { idUsuario } = req.params;

    if (!idUsuario) {
      throw "Se requiere el ID de usuario";
    }

    // Buscar el usuario en la base de datos
    const usuario = await Usuarios.findByPk(idUsuario);
    if (!usuario) {
      throw "Usuario no encontrado";
    }

    // Obtener las cotizaciones con estado 2 según el rol del usuario
    let cotizaciones;
    if (usuario.rol === true) {
      cotizaciones = await Cotizaciones.findAll({
        where: { estado: 2 },
        include: [
          { model: Usuarios, attributes: ["nombre", "apellido", "email"] },
          { model: Clientes, attributes: ["nombre", "apellido", "mail"] },
          { model: Productos, attributes: ["familia", "marca", "modelo"] },
        ],
      });
    } else {
      cotizaciones = await Cotizaciones.findAll({
        where: { idUsuario, estado: 2 },
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
    console.error("Error al obtener cotizaciones con estado 2:", error);
    return res.status(400).send(error);
  }
};

module.exports = {
  createCotizacion,
  getCotizaciones,
  getCantidadCotizacionesPorUsuario,
  putCotizaciones,
  updateCotizacionEstado,
  sumarPreciosFinales,
  sumarPreciosFinalesPorMonedaYEstado,
  getCotizacionesEstadoDos,
};
