exports.up = function (knex) {
    return knex.schema
        .createTable('proposed_lecturer', table => {
            table.integer('student_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('student')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.integer('lecturer_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('lecturer')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.integer('priority')
                .unsigned()
                .notNullable()
            table.index('student_id');
        });

};

exports.down = function (knex) {
    return knex.schema
        .table('proposed_lecturer', table => {
            table.dropForeign('lecturer_id')
            table.dropForeign('student_id')
        })
        .dropTableIfExists('proposed_lecturer');
};
