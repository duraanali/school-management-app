
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('admins').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('admins').insert([
        { id: 1, name: "mohamed", email: "mohamed@yahoo.com", password: "$2a$08$Q.NODULbt14MKc3mga7SheWHPe3Q3h5qDj8KpupSKwScp1rap5xDa" } // password: 123456789
      ]);
    });
};
