const {
  Usuarios,
  Productos,
  Clientes,
  Cotizaciones,
  HistorialCotizacion,
} = require("../db.js");

const getHistorialDetallePorUsuario = async (req, res) => {
  try {
    const { idUsuario } = req.params;

    if (!idUsuario) {
      return res.status(400).json({ error: "Se requiere el ID de usuario" });
    }

    const detalle = await HistorialCotizacion.findAll({
      where: {
        idCotizacion: idUsuario, // Considerando que idUsuario está dentro de idCotizacion
      },
      include: [
        {
          model: Cotizaciones,
          include: [
            {
              model: Usuarios,
              attributes: ["nombre", "apellido"],
            },
            {
              model: Productos,
              attributes: ["modelo"],
            },
            {
              model: Clientes,
              attributes: ["nombre", "apellido"],
            },
          ],
        },
      ],
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
