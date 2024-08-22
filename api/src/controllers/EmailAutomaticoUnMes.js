const cron = require("node-cron");
const { Clientes, Cotizaciones, Productos } = require("../db.js");
const { Op } = require("sequelize");
const sendEmailWithTemplate = require("../mailer/sendEmailWithTemplate");

const iniciarCronJob = () => {
  // Se ejecuta diariamente a las 00:00
  cron.schedule("0 0 * * *", async () => {
    // Ejecutar cada minuto para pruebas
    try {
      // const unMinutoAtras = new Date();
      // unMinutoAtras.setMinutes(unMinutoAtras.getMinutes() - 1);

      const unMesAtras = new Date();
      unMesAtras.setMonth(unMesAtras.getMonth() - 1);

      // Buscar cotizaciones inactivas
      const cotizacionesInactivas = await Cotizaciones.findAll({
        where: {
          fechaDeCreacion: {
            [Op.or]: {
              [Op.lt]: unMesAtras,
              [Op.is]: null,
            },
          },
          fechaModi: {
            [Op.or]: {
              [Op.lt]: unMesAtras,
              [Op.is]: null,
            },
          },
          fechaVenta: {
            [Op.or]: {
              [Op.lt]: unMesAtras,
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
};

// Exporta la función
module.exports = iniciarCronJob;
