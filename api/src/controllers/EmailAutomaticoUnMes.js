const cron = require("node-cron");
const { Clientes, Cotizaciones, Productos } = require("../db.js");
const { Op } = require("sequelize");
const sendEmailWithTemplate = require("../mailer/sendEmailWithTemplate");

console.log("Archivo con cron job ejecutado");
// Tarea programada para ejecutarse diariamente a las 00:00
cron.schedule("*/1 * * * *", async () => {
  console.log("Cron job ejecutado");
  // Ejecutar cada minuto para pruebas
  try {
    const unMinutoAtras = new Date();
    unMinutoAtras.setMinutes(unMinutoAtras.getMinutes() - 1); // Ajustado para pruebas rápidas

    // Para producción, descomenta las siguientes líneas y comenta las líneas de prueba
    /*
      const unMesAtras = new Date();
      unMesAtras.setMonth(unMesAtras.getMonth() - 1);
      */

    // Buscar cotizaciones que no han sido modificadas o vendidas en el último minuto (para pruebas)
    const cotizacionesInactivas = await Cotizaciones.findAll({
      where: {
        fechaDeCreacion: {
          [Op.or]: {
            [Op.lt]: unMinutoAtras,
            [Op.is]: null,
          },
        },
        fechaModi: {
          [Op.or]: {
            [Op.lt]: unMinutoAtras,
            [Op.is]: null,
          },
        },
        fechaVenta: {
          [Op.or]: {
            [Op.lt]: unMinutoAtras,
            [Op.is]: null,
          },
        },
      },
      include: [
        {
          model: Clientes,
          attributes: ["mail", "nombre"],
        },
        {
          model: Productos,
          attributes: ["familia", "marca", "modelo"],
        },
      ],
    });

    // Enviar un correo electrónico a cada cliente con cotizaciones inactivas
    for (let cotizacion of cotizacionesInactivas) {
      const cliente = cotizacion.Cliente;
      const producto = cotizacion.Producto;

      if (cliente && producto) {
        // Configurar los detalles del correo usando la plantilla
        const emailContent = {
          nombreCliente: cliente.nombre,
          familia: producto.familia,
          marca: producto.marca,
          modelo: producto.modelo,
        };

        // Enviar el correo con la plantilla
        await sendEmailWithTemplate(
          cliente.mail,
          "UsuarioCotizacionUnMes",
          emailContent
        );
        console.log(
          `Correo enviado a ${cliente.mail} para el producto ${producto.marca} ${producto.modelo}`
        );
      }
    }
  } catch (error) {
    console.error("Error al enviar correos de recordatorio:", error);
  }
});
