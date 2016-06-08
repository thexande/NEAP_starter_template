var config = require('./knexfile.js');
var env = 'development';

var knex = require('knex')(config[env]);
knex.migrate.latest([config]);


// bookshelf
bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
module.exports = bookshelf;

// bookshelf-modelbase
var ModelBase = require('bookshelf-modelbase')(bookshelf);
