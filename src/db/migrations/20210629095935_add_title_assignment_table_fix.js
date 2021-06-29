
exports.up = function(knex) {
    return knex.schema.alterTable('assignment', table => {
        table.string('title');
    })
};

exports.down = function(knex) {
    return knex.schema.alterTable('assignment', table => {
        table.dropColumn('title');
    })
};
