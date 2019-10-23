
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        // {id: 1},
        // {id: 2},
        // {id: 3}
      ]);
    });
};
