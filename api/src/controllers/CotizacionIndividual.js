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

const actualizarEstadoCotizacionIndividualEstado2 = async (req, res) => {
  try {
    const { id } = req.body;

    // Verifica si se envió el idCotizacionIndividual
    if (!id) {
      return res
        .status(400)
        .send({ error: "Se requiere el ID de la cotización individual" });
    }

    // Busca la cotización individual por su id
    const cotizacionIndividual = await CotizacionIndividual.findByPk(id);

    // Verifica si la cotización individual existe
    if (!cotizacionIndividual) {
      return res
        .status(404)
        .send({ error: "Cotización individual no encontrada" });
    }

    // Actualiza el estado a 3
    await cotizacionIndividual.update({ estado: 2 });

    return res.status(200).send({
      message:
        "Estado de la cotización individual actualizado a 2 correctamente",
      cotizacion: cotizacionIndividual,
    });
  } catch (error) {
    console.error(
      "Error al actualizar el estado de la cotización individual:",
      error
    );
    return res.status(500).send({
      error:
        error.message ||
        "Error al actualizar el estado de la cotización individual",
    });
  }
};

const actualizarEstadoCotizacionIndividualEstado3 = async (req, res) => {
  try {
    const { id } = req.body;

    // Verifica si se envió el idCotizacionIndividual
    if (!id) {
      return res
        .status(400)
        .send({ error: "Se requiere el ID de la cotización individual" });
    }

    // Busca la cotización individual por su id
    const cotizacionIndividual = await CotizacionIndividual.findByPk(id);

    // Verifica si la cotización individual existe
    if (!cotizacionIndividual) {
      return res
        .status(404)
        .send({ error: "Cotización individual no encontrada" });
    }

    // Actualiza el estado a 3
    await cotizacionIndividual.update({ estado: 3 });

    return res.status(200).send({
      message:
        "Estado de la cotización individual actualizado a 3 correctamente",
      cotizacion: cotizacionIndividual,
    });
  } catch (error) {
    console.error(
      "Error al actualizar el estado de la cotización individual:",
      error
    );
    return res.status(500).send({
      error:
        error.message ||
        "Error al actualizar el estado de la cotización individual",
    });
  }
};

module.exports = {
  eliminarCotizacionIndividual,
  actualizarEstadoCotizacionIndividualEstado2,
  actualizarEstadoCotizacionIndividualEstado3,
};
