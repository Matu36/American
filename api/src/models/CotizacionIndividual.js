const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "CotizacionIndividual",
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
      cantidadProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      precio: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },

      anticipo: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },

      cuotas: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      cuotaValor: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },

      saldoAFinanciar: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },

      IVA: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },

      moneda: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      interes: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },

      saldoConInteres: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },

      PrecioFinal: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      tableName: "CotizacionIndividual",
      timestamps: false,
    }
  );
};
