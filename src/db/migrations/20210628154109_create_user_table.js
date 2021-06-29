const knexfile = require('../knexfile');
const knex = require('knex')(knexfile.development);

exports.up = function (knex) {
    return knex.schema
        .createTable('campus', table => {
            table.increments('id');
            table.string('name')
                .notNullable();
            table.unique('name');
        })
        .createTable('school', table => {
            table.increments('id');
            table.string('name')
                .notNullable();
            table.string('description')
                .notNullable();
            table.index('name');
            table.unique(['name', 'description']);
        })
        .createTable('user', table => {
            table.increments('id');
            table.string('fullname')
                .notNullable();
            table.string('email_work')
                .notNullable();
            table.string('email_personal')
                .nullable();
            table.string('contact_no')
                .notNullable();
            table.integer('school_id')
                .unsigned()
                .references('id')
                .inTable('school')
                .onUpdate("CASCADE");
            table.integer('campus_id')
                .unsigned()
                .references('id')
                .inTable('campus')
                .onUpdate("CASCADE");
            table.boolean('is_full_time')
                .defaultTo(0);
            table.boolean('is_active')
                .defaultTo(1);
            table.datetime('created_at')
                .defaultTo(knex.fn.now());
            table.datetime('deleted_at')
                .defaultTo('1970-01-01 00:00:00');
            table.unique('email_work');
        });

};

exports.down = function (knex) {
    return knex.schema
        .table('user', table => {
            table.dropForeign('school_id');
            table.dropColumn('school_id');
            table.dropForeign('campus_id');
            table.dropColumn('campus_id');
        })
        .dropTableIfExists('user')
        .dropTableIfExists('campus')
        .dropTableIfExists('school');
};
