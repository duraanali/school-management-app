
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { id: 1, name: 'uthmaan ali', dob: "03/28/2009", class_id: 1, parent_id: 1 },
        { id: 2, name: 'Nasteexo ali', dob: "04/11/2001", class_id: 1, parent_id: 1 },
        { id: 3, name: 'Mohamed Ali', dob: "01/29/1995", class_id: 2, parent_id: 2 },
        { id: 4, name: 'Ubah Jama', dob: "05/22/2003", class_id: 2, parent_id: 2 }
      ]);
    });
};
