
exports.up = function (knex) {
    return knex.schema
        .createTable('location', table => {
            table.increments('id');
            table.string('name')
                .notNullable();
            table.unique('name');
        })
        .createTable('position', table => {
            table.increments('id');
            table.string('name')
                .notNullable();
            table.unique('name');
        })
        .createTable('department', table => {
            table.increments('id');
            table.string('name')
                .notNullable();
            table.unique('name');
        })
        .createTable('lecturer', table => {
            table.increments('id');
            table.boolean('availability')
                .defaultTo(1);
            table.boolean('is_pm')
                .defaultTo(0);
            table.boolean('is_admin')
                .defaultTo(0);
            table.integer('position_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('position')
                .onUpdate('CASCADE');
            table.integer('department_id')
                .unsigned()
                .references('id')
                .inTable('department')
                .onUpdate('CASCADE');
            table.integer('location_id')
                .unsigned()
                .references('id')
                .inTable('location')
                .onUpdate('CASCADE');
        })
};

exports.down = function (knex) {
    return knex.schema
        .table('lecturer', table => {
            table.dropForeign('position_id');
            table.dropForeign('department_id');
            table.dropForeign('location_id');
        })
        .dropTableIfExists('lecturer')
        .dropTableIfExists('position')
        .dropTableIfExists('department')
        .dropTableIfExists('location');
};
