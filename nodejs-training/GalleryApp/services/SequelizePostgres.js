const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'galleryapp',
    'postgres',
    'postgres',
    {
        dialect: 'postgres',
        logging: false,
        host: '0.0.0.0',
        port: 5432
    }
);

module.exports = sequelize;