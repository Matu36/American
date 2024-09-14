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
        type: DataTypes.STRING,
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
      codigoCotizacion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      precio: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      precio2: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },

      anticipo: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      anticipo2: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      cuotas: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cuotas2: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cuotaValor: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      cuotaValor2: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },

      saldoAFinanciar: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      saldoAFinanciar2: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      IVA: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      IVA2: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      moneda: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      moneda2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      interes: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      interes2: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },

      saldoConInteres: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      saldoConInteres2: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      PrecioFinal: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      PrecioFinal2: {
        type: DataTypes.DECIMAL,
        allowNull: true,
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
      notasEmail: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      notasUsuario: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "Cotizaciones",
      timestamps: false,
    }
  );
};
