
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('foodstuffs').del()
    .then(function () {
      // Inserts seed entries
      return knex('foodstuffs').insert([
        {id: 1, name: 'Carrot'},
        {id: 2, name: 'Beef'},
        {id: 3, name: 'French Fries'}
      ]);
    });
};
