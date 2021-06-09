'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok("Aplikasi REST API berjalan!", res);
};

//menampilkan semua data mahasiswa
exports.tampilsemuamahasiswa = function (req, res) {
    connection.query('SELECT * FROM mahasiswa', function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res);
        }
    })
}

//menampilkan semua data mahasiswa berdasarkan IDnya
exports.tampilberdasarkanid = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa where id_mahasiswa = ?', [id],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res)
            }
        })
}