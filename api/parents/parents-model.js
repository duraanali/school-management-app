const db = require('../data/dbConfig');

module.exports = {
    getParents,
    postParent,
    updateParent,
    removeParent
}

function getParents() {
    return db('parents').select('id', 'name', 'phone', 'address', 'spouse_name', 'spouse_phone')
}

// function getQaEnt(entrepreneur_id) {
//     return db('questions')
//         .innerJoin('entrepreneurs', 'questions.entrepreneur_id', '=', 'entrepreneurs.id')
//         .select('questions.id', 'questions.title', 'questions.question', 'questions.business_type', 'questions.file')
//         .where({ entrepreneur_id })
// }

function postParent(parent) {
    return db('parents').insert(parent);
}
function updateParent(id, changes) {
    return db('parents')
        .where({ id })
        .update(changes);
}
function removeParent(id) {
    return db('parents')
        .where('id', id)
        .del();
}