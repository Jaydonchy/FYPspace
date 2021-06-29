
exports.up = function (knex) {
    return knex.schema
        .createTable('field', table => {
            table.increments('id');
            table.string('name')
                .notNullable();
            table.index('name');
            table.unique('name');
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('field');
};
