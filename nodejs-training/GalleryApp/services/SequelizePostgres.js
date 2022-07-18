const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'galleryapp',
    'postgres',
    'root',
    {
        dialect: 'postgres',
        logging: false,
        host: 'localhost',
        port: 5432
    }
);

module.exports = sequelize;