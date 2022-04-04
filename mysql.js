const mysql = require('mysql');

var pool = mysql.createPool({
    // "user":"gabriel2",
    // "password": "adimin",
    // "database": "database_name",
    // "host": "localhost",
    // "port": 3306
    "user": process.env.MYSQl_USER,
    "password":  process.env.MYSQl_PASSWORD,
    "database":  process.env.MYSQl_DATABASE,
    "host":  process.env.MYSQl_HOST,
    "port":  process.env.MYSQl_PORT
});
exports.pool = pool;