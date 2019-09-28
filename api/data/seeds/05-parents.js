
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('parents').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('parents').insert([
        { id: 1, name: 'Anisa Mohamed', phone: 619524785, address: "2864 Portland ave", spouse_name: "Duraan Ali", spouse_phone: 6195641047 },
        { id: 2, name: 'Farhiyo Mohamed', phone: 6125046945, address: "2013 Winona Ave", spouse_name: "Ali Wadaad", spouse_phone: 6128896644 },
      ]);
    });
};

