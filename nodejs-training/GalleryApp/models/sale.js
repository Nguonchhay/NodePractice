'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Product }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id', 'as': 'user' });
      this.belongsTo(Product, { foreignKey: 'product_id', 'as': 'product' });
    }

    static async getRawSales() {
      return sequelize.query('');
    }

    toJSON() {
      return {
        ...this.get(),
        product_id: undefined
      }
    }
  }
  Sale.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    sale_date: DataTypes.DATE,
    qty: DataTypes.INTEGER,
    unit_price: DataTypes.DOUBLE,
    total: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Sale',
    tableName: 'sales',
    timestamps: false
  });
  return Sale;
};