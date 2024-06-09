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
          isUrl: true,
        },
      },
    },
    {
      tableName: "Solicitantes",
      timestamps: true,
    }
  );
};
