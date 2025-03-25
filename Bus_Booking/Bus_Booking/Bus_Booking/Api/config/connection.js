const mysql = require('mysql');

// Create MySQL connection pool
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'bus_booking'
});

connection.connect((err) => {
    if (err) {

        return false;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);
    return true;
});

module.exports = connection;