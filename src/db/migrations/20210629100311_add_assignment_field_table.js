
exports.up = function (knex) {
    return knex.schema
        .createTable('assignment_field', table => {
            table.integer('assignment_id')
                .unsigned()
                .references('id')
                .inTable('assignment')
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.integer('field_id')
                .unsigned()
                .references('id')
                .inTable('field')
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
        })
};

exports.down = function (knex) {
    return knex.schema
        .table('assignment_field', table => {
            table.dropForeign('assignment_id');
            table.dropForeign('field_id');
        })
        .dropTableIfExists('assignment_field');
};
