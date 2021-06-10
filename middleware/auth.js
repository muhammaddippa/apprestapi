var connection = require('../koneksi')
var mysql = require('mysql')
var response = require('../res')
var jwt = require('jsonwebtoken')
var config = require('../config/secret')
var ip = require('ip')
var hash = require('md5')

//controller untuk register
exports.registerasi = function(req, res) {
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: hash(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    }

    var query = "SELECT email FROM ?? WHERE ??=?"
    var table = ["user", "email", post.email]

    query = mysql.format(query,table)

    connection.query(query, function(err, rows) {
        if(err) {
            console.log(err)
        } else {
            if(rows.length == 0) {
                var query = "INSERT INTO ?? SET ?"
                var table = ["user"]
                query = mysql.format(query, table)
                connection.query(query, post, function(err, rows){
                    if(err) {
                        console.log(err)
                    } else {
                        response.ok("Berhasil menambahkan data user baru!", res)
                    }
                })
            } else {
                response.ok("Email sudah terdaftar!", res)
            }
        }
    })
}

//controller untuk login
exports.login = function(req, res){
    var post = {
        email: req.body.email,
        password: hash(req.body.password),
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?"
    var table = ["user", "password", post.password, "email", post.email]

    query = mysql.format(query,table)

    connection.query(query, function(error, rows){
        if(error){
            console.log(error)
        } else {
            if(rows.length == 1) {
                var token = jwt.sign({rows}, config.secret, {
                    expiresIn: 1440 //20 menit
                })

                id_user = rows[0].id

                var data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                }

                var query = "INSERT INTO ?? SET ?";
                var table = ["akses_token", data]
                query = mysql.format(query,table)
                connection.query(query, function(error, rows){
                    if(error) {
                        console.log(error)
                    } else {
                        res.json({
                            success: true,
                            message: 'Token JWT tergenerate!',
                            token: token,
                            currUser: data.id_user
                        })
                    }
                })
            } else {
                res.json({"Error": true, "Message":"Email atau password salah!"})
            }
        }
    })
}

exports.halamanrahasia = function(req,res) {
    response.ok("Halaman ini hanya untuk user dengan role = 2!", res)
}