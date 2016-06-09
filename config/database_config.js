var config = require('./knexfile.js')
var env = 'development'
// knex config
var knex = require('knex')(config[env])
knex.migrate.latest([config])
// bookshelf config
bookshelf = require('bookshelf')(knex)
bookshelf.plugin('registry')
module.exports = bookshelf
// bookshelf-modelbase
var ModelBase = require('bookshelf-modelbase')(bookshelf)
