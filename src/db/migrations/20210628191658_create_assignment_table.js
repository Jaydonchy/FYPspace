
exports.up = function (knex) {
    return knex.schema
        .createTable('assignment', table => {
            table.increments('id');
            table.integer('student_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('student')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.string('description', '1000');
            table.integer('supervisor_id')
                .unsigned()
                .defaultTo(null)
                .references('id')
                .inTable('lecturer')
                .onUpdate('CASCADE');
            table.integer('marker_id')
                .unsigned()
                .defaultTo(null)
                .references('id')
                .inTable('lecturer')
                .onUpdate('CASCADE');
            table.integer('ppf')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('proposal_form')
                .onUpdate("CASCADE");
            table.integer('psf')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('specification_form')
                .onUpdate("CASCADE");
            table.boolean('ir').defaultTo(0);
            table.boolean('final').defaultTo(0);
            table.datetime('created_at')
                .defaultTo(knex.fn.now());
            table.datetime('deleted_at')
                .defaultTo('1970-01-01 00:00:00');
            table.unique('student_id');
            table.index('student_id');
        })
};

exports.down = function (knex) {
    return knex.schema
        .table('assignment', table => {
            ['student_id', 'supervisor_id', 'marker_id', 'ppf', 'psf'].map(fk =>
                table.dropForeign(fk)
            );
        })
        .dropTableIfExists('assignment');
};
