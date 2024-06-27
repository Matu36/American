const { Cotizaciones } = require("../db.js");
const { Usuarios } = require("../db.js");
const { Clientes } = require("../db.js");
const { Productos } = require("../db.js");
const { HistorialCotizacion } = require("../db.js");
const { conn } = require("../db.js");

// FUNCION PARA CREAR UNA COTIZACION //
const createCotizacion = async (req, res) => {
  try {
    const {
      idUsuario,
      idCliente,
      idProducto,
      IVA,
      moneda,
      PrecioFinal,
      precio,
      anticipo,
      saldoAFinanciar,
      interes,
      saldo,
      saldoConInteres,
      nombreCliente,
      apellidoCliente,
      mailCliente,
      familia,
      marca,
      modelo,
    } = req.body;

    if (
      !idUsuario ||
      !idCliente ||
      !idProducto ||
      !IVA ||
      !moneda ||
      !PrecioFinal
    ) {
      throw "Faltan parámetros en el cuerpo de la solicitud";
    }

    const generateNewId = async () => {
      const maxId = await Cotizaciones.max("id");
      const newId = maxId ? maxId + 1 : 1;
      return newId;
    };

    let id = await generateNewId();

    // Formatear idUsuario y idCotizacion
    const formattedIdUsuario = String(idUsuario).padStart(3, "0");
    const formattedIdCotizacion = String(id).padStart(5, "0");
    const numeroCotizacion = `${formattedIdUsuario} - ${formattedIdCotizacion}`;

    let nuevaCotizacion = await Cotizaciones.create({
      id,
      idUsuario,
      idCliente,
      idProducto,
      numeroCotizacion,
      precio,
      anticipo,
      saldoAFinanciar,
      IVA,
      moneda,
      interes,
      saldo,
      saldoConInteres,
      PrecioFinal,
      estado: 1,
      fechaDeCreacion: new Date(),
      fechaModi: new Date(),
      fechaVenta: null,
    });

    const cliente = await Clientes.findOne({
      where: { id: idCliente },
      attributes: ["nombre", "apellido", "mail"],
    });

    // Obtener datos del producto
    const producto = await Productos.findOne({
      where: { id: idProducto },
      attributes: ["familia", "marca", "modelo"],
    });

    if (!cliente || !producto) {
      throw "No se pudieron obtener los datos del cliente o del producto";
    }

    // Crear una nueva entrada en HistorialCotizacion
    await HistorialCotizacion.create({
      numeroCotizacion: nuevaCotizacion.numeroCotizacion,
      precio: nuevaCotizacion.precio,
      anticipo: nuevaCotizacion.anticipo,
      saldoAFinanciar: nuevaCotizacion.saldoAFinanciar,
      IVA: nuevaCotizacion.IVA,
      moneda: nuevaCotizacion.moneda,
      interes: nuevaCotizacion.interes,
      saldo: nuevaCotizacion.saldo,
      saldoConInteres: nuevaCotizacion.saldoConInteres,
      PrecioFinal: nuevaCotizacion.PrecioFinal,
      fechaDeCreacion: nuevaCotizacion.fechaDeCreacion,
      fechaModi: nuevaCotizacion.fechaModi,
      nombreCliente: cliente.nombre,
      apellidoCliente: cliente.apellido,
      mailCliente: cliente.mail,
      familia: producto.familia,
      marca: producto.marca,
      modelo: producto.modelo,
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
        .send("Se requiere un ID válido para actualizar la cotización.");
    }

    let cotizacion = await Cotizaciones.findOne({ where: { id } });

    if (!cotizacion) {
      return res.status(404).send("No se encontró la cotización.");
    }

    updatedFields.fechaModi = new Date();

    await cotizacion.update(updatedFields);

    // Obtener datos del cliente
    const cliente = await Clientes.findOne({
      where: { id: cotizacion.idCliente },
      attributes: ["nombre", "apellido", "mail"],
    });

    // Obtener datos del producto
    const producto = await Productos.findOne({
      where: { id: cotizacion.idProducto },
      attributes: ["familia", "marca", "modelo"],
    });

    if (!cliente || !producto) {
      throw "No se pudieron obtener los datos del cliente o del producto";
    }

    // Crear una nueva entrada en HistorialCotizacion
    await HistorialCotizacion.create({
      numeroCotizacion: cotizacion.numeroCotizacion,
      precio: cotizacion.precio,
      anticipo: cotizacion.anticipo,
      saldoAFinanciar: cotizacion.saldoAFinanciar,
      IVA: cotizacion.IVA,
      moneda: cotizacion.moneda,
      interes: cotizacion.interes,
      saldo: cotizacion.saldo,
      saldoConInteres: cotizacion.saldoConInteres,
      PrecioFinal: cotizacion.PrecioFinal,
      fechaDeCreacion: cotizacion.fechaDeCreacion,
      fechaModi: updatedFields.fechaModi,
      nombreCliente: cliente.nombre,
      apellidoCliente: cliente.apellido,
      mailCliente: cliente.mail,
      familia: producto.familia,
      marca: producto.marca,
      modelo: producto.modelo,
    });

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

    let cotizacion = await Cotizaciones.findByPk(id);

    if (!cotizacion) {
      throw "Cotización no encontrada";
    }

    await cotizacion.update({ estado: 2, fechaVenta: new Date() });

    return res.status(200).send("La cotización se concretó con éxito.");
  } catch (error) {
    console.error(error);
    return res.status(400).send(error.toString());
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
        attributes: ["id", "PrecioFinal", "fechaDeCreacion", "moneda"],
        include: [
          { model: Usuarios, attributes: ["nombre", "apellido"] },
          { model: Clientes, attributes: ["nombre", "apellido", "mail"] },
          { model: Productos, attributes: ["familia", "marca", "modelo"] },
        ],
      });
    } else {
      cotizaciones = await Cotizaciones.findAll({
        where: { idUsuario, estado: 2 },
        attributes: ["id", "PrecioFinal", "fechaDeCreacion", "moneda"],
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

    let cotizacionesCotizaciones;
    let cotizacionesVentas;

    if (usuario.rol === true) {
      cotizacionesCotizaciones = await Cotizaciones.findAll({
        where: { estado: 1 },
      });
      cotizacionesVentas = await Cotizaciones.findAll({
        where: { estado: 2 },
      });
    } else {
      cotizacionesCotizaciones = await Cotizaciones.findAll({
        where: { idUsuario, estado: 1 },
      });
      cotizacionesVentas = await Cotizaciones.findAll({
        where: { idUsuario, estado: 2 },
      });
    }

    const result = {
      COTIZACIONES: {
        totalPesos: 0,
        totalUSD: 0,
        CANTIDADTOTAL: cotizacionesCotizaciones.length,
      },
      VENTAS: {
        totalPesos: 0,
        totalUSD: 0,
        CANTIDADTOTAL: cotizacionesVentas.length,
      },
    };

    cotizacionesCotizaciones.forEach((cotizacion) => {
      const { PrecioFinal, moneda } = cotizacion;
      const precioFinal = parseFloat(PrecioFinal);

      if (moneda === "$") {
        result.COTIZACIONES.totalPesos += precioFinal;
      } else if (moneda === "USD") {
        result.COTIZACIONES.totalUSD += precioFinal;
      }
    });

    cotizacionesVentas.forEach((cotizacion) => {
      const { PrecioFinal, moneda } = cotizacion;
      const precioFinal = parseFloat(PrecioFinal);

      if (moneda === "$") {
        result.VENTAS.totalPesos += precioFinal;
      } else if (moneda === "USD") {
        result.VENTAS.totalUSD += precioFinal;
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
