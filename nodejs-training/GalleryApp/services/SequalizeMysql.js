const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'galleryapp',
    'root',
    '',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
);

module.exports = sequelize;