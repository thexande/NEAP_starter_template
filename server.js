// NEAP template by Alexander Murphy
// require all our dependencies
var express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000
var databaseConfig = require('./config/database_config')
var methodOverride = require('method-override')
// app configuration
var app = express()
app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
    'extended': 'true'
}))
app.use(bodyParser.json())
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}))
app.use(methodOverride('X-HTTP-Method-Override'))

router = require('./app/routes.js')
app.use('/', router)

// listen
app.listen(port)
console.log("listening on port " + port)
