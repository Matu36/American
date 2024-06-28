const { HistorialCotizacion } = require("../db.js");
const { Op } = require("sequelize");

const getHistorialDetallePorUsuario = async (req, res) => {
  try {
    const { combinedValue } = req.body;

    if (!combinedValue) {
      return res.status(400).json({ error: "Se requiere el valor combinado" });
    }

    const idUsuario = combinedValue.slice(0, 1);
    const numeroCotizacion = combinedValue.slice(1);

    const formattedNumeroCotizacion1 = `00${idUsuario} - 0000${numeroCotizacion}`;
    const formattedNumeroCotizacion2 = `00${idUsuario} - 000${numeroCotizacion}`;
    const formattedNumeroCotizacion3 = `00${idUsuario} - 00${numeroCotizacion}`;
    const formattedNumeroCotizacion4 = `00${idUsuario} - 0${numeroCotizacion}`;
    const formattedNumeroCotizacion5 = `00${idUsuario} - ${numeroCotizacion}`;
    const formattedNumeroCotizacion6 = `0${idUsuario} - 0000${numeroCotizacion}`;
    const formattedNumeroCotizacion7 = `0${idUsuario} - 000${numeroCotizacion}`;
    const formattedNumeroCotizacion8 = `0${idUsuario} - 00${numeroCotizacion}`;
    const formattedNumeroCotizacion9 = `0${idUsuario} - 0${numeroCotizacion}`;
    const formattedNumeroCotizacion10 = `0${idUsuario} - ${numeroCotizacion}`;

    const detalle = await HistorialCotizacion.findAll({
      where: {
        [Op.or]: [
          { numeroCotizacion: formattedNumeroCotizacion1 },
          { numeroCotizacion: formattedNumeroCotizacion2 },
          { numeroCotizacion: formattedNumeroCotizacion3 },
          { numeroCotizacion: formattedNumeroCotizacion4 },
          { numeroCotizacion: formattedNumeroCotizacion5 },
          { numeroCotizacion: formattedNumeroCotizacion6 },
          { numeroCotizacion: formattedNumeroCotizacion7 },
          { numeroCotizacion: formattedNumeroCotizacion8 },
          { numeroCotizacion: formattedNumeroCotizacion9 },
          { numeroCotizacion: formattedNumeroCotizacion10 },
        ],
      },
    });

    if (!detalle || detalle.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontraron detalles para este usuario" });
    }

    return res.status(200).json(detalle);
  } catch (error) {
    console.error("Error al obtener el detalle por usuario:", error);
    return res
      .status(500)
      .json({ error: "Error al obtener el detalle por usuario" });
  }
};

module.exports = {
  getHistorialDetallePorUsuario,
};
