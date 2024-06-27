const { HistorialCotizacion } = require("../db.js");

const getHistorialDetallePorUsuario = async (req, res) => {
  try {
    const { combinedValue } = req.body;

    if (!combinedValue) {
      return res.status(400).json({ error: "Se requiere el valor combinado" });
    }

    const idUsuario = combinedValue.slice(0, 1);
    const numeroCotizacion = combinedValue.slice(1);
    const formattedNumeroCotizacion = `00${idUsuario} - 0000${numeroCotizacion}`;

    const detalle = await HistorialCotizacion.findAll({
      where: {
        numeroCotizacion: formattedNumeroCotizacion,
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

module.exports = {
  getHistorialDetallePorUsuario,
};
