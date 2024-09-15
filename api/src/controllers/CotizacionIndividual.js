const { CotizacionIndividual } = require("../db.js");

const eliminarCotizacionIndividual = async (req, res) => {
  try {
    const { idCotizacionIndividual } = req.body;

    if (!idCotizacionIndividual) {
      return res
        .status(400)
        .send({ error: "Se requiere el ID de la cotización individual" });
    }

    const cotizacionIndividual = await CotizacionIndividual.findByPk(
      idCotizacionIndividual
    );

    // Verificar si la cotización individual existe
    if (!cotizacionIndividual) {
      return res
        .status(404)
        .send({ error: "Cotización individual no encontrada" });
    }

    await CotizacionIndividual.destroy({
      where: { id: idCotizacionIndividual },
    });

    return res
      .status(200)
      .send({ message: "Cotización individual eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar cotización individual:", error);
    return res.status(500).send({
      error: error.message || "Error al eliminar cotización individual",
    });
  }
};

module.exports = {
  eliminarCotizacionIndividual,
};
