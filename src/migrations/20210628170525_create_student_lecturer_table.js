exports.up = function (knex) {
    return knex.schema
        .createTable('study_level', table => {
            table.increments('id');
            table.string('name')
                .notNullable();
            table.unique('name');
        })
        .createTable('course', table => {
            table.increments('id');
            table.string('name')
                .notNullable();
            table.index('name');
            table.unique('name');
        })
        .createTable('intake', table => {
            table.increments('id');
            table.string('name')
                .notNullable();
            table.datetime('ppf_submission')
                .defaultTo('1970-01-01 00:00:00');
            table.datetime('psf_submission')
                .defaultTo('1970-01-01 00:00:00');
            table.datetime('ir_submission')
                .defaultTo('1970-01-01 00:00:00');
            table.datetime('final_submission')
                .defaultTo('1970-01-01 00:00:00');
            table.integer('course_id')
                .unsigned()
                .references('id')
                .inTable('course')
                .onUpdate("CASCADE");
            table.datetime('created_at')
                .defaultTo(knex.fn.now());
            table.datetime('deleted_at')
                .defaultTo('1970-01-01 00:00:00');
            table.index('name');
            table.unique('name');

        })
        .createTable('student', table => {
            table.increments('id');
            table.integer('user_id')
                .unsigned()
                .references('id')
                .inTable('student')
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.integer('level_of_study')
                .unsigned()
                .references('id')
                .inTable('student')
                .onUpdate("CASCADE");
            table.integer('intake_id')
                .unsigned()
                .references('id')
                .inTable('intake')
                .onUpdate("CASCADE");
        })
};

exports.down = function (knex) {
    return knex.schema
        .table('student', table => {
            table.dropForeign('intake_id');
            table.dropForeign('user_id');
        })
        .dropTableIfExists('student')
        .table('intake', table => {
            table.dropForeign('course_id');
        })
        .dropTableIfExists('intake')
        .dropTableIfExists('course')
        .dropTableIfExists('study_level');
};
