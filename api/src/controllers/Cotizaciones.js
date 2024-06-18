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
      !req.body?.IVA ||
      !req.body?.moneda ||
      !req.body?.PrecioFinal
    ) {
      throw "Faltan parámetros en el cuerpo de la solicitud";
    }

    const generateNewId = async () => {
      const maxId = await Cotizaciones.max("id");
      const newId = maxId ? maxId + 1 : 1;
      return newId;
    };

    let id = await generateNewId();
    const idUsuario = req.body.idUsuario;

    // Formatear idUsuario y idCotizacion
    const formattedIdUsuario = String(idUsuario).padStart(3, "0");
    const formattedIdCotizacion = String(id).padStart(5, "0");
    const numeroCotizacion = `${formattedIdUsuario} - ${formattedIdCotizacion}`;

    let nuevaCotizacion = await Cotizaciones.create({
      id,
      ...req.body,
      estado: 1,
      numeroCotizacion,
    });

    return res.status(201).send(nuevaCotizacion);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

//TRAE TODOS LAS COTIZACIONES SI EL USUARIO ES ADMIN, SINO SOLO LAS COTIZACIONES QUE CARGO ESE USUARIO //

const getCotizaciones = async (req, res) => {
  try {
    // Verificar si se proporciona el ID de usuario desde los parámetros de la ruta
    const idUsuario = req.params.idUsuario;
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
        attributes: ["numeroCotizacion", "PrecioFinal", "fechaDeCreacion"],
        include: [
          { model: Usuarios, attributes: ["nombre", "apellido", "email"] },
          { model: Clientes, attributes: ["nombre", "apellido", "mail"] },
          { model: Productos, attributes: ["familia", "marca", "modelo"] },
        ],
      });
    } else {
      cotizaciones = await Cotizaciones.findAll({
        where: { idUsuario },
        attributes: [
          "id",
          "numeroCotizacion",
          "PrecioFinal",
          "fechaDeCreacion",
        ],
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

// DETALLE DE LA COTIZACION POR ID DE COTI //

const getCotizacionDetalle = async (req, res) => {
  try {
    // Verificar si se proporciona el ID de cotización desde los parámetros de la ruta
    const idCotizacion = req.params.idCotizacion;
    if (!idCotizacion) {
      throw "Se requiere el ID de cotización";
    }

    // Buscar la cotización en la base de datos
    const cotizacion = await Cotizaciones.findByPk(idCotizacion, {
      include: [
        { model: Usuarios, attributes: ["nombre", "apellido", "email"] },
        { model: Clientes, attributes: ["nombre", "apellido", "mail"] },
        { model: Productos, attributes: ["familia", "marca", "modelo"] },
      ],
    });

    // Verificar si se encontró la cotización
    if (!cotizacion) {
      throw "Cotización no encontrada";
    }

    // Devolver la cotización completa
    return res.status(200).json(cotizacion);
  } catch (error) {
    console.error("Error al obtener detalle de cotización:", error);
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
        attributes: ["id", "PrecioFinal", "fechaDeCreacion"],
        include: [
          { model: Usuarios, attributes: ["nombre", "apellido"] },
          { model: Clientes, attributes: ["nombre", "apellido", "mail"] },
          { model: Productos, attributes: ["familia", "marca", "modelo"] },
        ],
      });
    } else {
      cotizaciones = await Cotizaciones.findAll({
        where: { idUsuario, estado: 2 },
        attributes: ["id", "PrecioFinal", "fechaDeCreacion"],
        include: [
          { model: Usuarios, attributes: ["nombre", "apellido"] },
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

const getVentaById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw "Se requiere el ID de la cotización";
    }

    const cotizacion = await Cotizaciones.findByPk(id, {
      include: [
        { model: Usuarios, attributes: ["nombre", "apellido", "email"] },
        { model: Clientes, attributes: ["nombre", "apellido", "mail"] },
        { model: Productos, attributes: ["familia", "marca", "modelo"] },
      ],
    });

    if (!cotizacion) {
      throw "Cotización no encontrada";
    }

    // Devolver la cotización
    return res.status(200).json(cotizacion);
  } catch (error) {
    console.error("Error al obtener la cotización:", error);
    return res.status(400).send(error);
  }
};

// ULTIMAS 5 COTIZACIONES PARA MOSTRAR EN EL ADMIN HOME //

const getUltimasCotizaciones = async (req, res) => {
  try {
    const { idUsuario } = req.params;

    if (!idUsuario) {
      return res.status(400).json({ error: "Se requiere el ID de usuario" });
    }

    // Buscar el usuario en la base de datos
    const usuario = await Usuarios.findByPk(idUsuario);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Definir las condiciones de búsqueda
    let whereCondition = {};
    if (!usuario.rol) {
      whereCondition = { idUsuario };
    }

    // Obtener las últimas 5 cotizaciones
    const cotizaciones = await Cotizaciones.findAll({
      where: whereCondition,
      order: [["fechaDeCreacion", "DESC"]],
      limit: 5,
      include: [
        {
          model: Clientes,
          attributes: ["nombre", "apellido"],
        },
        {
          model: Productos,
          attributes: ["modelo"],
        },
      ],
      attributes: ["PrecioFinal"],
    });

    return res.status(200).json(cotizaciones);
  } catch (error) {
    console.error("Error al obtener cotizaciones:", error);
    return res.status(500).json({ error: "Error al obtener cotizaciones" });
  }
};

// FUNCION PARA EL ADMIN HOME QUE MUESTRA LA  SUMATORIA DE LAS COTIZACIONES, VENTAS Y CANTIDAD TOTAL
// DE COTIZACIONES (TODAS SI ES ADMIN Y POR VENDEDOR)

const getCotizacionesSum = async (req, res) => {
  try {
    const { idUsuario } = req.params;

    if (!idUsuario) {
      return res.status(400).json({ error: "Se requiere el ID de usuario" });
    }

    const usuario = await Usuarios.findByPk(idUsuario);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    let cotizaciones;
    if (usuario.rol === true) {
      cotizaciones = await Cotizaciones.findAll();
    } else {
      cotizaciones = await Cotizaciones.findAll({
        where: { idUsuario },
      });
    }

    const result = {
      COTIZACIONES: {
        totalPesos: 0,
        totalUSD: 0,
      },
      VENTAS: {
        totalPesos: 0,
        totalUSD: 0,
      },
      CANTIDADTOTAL: cotizaciones.length,
    };

    cotizaciones.forEach((cotizacion) => {
      const { PrecioFinal, moneda, estado } = cotizacion;
      const precioFinal = parseFloat(PrecioFinal);

      if (estado === 1) {
        if (moneda === "$") {
          result.COTIZACIONES.totalPesos += precioFinal;
        } else if (moneda === "USD") {
          result.COTIZACIONES.totalUSD += precioFinal;
        }
      } else if (estado === 2) {
        if (moneda === "$") {
          result.VENTAS.totalPesos += precioFinal;
        } else if (moneda === "USD") {
          result.VENTAS.totalUSD += precioFinal;
        }
      }
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error al obtener las sumatorias de cotizaciones:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  createCotizacion,
  getCotizaciones,
  getCantidadCotizacionesPorUsuario,
  getCotizacionDetalle,
  putCotizaciones,
  updateCotizacionEstado,
  sumarPreciosFinales,
  sumarPreciosFinalesPorMonedaYEstado,
  getCotizacionesEstadoDos,
  getVentaById,
  getUltimasCotizaciones,
  getCotizacionesSum,
};
