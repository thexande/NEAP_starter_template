exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('post_contents', function(table){
      table.increments('id').primary()
      table.text("post_contents")
      table.text("created_at")
      table.text("updated_at")
    })
  ])
}
exports.down = function(knex, Promise) {
  knex.schema.dropTable('YOUR_TABLE_NAME_HERE')
}
