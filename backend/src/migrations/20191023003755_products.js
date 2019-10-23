
exports.up = function(knex) {
  return knex.schema.createTable("products", table => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.string('description').notNullable()
    table.string('image')
    table.integer('cook')
    table.integer('price').unsigned().notNullable()
    table.string('currency').notNullable()
  }) 
}

exports.down = function(knex) {
  return knex.schema.dropTable("products")
}
