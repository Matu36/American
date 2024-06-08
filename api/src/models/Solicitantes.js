const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Solicitantes",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombreCompleto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      telefonoCelular: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      envioCV: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true, // Agrega esta validación si quieres asegurarte de que la URL sea válida
        },
      },
    },
    {
      tableName: "Solicitantes",
      timestamps: false, // Desactiva los timestamps automáticos (createdAt, updatedAt)
    }
  );
};
