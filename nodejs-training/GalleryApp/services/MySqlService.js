const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'galleryapp',
    user: 'root',
    password: ''
});

module.exports = pool.promise();