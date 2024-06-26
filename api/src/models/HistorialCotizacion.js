const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "HistorialCotizacion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idCotizacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "HistorialCotizacion",
      timestamps: true,
    }
  );
};
