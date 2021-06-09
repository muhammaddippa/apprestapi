var mysql = require('mysql');

//Koneksi ke database
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lupague',
    database: 'dbrestapi'
})

conn.connect(err => {
    if(err) throw err;
    console.log('Mysql terkoneksi');
})

module.exports = conn;