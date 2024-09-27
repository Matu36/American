const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { NODEMAILER_HOST, NODEMAILER_PORT, NODEMAILER_USER, NODEMAILER_PASS } =
  process.env;
const jwt = require("../services/jwt.js");
const { JWTSECRET } = process.env;
const { MailsMasivos } = require("../db.js");
const mailsMasivos = require("../mailer/templates/mailsMasivos.js");
const cotizacionEmail = require("../mailer/templates/Cotizacion.js");
const { Cotizaciones } = require("../db.js");
const { CotizacionIndividual } = require("../db.js");

const enviarCotizacionPorEmail = async (req, res) => {
  try {
    const { emailEmisor, emailReceptor, idCotizacion, password } = req.body;

    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Token de autenticación requerido." });
    }

    const decodedToken = jwt.decodeToken(
      token.replace("Bearer ", ""),
      JWTSECRET
    );
    const email = decodedToken.email;
    const hashedPassword = decodedToken.password;

    if (!emailEmisor || !emailReceptor) {
      return res
        .status(400)
        .json({ error: "Emisor y receptor son requeridos." });
    }

    if (!password) {
      return res.status(400).json({ error: "La contraseña es requerida." });
    }

    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Credenciales no válidas." });
    }

    // Obtener la cotización y su relación con CotizacionIndividual
    const cotizacion = await Cotizaciones.findOne({
      where: { id: idCotizacion },
      include: [{ model: CotizacionIndividual }],
    });

    if (!cotizacion) {
      return res.status(404).json({ error: "Cotización no encontrada." });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: email,
        pass: password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const emailOptions = {
      from: emailEmisor,
      to: emailReceptor,
      subject: "Cotización Detallada",
      html: cotizacionEmail(cotizacion),
    };

    await transporter.sendMail(emailOptions);

    return res.status(201).json({
      message: "Cotización enviada exitosamente.",
    });
  } catch (error) {
    console.error("Error al enviar la cotización:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

const enviarMailsMasivos = async (req, res) => {
  try {
    const { emailEmisor, emailsReceptores, cuerpoMensaje, password } = req.body;

    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Token de autenticación requerido." });
    }

    const decodedToken = jwt.decodeToken(
      token.replace("Bearer ", ""),
      JWTSECRET
    );

    const email = decodedToken.email;
    const hashedPassword = decodedToken.password;
    console.log("Email:", email, "Hashed Password:", hashedPassword);

    if (!emailEmisor || !emailsReceptores || emailsReceptores.length === 0) {
      return res
        .status(400)
        .json({ error: "Emisor y receptores son requeridos." });
    }

    if (!password) {
      return res.status(400).json({ error: "La contraseña es requerida." });
    }

    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Credenciales no válidas." });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: email,
        pass: password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const correosMasivos = emailsReceptores.map((emailReceptor) => ({
      emailEmisor,
      emailReceptor,
      cuerpoMensaje,
    }));

    const resultado = await MailsMasivos.bulkCreate(correosMasivos, {
      ignoreDuplicates: true,
    });

    const sendEmailWithTemplate = (to, cuerpoMensaje) => {
      const emailOptions = {
        from: emailEmisor,
        to,
        subject: "NOTIFICACIONES / OFERTAS",
        html: mailsMasivos(cuerpoMensaje),
      };

      return transporter.sendMail(emailOptions);
    };

    await Promise.all(
      correosMasivos.map(({ emailReceptor }) =>
        sendEmailWithTemplate(emailReceptor, cuerpoMensaje)
      )
    );

    return res.status(201).json({
      message: "Correos enviados exitosamente.",
      resultado,
    });
  } catch (error) {
    console.error("Error al enviar correos masivos:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  enviarMailsMasivos,
  enviarCotizacionPorEmail,
};
