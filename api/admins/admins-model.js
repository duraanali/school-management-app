const db = require('../data/dbConfig.js');


module.exports = {
    add,
    find,
    findBy,
    findById,
};


function find() {
    return db('admins').select('id', 'name', 'email', 'password');
}

function findBy(filter) {
    return db('admins').where(filter);
}

function add(admin) {
    return db('admins')
        .insert(admin, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
}

function findById(id) {
    return db('admins')
        .where({ id })
        .first();
}
