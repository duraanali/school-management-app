const db = require('../data/dbConfig');

module.exports = {
    getClasses,
    postClass,
    updateClass,
    removeClass
}

function getClasses() {
    return db('classes').select('id', 'name', 'subject', 'created', 'teacher_id')
}


function postClass(Class) {
    return db('classes').insert(Class);
}


function updateClass(id, changes) {
    return db('classes')
        .where({ id })
        .update(changes);
}
function removeClass(id) {
    return db('classes')
        .where('id', id)
        .del();
}