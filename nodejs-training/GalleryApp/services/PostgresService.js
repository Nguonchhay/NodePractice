const Pool = require('pg').Pool;

const pool = new Pool({
    host: 'localhost',
    database: 'galleryapp',
    user: 'postgres',
    password: 'root',
    port: '5432'
});

module.exports = pool;