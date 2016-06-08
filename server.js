// NEAP template by Alexander Murphy
// require all our dependencies
var express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000
var databaseConfig = require('./config/database_config')

// app configuration
var app = express()
app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'))

router = require('./app/routes.js')
app.use('/', router)

// listen
app.listen(port)
console.log("listening on port " + port);
