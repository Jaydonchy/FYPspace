
exports.up = function (knex) {
    return knex.schema
        .createTable('lect_field', table => {
            table.integer('lect_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('course')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.integer('field_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('course')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.index('lect_id');
        })
        .createTable('question', table => {
            table.increments('id');
            table.string('title')
                .notNullable();
            table.boolean('available')
                .defaultTo(1);
            table.integer('student_id')
                .unsigned()
                .defaultTo(null)
                .references('id')
                .inTable('student')
                .onUpdate("CASCADE");
            ['supervisor_id', 'marker_id'].map(lect => {
                table.integer(lect)
                    .unsigned()
                    .defaultTo(null)
                    .references('id')
                    .inTable('lecturer')
                    .onUpdate('Cascade');
            });
            table.string('project_owner')
                .defaultTo(null)
            table.datetime('created_at')
                .defaultTo(knex.fn.now());
            table.datetime('deleted_at')
                .defaultTo('1970-01-01 00:00:00');

        })
        .createTable('question_field', table => {
            table.integer('question_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('question')
                .onUpdate("CASCADE")
                .onDelete("CASCADE");;
            table.integer('field_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('field')
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
        })
};

exports.down = function (knex) {
    return knex.schema
        .table('question_field', table => {
            ['question_id', 'field_id'].map(fk => {
                table.dropForeign(fk);
            })
        })
        .dropTableIfExists('question_field')
        .table('question', table => {
            ['student_id', 'supervisor_id', 'marker_id'].map(fk =>
                table.dropForeign(fk)
            );
        })
        .dropTableIfExists('question')
        .table('lect_field', table => {
            ['lect_id', 'field_id'].map(fk => {
                table.dropForeign(fk);
            })
        })
        .dropTableIfExists('lect_field');
};
