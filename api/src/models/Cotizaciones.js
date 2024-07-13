const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Cotizaciones",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numeroCotizacion: {
        type: DataTypes.STRING,
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
      contado: {
        type: DataTypes.STRING,
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
      saldo: {
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
      fechaDeCreacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      fechaModi: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      fechaVenta: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "Cotizaciones",
      timestamps: false,
    }
  );
};
