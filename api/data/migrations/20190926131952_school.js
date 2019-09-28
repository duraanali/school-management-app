
exports.up = function (knex, Promise) {
    return knex.schema
        .createTable('settings', tbl => {
            tbl.increments();
            tbl.string('school_name', 255).notNullable();
            tbl.string('address', 255);
        })
        .createTable('admins', tbl => {
            tbl.increments();
            tbl.string('name', 255).notNullable();
            tbl.string('email', 255).notNullable().unique();
            tbl.varchar('password', 128).notNullable();
        })
        .createTable('teachers', tbl => {
            tbl.increments();
            tbl.string('name', 255).notNullable();
            tbl.string('email', 255).notNullable().unique();
            tbl.varchar('password', 128).notNullable();
        })
        .createTable('classes', tbl => {
            tbl.increments();
            tbl.string('name', 255).notNullable();
            tbl.string('subject', 255);
            tbl.date('created', 128);
            // Foreign Key
            tbl
                .integer('teacher_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('teachers')
                .onDelete('RESTRICT') // if the PK record is deleted
                .onUpdate('CASCADE'); // if the PK value updates
        })
        .createTable('students', tbl => {
            tbl.increments();
            tbl.string('name', 255).notNullable();
            tbl.date('dob', 25);
            // Foreign Key
            tbl
                .integer('class_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('classes')
                .onDelete('RESTRICT') // if the PK record is deleted
                .onUpdate('CASCADE'); // if the PK value updates

            tbl
                .integer('parent_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('parents')
                .onDelete('RESTRICT') // if the PK record is deleted
                .onUpdate('CASCADE'); // if the PK value updates
        })
        .createTable('parents', tbl => {
            tbl.increments();
            tbl.string('name', 255).notNullable();
            tbl.integer('phone', 25).notNullable();
            tbl.string('address', 25);
            tbl.string('spouse_name', 25);
            tbl.integer('spouse_phone', 25);

        })

};

exports.down = function (knex, Promise) {
    return knex.schema
        .dropTableIfExists('students')
        .dropTableIfExists('parents')
        .dropTableIfExists('classes')
        .dropTableIfExists('teachers')
        .dropTableIfExists('admins')
        .dropTableIfExists('settings');
};
