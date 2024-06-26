const {
  Usuarios,
  Productos,
  Clientes,
  Cotizaciones,
  HistorialCotizacion,
} = require("../db.js");

function formatNumeroCotizacion(idUsuario, numeroCotizacion) {
  // Convertimos idUsuario y numeroCotizacion a string
  const usuarioString = idUsuario.toString().padStart(3, "0"); // Pone 0s delante para asegurarse de que tiene al menos 3 dígitos
  const cotizacionString = numeroCotizacion.toString().padStart(5, "0"); // Pone 0s delante para asegurarse de que tiene al menos 5 dígitos

  // Formateamos el número de cotización
  return `${usuarioString} - ${cotizacionString}`;
}

const getHistorialDetallePorUsuario = async (req, res) => {
  try {
    const { combinedValue } = req.body;

    if (!combinedValue) {
      return res.status(400).json({ error: "Se requiere el valor combinado" });
    }

    // Extract the user ID and the quotation number from the combined value
    const idUsuario = combinedValue.slice(0, 1); // Assuming the user ID is always 1 digit
    const numeroCotizacion = combinedValue.slice(1); // The rest is the quotation number

    const detalle = await HistorialCotizacion.findAll({
      include: [
        {
          model: Cotizaciones,
          where: {
            numeroCotizacion: `00${idUsuario} - 0000${numeroCotizacion}`,
          },
          attributes: { exclude: ["createdAt", "updatedAt"] },
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
