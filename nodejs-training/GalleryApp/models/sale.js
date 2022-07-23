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
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Product, { foreignKey: 'product_id' });
    }
  }
  Sale.init({
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