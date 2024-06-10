const { Usuarios } = require("../db.js");
const bcrypt = require("bcrypt");
const sendEmailWithTemplate = require("../mailer/sendEmailWithTemplate");
const jwt = require("../services/jwt.js");
const { Op } = require("sequelize");

const registro = async (req, res) => {
  try {
    if (!req.body?.email || !req.body?.password)
      throw "Missing email or password";

    //Validación para ver si el email ya esta registrado

    const existingUser = await Usuarios.findOne({
      where: { email: req.body.email.toLowerCase() },
    });
    if (existingUser) {
      return res
        .status(400)
        .send("El Email ingresado ya se encuentra registrado");
    }

    // Genera un hash para la contraseña
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const [instance, created] = await Usuarios.findOrCreate({
      where: { email: req.body.email.toLowerCase() },
      defaults: {
        password: hashedPassword, // Guarda el hash en lugar de la contraseña en texto plano
        nombre: req.body.nombre || null,
        apellido: req.body.apellido || null,
        direccion: req.body.direccion || null,
        telefono: req.body.telefono || null,
      },
    });

    if (created) {
      console.log("Usuario Creado");
      sendEmailWithTemplate(instance.email, "newUser");
    }

    res.send({ status: "success", data: instance });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

//Si el usuario no es role NULL, trae todos los usuarios; sino trae el mismo que se ingreso
//La contraseña chequeda puede ser el hash o el texto plano (ambas funcionan).

//JWT: EN EL REGISTRO SE GENERA EL TOKEN; USO EL ARCHIVO JWT.JS; LUEGO DONDE LO CODIFICO ES EN AUTH.JS
//Y LO USO EN EL MIDDLEWARE EN LAS RUTAS PARA CHEQUEAR QUE SE OBTENGA.

//ACA SE DEBERIA GENERAR EL TOKEN

const login = async (req, res) => {
  try {
    if (!req.body?.email || !req.body?.password)
      throw { status: 43, message: "Missing email or password" };

    // Verificar si la contraseña proporcionada es un hash o una contraseña en texto plano
    const isPasswordHash = req.body.password.length === 60;

    let requestUser;

    if (isPasswordHash) {
      // Si la contraseña es un hash, buscar al usuario por el hash
      requestUser = await Usuarios.findOne({
        where: {
          password: req.body.password,
        },
      });
    } else {
      // Si la contraseña es texto plano, buscar al usuario por su email
      requestUser = await Usuarios.findOne({
        where: {
          email: req.body.email.toLowerCase(),
        },
      });

      // Verificar si se encontró un usuario y si la contraseña proporcionada coincide con la almacenada
      if (
        !requestUser ||
        !(await bcrypt.compare(req.body.password, requestUser.password))
      ) {
        res.status(403).send({ error: "Wrong email or password" });
      }
    }

    // Buscar todos los usuarios si el usuario logueado tiene un rol específico
    let returnedUsers = [];

    if (requestUser.dataValues.rol !== null) {
      returnedUsers = await Usuarios.findAll();
    }

    // Devolver los usuarios encontrados
    res.status(200).send({
      loggedUser: requestUser,
      allUsers: returnedUsers,
      token: jwt.createToken(requestUser),
      status: "success",
    });
  } catch (error) {
    console.log(error);
    // Devolver un error con el estado 500 (Internal Server Error)
    res.status(500).send({ error: error, status: "Error" });
  }
};

// FUNCION PARA TRAER TODOS LOS USUARIOS
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await Usuarios.findAll();

    return res.status(200).json({ allUsers });
  } catch (error) {
    console.error("Error al obtener todos los usuarios:", error);

    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

// FUNCION QUE ME VA A SERVIR PARA SELECCIONAR EN LA MENSAJERIA INTERNA - TRAE LOS
// USUARIOS QUE NO SON NULL //

const getAllUsersMensajes = async (req, res) => {
  try {
    const allUsers = await Usuarios.findAll({
      attributes: ["id", "email", "nombre", "apellido"],
      where: {
        rol: {
          [Op.ne]: null,
        },
      },
    });

    return res.status(200).json({ allUsers });
  } catch (error) {
    console.error("Error al obtener todos los usuarios:", error);

    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getLastLoggedInUsers = async (req, res) => {
  try {
    // Consulta a la base de datos para obtener los últimos 5 usuarios logueados
    const lastLoggedInUsers = await Usuarios.findAll({
      order: [["createdAt", "DESC"]], // Ordena por fecha de creación en orden descendente
      limit: 5, // Limita el resultado a 5 usuarios
    });

    // Devuelve la lista de los últimos 5 usuarios logueados en la respuesta
    return res.status(200).json({ lastLoggedInUsers });
  } catch (error) {
    console.error("Error al obtener los últimos usuarios logueados:", error);
    // Devuelve un mensaje de error en caso de fallo
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

const putUser = async (req, res) => {
  try {
    //ACA BUSCA POR ID, es decir, le permite modificar al usuario una vez logueado o autenticado //
    const user = await Usuarios.findByPk(req.body.id);

    if (!user) {
      return res.status(404).send("No se encontró el usuario");
    }

    // Verificar si se proporciona una modificación en la solicitud
    const { email, password, nombre, apellido, direccion, telefono } = req.body;
    if (email || password || nombre || apellido || direccion || telefono) {
      // Si se proporciona un nuevo email, actualizarlo y volver a cargar el usuario
      if (email) {
        user.email = email.toLowerCase();
      }

      // Si se proporciona una nueva contraseña, actualizarla
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }

      if (nombre !== undefined) {
        user.nombre = nombre;
      }
      if (apellido !== undefined) {
        user.apellido = apellido;
      }
      if (direccion !== undefined) {
        user.direccion = direccion;
      }

      if (telefono !== undefined) {
        user.telefono = telefono;
      }

      // Guardar los cambios en la base de datos
      await user.save();
      return res.status(200).send({ status: "success" });
    } else {
      return res
        .status(400)

        .send(
          "Se debe proporcionar al menos un campo para actualizar (email o password)"
        );
    }

    // Devolver el usuario actualizado
    return res.send(await user.reload());
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Buscar el usuario por su correo electrónico
    const user = await Usuarios.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        error: "No se encontró un usuario con ese correo electrónico",
      });
    }

    // Generar una nueva contraseña aleatoria
    const newPassword = Math.random().toString(36).slice(-8);

    // Hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña del usuario en la base de datos
    user.password = hashedPassword;
    await user.save();

    // Enviar el nuevo password al correo electrónico del usuario
    sendEmailWithTemplate(email, "newPassword", { password: user.password });

    // Enviar el nuevo password al correo electrónico del usuario
    res.json({
      message: "Se ha enviado un correo electrónico con la nueva contraseña",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Ocurrió un error al restablecer la contraseña",
    });
  }
};

//FUNCION QUE VERIFICA SI EL USUARIO ES ADMIN O NO

const verificarRol = async (req, res) => {
  try {
    const idUsuario = req.body.idUsuario;

    const usuario = await Usuarios.findByPk(idUsuario);

    if (!usuario) {
      throw "Usuario no encontrado";
    }

    if (usuario.rol === true) {
      return res.status(200).send("Rol true");
    } else {
      return res.status(400).send("Rol false");
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

module.exports = {
  login,
  registro,
  putUser,
  resetPassword,
  getAllUsers,
  getLastLoggedInUsers,
  verificarRol,
  getAllUsersMensajes,
};
