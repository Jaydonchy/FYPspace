const { date } = require("joi");

exports.up = function (knex) {
    return knex.schema
        .createTable('meeting_log', table => {
            table.increments('id');
            table.integer('assignment_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('assignment')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.boolean('visible')
                .defaultTo(1);
            table.datetime('timing')
                .defaultTo(knex.fn.now())
                .notNullable();
            ['items', 'record', 'action'].map(section =>
                table.string(section, 1000)
            );
            table.datetime('created_at')
                .defaultTo(knex.fn.now());
            table.datetime('deleted_at')
                .defaultTo('1970-01-01 00:00:00');
            table.index('assignment_id');
        })
};

exports.down = function (knex) {
    return knex.schema
    .table('meeting_log',table=>
        table.dropForeign('assignment_id')
    )
    .dropTableIfExists('meeting_log');
};
