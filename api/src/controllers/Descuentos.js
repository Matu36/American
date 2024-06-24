const { Descuentos } = require("../db.js");

const createDescuento = async (req, res) => {
  try {
    const { nombreCompleto, email, telefonoCelular, direccion } = req.body;
    if (!nombreCompleto || !email || !telefonoCelular) {
      throw "Faltan parámetros obligatorios en el cuerpo de la solicitud";
    }

    const nuevoDescuento = await Descuentos.create({
      nombreCompleto,
      email,
      telefonoCelular,
      direccion,
      estado: "activo",
    });

    return res.status(201).json(nuevoDescuento);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

const getDescuentos = async (req, res) => {
  try {
    const descuentos = await Descuentos.findAll();

    return res.status(200).json(descuentos);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

const getDescuentoById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send("Se requiere el ID del descuento");
    }

    const descuento = await Descuentos.findByPk(id);

    if (!descuento) {
      return res.status(404).send("descuento no encontrado");
    }

    return res.status(200).json(descuento);
  } catch (error) {
    console.error("Error al obtener el descuento:", error);
    return res.status(500).send("Error al obtener el descuento");
  }
};

// ESTADO "activo"= NO LEIDO    ESTADO "expirado": LEIDO

const updateDescuentoState = async (req, res) => {
  try {
    const { idDescuento } = req.body;

    if (!idDescuento) {
      throw "Se requiere el ID del descuento";
    }

    const descuento = await Descuentos.findByPk(idDescuento);

    if (!descuento) {
      throw "Descuento no encontrado";
    }

    await descuento.update({ estado: "expirado" });

    return res.status(200).json({ descuento });
  } catch (error) {
    console.error("Error al actualizar el estado del descuento:", error);
    return res
      .status(400)
      .json({ error: "Error al actualizar el estado del descuento" });
  }
};

const countActiveDiscounts = async (req, res) => {
  try {
    const activeDiscountsCount = await Descuentos.count({
      where: {
        estado: "activo",
      },
    });

    return res.status(200).json({ activeDiscountsCount });
  } catch (error) {
    console.error("Error al contar los descuentos activos:", error);
    return res
      .status(500)
      .json({ error: "Error al contar los descuentos activos" });
  }
};

module.exports = {
  createDescuento,
  getDescuentos,
  updateDescuentoState,
  countActiveDiscounts,
  getDescuentoById,
};
