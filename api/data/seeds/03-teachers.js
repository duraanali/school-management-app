
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('teachers').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('teachers').insert([
        { id: 1, name: "Duraan Ali", email: "duraan@gmail.com", password: "$2a$08$Q.NODULbt14MKc3mga7SheWHPe3Q3h5qDj8KpupSKwScp1rap5xDa" } // password: 123456789
      ]);
    });
};