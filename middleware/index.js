var express = require('express')
var auth = require('./auth')
var router = express.Router()

//daftarkan menu registerasi
router.post('/api/v1/register', auth.registerasi)

module.exports = router