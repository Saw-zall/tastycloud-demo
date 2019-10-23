
exports.up = function(knex) {
  return knex.schema.createTable("foodstuffs_products", table => {
    table.integer("product_id").notNullable(),
    table.integer("foodstuff_id").notNullable()
  }) 
}

exports.down = function(knex) {
  return knex.schema.dropTable("foodstuffs_products")
}
