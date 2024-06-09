const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Descuentos",
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
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      telefonoCelular: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      fechaDeRegistro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      estado: {
        type: DataTypes.ENUM("activo", "expirado"),
        allowNull: false,
        defaultValue: "activo",
      },
    },
    {
      tableName: "Descuentos",
      timestamps: false,
    }
  );
};
