const Sequelize = require('sequelize');

const sequelize = require('./../services/SequelizePostgres');

const Category = sequelize.define(
    'category',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

module.exports = Category;