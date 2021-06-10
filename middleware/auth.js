var connection = require('../koneksi')
var mysql = require('mysql')
var bcrypt = require('bcrypt')
var response = require('../res')
var jwt = require('jsonwebtoken')
var config = require('../config/secret')
var ip = require('ip')

//controller untuk register
exports.registerasi = function(req, res) {
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    }

    var query = "SELECT email FROM ?? WHERE ??"
    var table = ["user", "email", post.email]

    query = mysql.format(query,table)

    connection.query(query, function(err, rows) {
        if(error) {
            console.log(error)
        } else {
            if(rows.length == 0) {
                var query = "INSERT INTO ?? SET ?"
                var table = ["user"]
                query = mysql.format(query, table)
                connection.query(query, post, function(err, rows){
                    if(error) {
                        console.log(error)
                    } else {
                        response.ok("Berhasil menambahkan data user baru!", res)
                    }
                })
            } else {
                response.ok("Email sudah terdaftar!")
            }
        }
    })
}