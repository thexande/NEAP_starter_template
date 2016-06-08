exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('YOUR_TABLE_NAME_HERE', function(table){
      table.increments('id').primary()
      table.text("text_column")
    })
  ])
}
exports.down = function(knex, Promise) {
  knex.schema.dropTable('YOUR_TABLE_NAME_HERE')
}
