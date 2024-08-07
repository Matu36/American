const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Clientes",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idUsuario: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CUIT: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      domicilio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      razonSocial: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fechaDeCreacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      fechaModi: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
